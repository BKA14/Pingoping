<?php
require 'vendor/autoload.php';
include "config.php";

$redis = new Predis\Client();
$con = new mysqli($host, $user, $password, $dbname, $port);

use Google\Auth\Credentials\ServiceAccountCredentials;
use GuzzleHttp\Client;


if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

// Set the sleep intervals in seconds
$DateBlocageInterval = 90; // temps de lancement de la fonction deblocage
$signalisationInterval = 8; // Interval for signalisation function
$pubInterval = 8; // Interval for pub function
$LikesInterval = 0.5 ; // Interval for likes function
$CommentairesInterval =  0.5; // Interval for Commentaires function
$EvenementInterval =  61; 
$SignalementInterval =  7; 
$UserInterval =  2; 

// Track the last execution time for each function
$lastDateBlocageUpdateTime = 0;
$lastSignalisationTime = 0;
$lastPubTime = 0;
$lastLikesTime = 0; // temps de lancement de la fonction recuperation de likes
$lastCommentairesTime = 0; // temps de lancement de la fonction recuperation de commentaires
$lastDateEvenementTime = 0;
$lastDateSignalementTime = 0;
$lastDateUserTime = 0;

while (true) {
    $currentTime = time();

     // Check if it's time to run the DebloquerUser function
     if ($currentTime - $lastDateBlocageUpdateTime >= $DateBlocageInterval) {
        DebloquerUser($con);
        $lastDateBlocageUpdateTime = $currentTime;
    }

    // Check if it's time to run the signalisation function
    if ($currentTime - $lastSignalisationTime >= $signalisationInterval) {
        signalisation($con, $redis);
        $lastSignalisationTime = $currentTime;
    }

    // Check if it's time to run the pub function
    if ($currentTime - $lastPubTime >= $pubInterval) {
        pub($con, $redis);
        $lastPubTime = $currentTime;
    }

     // Check if it's time to run the pub function
     if ($currentTime - $lastLikesTime >= $LikesInterval) {
        likes($con, $redis);
        $lastLikesTime = $currentTime;
    }

       // Check if it's time to run the commentaires function
       if ($currentTime - $lastCommentairesTime >= $CommentairesInterval) {
        commentaires($con, $redis);
        $lastCommentairesTime = $currentTime;
    }

        // Check if it's time to run the date  evenement  function
        if ($currentTime - $lastDateEvenementTime >= $EvenementInterval) {
            updateCountdownForAds($con, $redis);
            $lastDateEvenementTime = $currentTime;
        }

        // Check if it's time to run the date  signalement  function
        if ($currentTime - $lastDateSignalementTime >= $SignalementInterval) {
            signalement($con, $redis);
            $lastDateSignalementTime = $currentTime;
        }

        // Check if it's time to run the date  signalement  function
        if ($currentTime - $lastDateUserTime >= $UserInterval) {
            user($con, $redis);
            $lastDateUserTime = $currentTime;
        }


    // Small sleep to prevent the loop from running too fast
    sleep(0.1);
    echo "Script running...\n"; // Debug message
}

/////////////////////////////// Pour les notiications //////////////////////////////////////////////////////


// Fonction pour envoyer la notification via FCM
function sendFCMNotification($title, $body) {
   // Remplacez par le chemin de votre fichier JSON du compte de service
$keyFilePath = 'C:/xampp/htdocs/cle_firebase/pingoping-firebase-adminsdk-gjefv-a0eaaa87d9.json';

// Scopes requis pour FCM
$scopes = ['https://www.googleapis.com/auth/firebase.messaging'];

// Créer les informations d'identification
$credentials = new ServiceAccountCredentials($scopes, $keyFilePath);

// Obtenir le jeton d'accès OAuth 2.0
$accessToken = $credentials->fetchAuthToken()['access_token'];

// Créer un client HTTP Guzzle
$client = new Client();

// Récupérer les données de la requête (par exemple, envoyées en JSON)
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Exemple de réception des données
$topic = 'admin'; // Récupérer le topic depuis la requête

// Construire la requête pour FCM
try {
    $response = $client->post('https://fcm.googleapis.com/v1/projects/pingoping/messages:send', [
        'headers' => [
            'Authorization' => 'Bearer ' . $accessToken, // Ajouter le Bearer Token ici
            'Content-Type' => 'application/json',
        ],
        'json' => [
            'message' => [
                'topic' => $topic,
                'notification' => [
                    'title' => $title,
                    'body' => $body,
                ],
                // Ajouter le TTL ici (en secondes)
                'android' => [
                    'ttl' => '7200s', // 2 heures
                ],
                'apns' => [
                    'headers' => [
                        'apns-expiration' => (string)(time() + 7200),
                    ],
                ],
                'webpush' => [
                    'headers' => [
                        'TTL' => '7200',
                    ],
                ],
            ],
        ],
    ]);

    // Retourner la réponse de FCM
    echo $response->getBody()->getContents();
} catch (Exception $e) {
    // Gérer les erreurs de requête
    http_response_code(500);
    echo json_encode(['error' => 'Échec de l\'envoi de la notification.', 'details' => $e->getMessage()]);
}

    
}


