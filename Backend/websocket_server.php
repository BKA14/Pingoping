<?php
echo "Starting WebSocket server...\n";

require __DIR__ . '/vendor/autoload.php';
include "config.php";

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\WebSocket\WsServer;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use React\EventLoop\LoopInterface;
use React\Socket\TcpServer;
use React\EventLoop\Loop;

class WebSocketServer implements MessageComponentInterface {
    protected $clients = [];
    protected $con;
    protected $loop;

      private $baseUrl; // Déclarez la variable pour l'URL de base

    
    public function __construct($con, LoopInterface $loop) {
        $this->con = $con;
        $this->loop = $loop;
    
        // Planifier la vérification des états de likes toutes les 2 secondes
        $this->loop->addPeriodicTimer(0.2, function () {
            $this->checkForEtatDeLikesNotifications();
        });
    
        // Planifier la vérification des notifications toutes les 2 secondes
        $this->loop->addPeriodicTimer(1, function () {
            $this->checkForNotifications();
        });
    
        // Planifier la mise à jour des utilisateurs bloqués toutes les 60 secondes
        $this->loop->addPeriodicTimer(60, function () {
            $this->updateBlockedUsers();
        });

          // Planifier la vérification périodique des mises à jour de pub
          $this->loop->addPeriodicTimer(7, function () {
            $this->checkForPubUpdates();
        });
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients[$conn->resourceId] = $conn;
        echo "New connection! ({$conn->resourceId})\n";
        
        // Envoyer les alertes dès la connexion
        $this->sendAlerts($conn);

            // Envoyer les données de pub initiales dès la connexion
        $this->sendInitialPubData($conn);

        // Envoyer les états de likes initiaux dès la connexion
        $this->sendInitialEtatDeLikesToAllClients($conn);

        $this->updateBlockedUsers();

        
    }


    public function onMessage(ConnectionInterface $from, $msg) {
        echo "Message received: $msg from {$from->resourceId}\n";
    }

    public function onClose(ConnectionInterface $conn) {
        unset($this->clients[$conn->resourceId]);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }

    // Méthode pour envoyer les alertes initiales à un client lors de la connexion
    private function sendAlerts($conn) {
        echo "Sending initial alerts to connection {$conn->resourceId}\n";
        $sql = "SELECT * FROM signalisation ORDER BY heure_signalisation DESC";
        $result = mysqli_query($this->con, $sql);

        if ($result) {
            $alerts = [];

            while ($row = mysqli_fetch_assoc($result)) {
                $row['image'] = "http://localhost/alert/" . $row['image'];
                $alerts[] = $row;
            }

            $json_alerts = json_encode($alerts);
            $this->safeSend($conn, $json_alerts);
        } else {
            $this->safeSend($conn, json_encode(["error" => mysqli_error($this->con)]));
        }
    }

