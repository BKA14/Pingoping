<?php
require 'vendor/autoload.php';
include "config.php";

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use React\EventLoop\Factory as LoopFactory;
use Clue\React\Redis\Factory as RedisFactory;
use React\Socket\Server as ReactServer;
use Ratchet\WebSocket\WsServer;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;

echo "Starting WebSocket server...\n";

class WebSocketServer implements MessageComponentInterface {
    protected $clients;
    protected $redis;
    protected $con;
    protected $loop;

    public function __construct($con, $loop) {
        $this->clients = new \SplObjectStorage;
        $this->con = $con; // Initialisation de la connexion MySQL
        $this->loop = $loop;

        // Connexion à Redis
        $redisFactory = new RedisFactory($loop);
        $redisFactory->createClient('redis://127.0.0.1:6379')->then(function ($client) {
            $this->redis = $client;
            echo "Connected to Redis\n";

            // Souscription aux canaux Redis une seule fois
            $this->subscribeToChannel('signalisation_channel', 'sendNewAlert');
            $this->subscribeToChannel('pub_channel_pub', 'sendNewPub');
            $this->subscribeToChannel('likes_channel', 'sendNewLikes');
            $this->subscribeToChannel('commentaires_channel', 'sendNewCommentaires');
            $this->subscribeToChannel('date_event_channel', 'sendNewDateEvent');
            $this->subscribeToChannel('signalement_channel', 'sendNewSignalement');
            $this->subscribeToChannel('user_channel', 'sendNewUser');
        });

        // Connexion à la base de données
        if ($this->con->connect_error) {
            die("Connection failed: " . $this->con->connect_error);
        }
    }

    private function subscribeToChannel($channel, $callback) {
        echo "Subscribing to Redis channel '$channel'...\n";
        
        // Souscription au canal Redis
        $this->redis->subscribe($channel)->then(function () use ($channel) {
            echo "Subscribed to Redis channel '$channel'\n";
        });

        // Écoute des messages
        $this->redis->on('message', function ($channel, $message) use ($callback) {
            $data = json_decode($message, true);

            if ($data !== null) {
                $this->$callback($data);
            } else {
                echo "Invalid message format received from Redis\n";
            }
        });
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        echo "Message from {$from->resourceId}: $msg\n";
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }

    private function sendNewUser($data) {
        $this->sendDataUser('user', $data);
    }

    private function sendNewAlert($data) {
        $this->sendData('signalisation', 'image', 'http://localhost/alert/', $data);
    }

    private function sendNewSignalement($data) {
        $this->sendData('signalement', '', '', $data);
    }

    private function sendNewPub($data) {
        $this->sendData('pub', 'photo', 'http://localhost/videopub/', $data);
    }

    private function sendNewLikes($data) {
        $this->sendNbrLike('etatdelikes', $data);
    }

    private function sendNewCommentaires($data) {
        $this->sendData('commentaires', '', '', $data);
    }

    private function sendNewDateEvent($data) {

        $id= $data['id'] ?? null;
        $countdown = $data['countdown'] ?? null;
       
            $date = [
                'id' =>  $id,
                'countdown' =>  $countdown,
                'type' =>  'pub',
                'action' =>  'date',
            ];
            $this->broadcastMessage($date);
    }

    

    private function sendData($table, $imageField, $imagePath, $data) {
        $idField = "{$table}_id";
        $id = $data[$idField] ?? null;
        $action = $data['action'] ?? null;
        $oldId = $data['old_' . $idField] ?? null;
        
        if ($id === null || $action === null) {
            echo "Missing required data: $idField or action\n";
            return;
        }

        if ($action === 'delete') {
            $alert = [
                $idField => $id,
                'action' => $action,
                'type' => $table,
            ];
            $this->broadcastMessage($alert);
        } else {
            $stmt = $this->con->prepare("SELECT * FROM $table WHERE id = ?");
            $stmt->bind_param("s", $id);

            if ($stmt->execute()) {
                $result = $stmt->get_result();

                if ($result && $row = $result->fetch_assoc()) {
                    if ($imageField) {
                        $row[$imageField] = $imagePath . $row[$imageField];
                    }
                    $row['action'] = $action;
                    $row[$idField] = $id;
                    $row['old_' . $idField] = $oldId;
                    $row['type'] = $table;
                    $this->broadcastMessage($row);
                } else {
                    echo "Failed to fetch $table with id $id: " . $stmt->error . "\n";
                }
            } else {
                echo "Failed to execute query: " . $stmt->error . "\n";
            }

            $stmt->close();
        }
    }