///////////////////////// Pour les Likes ///////////////////////////////////
// Mettre à jour la date de fin de blocage pour les utilisateurs dont la date est dépassée

// Récupérer la date actuelle
function DebloquerUser($con) {
    // Retrieve events to process
    $sql = "UPDATE `user` SET datefinblocage = 'non' 
            WHERE datefinblocage IS NULL 
            OR datefinblocage < " . time() . " 
            OR datefinblocage = 'non'";
    
    if ($con->query($sql) === TRUE) {
        echo "Deblocage des users .";
    } else {
        echo "Error updating records: " . $con->error;
    }
}

///////////////////////// Pour actualiser les dates avant evenement ///////////////////////////////////

function updateCountdownForAds($con, $redis) {
    // Définir le fuseau horaire sur le Burkina Faso (UTC+0)
    date_default_timezone_set('Africa/Ouagadougou');

    $now = new DateTime();
    $sql = "SELECT id, date, datefin FROM pub";
    $result = mysqli_query($con, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $pub = array(
                'id' => $row['id'],
                'date' => $row['date'],
                'datefin' => $row['datefin'],
                'countdown' => ''
            );

            if ($row['date'] === 'non' || $row['datefin'] === 'non') {
                $pub['countdown'] = 'non';
            } else {
                $startDate = new DateTime(trim($row['date']));
                $endDate = new DateTime(trim($row['datefin']));

                if ($now < $startDate && $startDate < $endDate) {
                    $difference = $startDate->getTimestamp() - $now->getTimestamp();
                    $days = floor($difference / (60 * 60 * 24));
                    $hours = floor(($difference % (60 * 60 * 24)) / (60 * 60));
                    $minutes = floor(($difference % (60 * 60)) / 60);

                    $pub['countdown'] = "{$days}J - {$hours}h - {$minutes}m avant le début";
                } else if ($now < $endDate && $startDate < $endDate) {
                    $pub['countdown'] = 'Événement en cours!';
                } else if ($endDate->getTimestamp() === $startDate->getTimestamp()) {
                    $pub['countdown'] = 'non';
                } else if ($endDate < $startDate) {
                    $pub['countdown'] = 'Événement terminé';
                } else {
                    $pub['countdown'] = 'non';
                }

                $event = array(
                    'id' => $row['id'],
                    'countdown' => $pub['countdown']
                );

                try {
                    // Publier l'événement sur Redis
                    $redis->publish('date_event_channel', json_encode($event));
                    echo "Événement publié avec ID {$row['id']} sur Redis.\n";
                } catch (Exception $e) {
                    echo 'Erreur lors du traitement de l\'événement : ' . $e->getMessage() . "\n";
                }
            }
        }
    }
    mysqli_free_result($result);
}



///////////////////////// Pour les modification des donnes user. ///////////////////////////////////
function user($con, $redis) {
    // Retrieve events to process
    $result_user = $con->query("SELECT * FROM redis_events_user");

    // Check if there are events to process
    if ($result_user && $result_user->num_rows > 0) {
        while ($row = $result_user->fetch_assoc()) {
            $event = [
                'action' => $row['action'],
                'user_id' => $row['user_id'],
                'old_user_id' => $row['old_user_id'],
                'timestamp' => $row['created_at']
            ];

            try {
                // Publish the event to Redis
                $redis->publish('user_channel', json_encode($event));
                echo "Published event with ID {$row['id']} to Redis.\n";

                // Delete the event from the table after processing
                $con->query("DELETE FROM redis_events_user WHERE id = " . $row['id']);
                echo "Deleted event with ID {$row['id']} from table user.\n";
            } catch (Exception $e) {
                echo 'Error processing event: ' . $e->getMessage() . "\n";
            }
        }
    }
}


///////////////////////// Pour la signalisation ///////////////////////////////////
function signalisation($con, $redis) {
    // Retrieve events to process
    $result_signalisation = $con->query("SELECT * FROM redis_events_signalisation");

    // Check if there are events to process
    if ($result_signalisation && $result_signalisation->num_rows > 0) {
        while ($row = $result_signalisation->fetch_assoc()) {
            $event = [
                'action' => $row['action'],
                'signalisation_id' => $row['signalisation_id'],
                'old_signalisation_id' => $row['old_signalisation_id'],
                'timestamp' => $row['created_at']
            ];

            try {
                // Publish the event to Redis
                $redis->publish('signalisation_channel', json_encode($event));
                echo "Published event with ID {$row['id']} to Redis.\n";

                if ($row['action'] === 'insert'){
                $title = "Nouvelle alerte";
                $body = "Une nouvelle alerte a été ajoutée avec l'ID: {$row['id']}\n"; // Échapper les données
                sendFCMNotification($title, $body); // notiication envoyé
                }

                // Delete the event from the table after processing
                $con->query("DELETE FROM redis_events_signalisation WHERE id = " . $row['id']);
                echo "Deleted event with ID {$row['id']} from table signalisation.\n";
            } catch (Exception $e) {
                echo 'Error processing event: ' . $e->getMessage() . "\n";
            }
        }
    }
}