    // Méthode pour mettre à jour la date de fin de blocage pour les utilisateurs
private function updateBlockedUsers() {
    echo "Sending initial date blocage to all clients\n";
    $currentDate = date("Y-m-d\TH:i:s");
    $updateQuery = "UPDATE `user` SET datefinblocage = 'non' WHERE (datefinblocage IS NULL OR datefinblocage < '$currentDate') OR datefinblocage = 'non'";
    mysqli_query($this->con, $updateQuery);
}

// Méthode pour envoyer les états de likes initiaux à tous les clients connectés
private function sendInitialEtatDeLikesToAllClients($conn) {
    echo "Sending initial etatdelikes data to all clients\n";
    $sql = "SELECT * FROM etatdelikes ORDER BY id ASC";
    $result = mysqli_query($this->con, $sql);

    if ($result) {
        $etatdelikes = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $etatdelikes[] = $row;
        }

        $message = [
            'type' => 'initial_etatdelikes',
            'payload' => $etatdelikes
        ];
        $json_message = json_encode($message);

        // Envoyer les données à tous les clients connectés
        foreach ($this->clients as $client) {
            $this->safeSend($client, $json_message);
        }
    } else {
        echo "Failed to fetch initial etatdelikes data: " . mysqli_error($this->con) . "\n";
    }
}


    // Méthode pour vérifier les notifications pour signalisation
    private function checkForNotifications() {
        echo "Checking for new signalisation notifications...\n";
        $sql = "SELECT * FROM websocket_notifications ORDER BY created_at ASC";
        $result = mysqli_query($this->con, $sql);

        if ($result && mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                echo "New signalisation notification found, sending alert...\n";
                $this->sendNewAlert($row['signalisation_id'], $row['action']);
                // Suppression de la notification après envoi
                $deleteSql = "DELETE FROM websocket_notifications WHERE id = " . $row['id'];
                mysqli_query($this->con, $deleteSql);
            }
        }
    }

    // Méthode pour envoyer une nouvelle alerte pour signalisation aux clients
    private function sendNewAlert($signalisation_id, $action) {
        echo "Sending new alert for signalisation_id: $signalisation_id\n";
        $sql = "SELECT * FROM signalisation WHERE id = $signalisation_id";
        $result = mysqli_query($this->con, $sql);

        if ($result && $row = mysqli_fetch_assoc($result)) {
            $row['image'] = "http://localhost/alert/" . $row['image'];
            $row['action'] = $action;
            $json_alert = json_encode($row);

            // Envoyer l'alerte à tous les clients connectés
            foreach ($this->clients as $clientId => $client) {
                echo "Sending alert to client {$clientId}\n";
                $this->safeSend($client, $json_alert);
            }
        } else {
            echo "Failed to fetch signalisation with id $signalisation_id: " . mysqli_error($this->con) . "\n";
        }
    }

    // Méthode pour vérifier les notifications pour etatdelikes
    private function checkForEtatDeLikesNotifications() {
        echo "Checking for new etatdelikes notifications...\n";
        $sql = "SELECT * FROM websocket_notifications_etatdelikes ORDER BY created_at ASC";
        $result = mysqli_query($this->con, $sql);

        if ($result && mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                echo "Newwwwwwwwwwwww etatdelikes notification found, sending update...\n";
                $this->sendNewEtatDeLikesUpdate($row['etatdelikes_id'], $row['action']);
                // Suppression de la notification après envoi
                $deleteSql = "DELETE FROM websocket_notifications_etatdelikes WHERE id = " . $row['id'];
                mysqli_query($this->con, $deleteSql);
            }
        }
    }

    // Méthode pour envoyer une mise à jour pour etatdelikes aux clients
    private function sendNewEtatDeLikesUpdate($etatdelikes_id, $action) {
        echo "Sending newwwwwwwww etatdelikes update for etatdelikes_id: $etatdelikes_id\n";
        $sql = "SELECT * FROM etatdelikes WHERE id = $etatdelikes_id";
        $result = mysqli_query($this->con, $sql);
    
        if ($result && $row = mysqli_fetch_assoc($result)) {
            $message = [
                'type' => 'etatdelikes_update',
                'payload' => $row,
                'action' => $action
            ];
            $json_message = json_encode($message);
    
            // Envoyer la mise à jour à tous les clients connectés
            foreach ($this->clients as $clientId => $client) {
                echo "Sending etatdelikes update to client {$clientId}\n";
                $this->safeSend($client, $json_message);
            }
        } else {
            echo "Failed to fetch etatdelikes with id $etatdelikes_id: " . mysqli_error($this->con) . "\n";
        }
    }
    

    // fonction pour envoie de pub initial
    private function sendInitialPubData($conn) {
        echo "Sending initial pub data to connection {$conn->resourceId}\n";
        $sql = "SELECT * FROM pub ORDER BY rangpub ASC";
        $result = mysqli_query($this->con, $sql);

        if ($result) {
            $pubs = [];

            while ($row = mysqli_fetch_assoc($result)) {
                $row['photo'] = "http://localhost/videopub/" . $row['photo'];
                $pubs[] = $row;
            }

            $message = [
                'type' => 'initial_pub',
                'payload' => $pubs
            ];
            $json_message = json_encode($message);

            // Envoyer les données à tous les clients connectés
            foreach ($this->clients as $client) {
                $this->safeSend($client, $json_message);
            }
        } else {
            echo "Failed to fetch initial pub data: " . mysqli_error($this->con) . "\n";
        }
    }


    private function checkForPubUpdates() {
        echo "Checking for new pub updates...\n";
        $sql = "SELECT * FROM log_pub_changes  ORDER BY modified_at ASC";
        $result = mysqli_query($this->con, $sql);

        if ($result && mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                echo "New pub notification found, sending update...\n";
                $this->sendNewPubUpdate($row['pub_id'], $row['action']);
                // Suppression de la notification après envoi
                $deleteSql = "DELETE FROM log_pub_changes  WHERE id = " . $row['id'];
                mysqli_query($this->con, $deleteSql);
            }
        }
    }

    private function sendNewPubUpdate($pub_id, $action) {
        echo "Sending new pub update for pub_id: $pub_id\n";
        $sql = "SELECT * FROM pub WHERE id = $pub_id";
        $result = mysqli_query($this->con, $sql);

        if ($result && $row = mysqli_fetch_assoc($result)) {
            $row['photo'] = "http://localhost/videopub/" . $row['photo'];
            $message = [
                'type' => 'pub_update',
                'payload' => $row,
                'action' => $action
            ];
            $json_message = json_encode($message);

            // Envoyer la mise à jour à tous les clients connectés
            foreach ($this->clients as $clientId => $client) {
                echo "Sending pub update to client {$clientId}\n";
                $this->safeSend($client, $json_message);
            }
        } else {
            echo "Failed to fetch pub with id $pub_id: " . mysqli_error($this->con) . "\n";
        }
    }
    

    // Méthode pour envoyer de manière sécurisée en gérant les exceptions
    private function safeSend($conn, $message) {
        try {
            $conn->send($message);
        } catch (\Exception $e) {
            echo "Error sending message to client {$conn->resourceId}: " . $e->getMessage() . "\n";
            unset($this->clients[$conn->resourceId]); // Retirer le client en cas d'erreur
        }
    }
}

// Créer la boucle d'événement ReactPHP
$loop = Loop::get();

// Créer le serveur WebSocket sans bloquer avec IoServer::run()
$webSocketServer = new WsServer(new WebSocketServer($con, $loop));
$httpServer = new HttpServer($webSocketServer);

$socket = new TcpServer('0.0.0.0:8081', $loop);
$server = new IoServer($httpServer, $socket, $loop);

echo "WebSocket server started.\n";

// Démarrer la boucle d'événement ReactPHP
$loop->run();