    private function sendDataUser($table, $data) {
        $idField = "{$table}_id";
        $id = trim($data[$idField] ?? null);  // Trim to remove any whitespace
        $action = $data['action'] ?? null;
        $oldId = trim($data['old_' . $idField] ?? null);  // Trim old ID too
        
        if ($id === null || $action === null) {
            echo "Missing required data: $idField or action\n";
            return;
        }
    
        if ($action === 'delete') {
            $alert = [
                $idField => $id,
                'action' => $action,
                'type' => $table,
            ];
            $this->broadcastMessage($alert);
        } else {
            $stmt = $this->con->prepare("SELECT id, nom, prenom, genre, grade, datefinblocage, date_inscription, email, contact, access_app FROM $table WHERE id = ?");
            $stmt->bind_param("s", $id);
    
            if ($stmt->execute()) {
                $result = $stmt->get_result();
    
                if ($result && $row = $result->fetch_assoc()) {
                    $row['action'] = $action;
                    $row[$idField] = $id;
                    $row['old_' . $idField] = $oldId;
                    $row['type'] = $table;
                    $this->broadcastMessage($row);
                } else {
                    echo "Failed to fetch $table with id $id: " . $stmt->error . "\n";
                }
            } else {
                echo "Failed to execute query: " . $stmt->error . "\n";
            }
    
            $stmt->close();
        }
    }
    
    
    private function sendNbrLike($table, $data) {
        $idField = "{$table}_id";
        $id = $data[$idField] ?? null;
        $action = $data['action'] ?? null;
        $oldId = $data['old_' . $idField] ?? null;
        $idpub = $data['idpub'] ?? null;
        $createdAt = $data['created_at'] ?? null;

        if ($idpub === null || $action === null) {
            echo "Missing required data: idpub or action\n";
            return;
        }
    
        // Utilisation de $this->con pour la connexion à la base de données
        $con = $this->con;
    
        // Récupérer le nombre de likes pour le idpub concerné
        $queryLikes = "SELECT COUNT(*) AS likes_count FROM etatdelikes WHERE idpub = ? AND etat = 'oui'";
        $stmtLikes = $con->prepare($queryLikes);
        $stmtLikes->bind_param("i", $idpub);
        $stmtLikes->execute();
        $resultLikes = $stmtLikes->get_result();
        $rowLikes = $resultLikes->fetch_assoc();
        $likesCount = (int) $rowLikes['likes_count'];
        $stmtLikes->close();
    
        // Récupérer les iduser pour le idpub concerné
        $queryUsers = "SELECT iduser FROM etatdelikes WHERE idpub = ? AND etat = 'oui'";
        $stmtUsers = $con->prepare($queryUsers);
        $stmtUsers->bind_param("i", $idpub);
        $stmtUsers->execute();
        $resultUsers = $stmtUsers->get_result();
        $userIds = [];
        while ($rowUsers = $resultUsers->fetch_assoc()) {
            $userIds[] = $rowUsers['iduser'];
        }
        $stmtUsers->close();
    
        // Préparer les données à envoyer aux clients
        $resultat = [
            'idpub' => $idpub,
            'likes_count' => $likesCount,
            'user_ids' => $userIds,
            'action' => $action,
            'etatdelikes_id' => $id,
            'old_etatdelikes_id' => $oldId,
            'type' => $table, // Ajout de type pour indiquer la table concernée
            'timestamp' => $createdAt,
        ];
    
        // Envoyer les données via WebSocket
        $this->broadcastMessage($resultat);
    }

    private function broadcastMessage($message) {
        $jsonMessage = json_encode($message);
        foreach ($this->clients as $clientId => $client) {
            echo "Sending message to client {$clientId}\n";
            $this->safeSend($client, $jsonMessage);
        }
    }

    private function safeSend($client, $message) {
        try {
            $client->send($message);
        } catch (Exception $e) {
            echo "Failed to send message to client {$client->resourceId}: {$e->getMessage()}\n";
        }
    }
}

// Créer la boucle d'événements
$loop = LoopFactory::create();

// Créer le serveur de socket
$socket = new ReactServer('0.0.0.0:8081', $loop);

// Instancier le serveur WebSocket
$webSocket = new WsServer(new WebSocketServer($con, $loop));
$httpServer = new HttpServer($webSocket);
$ioServer = new IoServer($httpServer, $socket, $loop);

echo "WebSocket server running on port 8081...\n";

// Démarrer la boucle d'événements
$loop->run();