///////////////////////// Pour les Pub ///////////////////////////////////

function pub($con, $redis) {
    // Retrieve events to process
    $result_pub = $con->query("SELECT * FROM redis_events_pub");

    // Check if there are events to process
    if ($result_pub && $result_pub->num_rows > 0) {
        while ($row = $result_pub->fetch_assoc()) {
            $event = [
                'action' => $row['action'],
                'pub_id' => $row['pub_id'],
                'old_pub_id' => $row['old_pub_id'],
                'timestamp' => $row['created_at']
            ];

            try {
                // Publish the event to Redis
                $redis->publish('pub_channel_pub', json_encode($event));
                echo "Published event with ID {$row['id']} to Redis.\n";

                // Delete the event from the table after processing
                $con->query("DELETE FROM redis_events_pub WHERE id = " . $row['id']);
                echo "Deleted event with ID {$row['id']} from table pub.\n";
            } catch (Exception $e) {
                echo 'Error processing event: ' . $e->getMessage() . "\n";
            }
        }
    }
}


///////////////////////// Pour les Likes ///////////////////////////////////

function likes($con, $redis) {
    // Retrieve events to process
    $result_likes = $con->query("SELECT * FROM `redis_events_likes`  ORDER BY id ASC");

    // Check if there are events to process
    if ($result_likes && $result_likes->num_rows > 0) {
        while ($row = $result_likes->fetch_assoc()) {
            $event = [
                'action' => $row['action'],
                'etatdelikes_id' => $row['etatdelikes_id'],
                'old_etatdelikes_id' => $row['old_etatdelikes_id'],
                'idpub' => $row['idpub'],
                'timestamp' => $row['created_at']
            ];

            try {
                // Publish the event to Redis
                $redis->publish('likes_channel', json_encode($event));
                echo "Published event with ID {$row['id']} to Redis.\n";

                // Delete the event from the table after processing
                $con->query("DELETE FROM redis_events_likes WHERE id = " . $row['id']);
                echo "Deleted event with ID {$row['id']} from table event.\n";
            } catch (Exception $e) {
                echo 'Error processing event: ' . $e->getMessage() . "\n";
            }
        }
    }
}



function commentaires($con, $redis) {
    // Retrieve events to process
    $result_likes = $con->query("SELECT * FROM `redis_events_commentaires`  ORDER BY id ASC");

    // Check if there are events to process
    if ($result_likes && $result_likes->num_rows > 0) {
        while ($row = $result_likes->fetch_assoc()) {
            $event = [
                'action' => $row['action'],
                'commentaires_id' => $row['commentaires_id'],
                'old_commentaires_id' => $row['old_commentaires_id'],
                'timestamp' => $row['created_at']
            ];

            try {
                // Publish the event to Redis
                $redis->publish('commentaires_channel', json_encode($event));
                echo "Published event with ID {$row['id']} to Redis.\n";

                // Delete the event from the table after processing
                $con->query("DELETE FROM redis_events_commentaires WHERE id = " . $row['id']);
                echo "Deleted event with ID {$row['id']} from table event.\n";
            } catch (Exception $e) {
                echo 'Error processing event: ' . $e->getMessage() . "\n";
            }
        }
    }
}


///////////////////////// Pour le signalement ///////////////////////////////////
function signalement($con, $redis) {
    // Retrieve events to process
    $result_signalement = $con->query("SELECT * FROM redis_events_signalement");

    // Check if there are events to process
    if ($result_signalement && $result_signalement->num_rows > 0) {
        while ($row = $result_signalement->fetch_assoc()) {
            $event = [
                'action' => $row['action'],
                'signalement_id' => $row['signalement_id'],
                'old_signalement_id' => $row['old_signalement_id'],
                'timestamp' => $row['created_at']
            ];

            try {
                // Publish the event to Redis
                $redis->publish('signalement_channel', json_encode($event));
                echo "Published event with ID {$row['id']} to Redis.\n";

                if ($row['action'] === 'insert'){
                    $title = "Nouveau signalement";
                    $body = "Un nouveau signalement a été ajoutée avec l'ID: {$row['id']}\n"; // Échapper les données
                    sendFCMNotification($title, $body); // notiication envoyé
                    }

                // Delete the event from the table after processing
                $con->query("DELETE FROM redis_events_signalement WHERE id = " . $row['id']);
                echo "Deleted event with ID {$row['id']} from table signalement.\n";
            } catch (Exception $e) {
                echo 'Error processing event: ' . $e->getMessage() . "\n";
            }
        }
    }
}