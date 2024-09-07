<?php
include "config.php";
require 'vendor/autoload.php';

use Google\Auth\Credentials\ServiceAccountCredentials;
use GuzzleHttp\Client;

// Chemin vers le fichier JSON du compte de service
$keyFilePath = 'C:/xampp/htdocs/cle_firebase/pingoping-firebase-adminsdk-gjefv-00ca2d68c2.json';

// Scopes requis pour FCM
$scopes = ['https://www.googleapis.com/auth/firebase.messaging'];

// Créer les informations d'identification
$credentials = new ServiceAccountCredentials($scopes, $keyFilePath);

// Obtenir le jeton d'accès OAuth 2.0
$accessToken = $credentials->fetchAuthToken()['access_token'];

// Créer un client HTTP Guzzle
$client = new Client();

// Récupérer les données de la requête
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Sécuriser les entrées
$title = mysqli_real_escape_string($con, $data['title']);
$body = mysqli_real_escape_string($con, $data['body']);
$topic = mysqli_real_escape_string($con, $data['topic']);
$page = mysqli_real_escape_string($con, $data['page']);

// Vérification des champs requis
if (empty($topic) || empty($title) || empty($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'Tous les champs sont requis.']);
    exit;
}

// Fonction pour envoyer une notification via FCM
function sendNotification($client, $accessToken, $topic, $title, $body) {
    try {
        $response = $client->post('https://fcm.googleapis.com/v1/projects/pingoping/messages:send', [
            'headers' => [
                'Authorization' => 'Bearer ' . $accessToken,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'message' => [
                    'topic' => $topic,
                    'notification' => [
                        'title' => $title,
                        'body' => $body,
                    ],
                    'android' => [
                        'ttl' => '86400s',
                    ],
                    'apns' => [
                        'headers' => [
                            'apns-expiration' => (string)(time() + 86400),
                        ],
                    ],
                    'webpush' => [
                        'headers' => [
                            'TTL' => '86400',
                        ],
                    ],
                ],
            ],
        ]);

        return $response->getBody()->getContents();
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Échec de l\'envoi de la notification.', 'details' => $e->getMessage()]);
        exit;
    }
}

// Envoyer la notification
sendNotification($client, $accessToken, $topic, $title, $body);

// Fonction pour insérer la notification dans la base de données
function insertNotification($con, $title, $body, $page = null, $id_element = null) {
if ($page) {
        $sql = "INSERT INTO notifications (title, message, page) VALUES ('$title', '$body', '$page')";
    } else {
        $sql = "INSERT INTO notifications (title, message) VALUES ('$title', '$body')";
    }

    if (mysqli_query($con, $sql)) {
        return mysqli_insert_id($con);
    } else {
        echo json_encode(['error' => mysqli_error($con)]);
        exit;
    }
}


// Insertion de la notification
$notificationId = insertNotification($con, $title, $body, $page);
if ($topic === 'admin' || $topic === 'superadmin') {
    // Associer la notification aux administrateurs et superadministrateurs
    $usersSql = "INSERT INTO user_notifications (user_id, notification_id)
                 SELECT id, '$notificationId' FROM user WHERE grade = 'admin' OR grade = 'superadmin'";
}
 else {
    // Associer la notification à tous les utilisateurs
    $usersSql = "INSERT INTO user_notifications (user_id, notification_id)
                 SELECT id, '$notificationId' FROM user";
}


if (mysqli_query($con, $usersSql)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => mysqli_error($con)]);
}

