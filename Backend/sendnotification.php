<?php
include "config.php";
require 'vendor/autoload.php';

use Google\Auth\Credentials\ServiceAccountCredentials;
use GuzzleHttp\Client;

// Remplacez par le chemin de votre fichier JSON du compte de service
$keyFilePath = 'C:/xampp/htdocs/cle_firebase/pingoping-firebase-adminsdk-gjefv-00ca2d68c2.json';

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
$topic = $data['topic']; // Récupérer le topic depuis la requête
$title = $data['title']; // Récupérer le titre depuis la requête
$body = $data['body']; // Récupérer le corps de la notification depuis la requête

// Vérification que tous les champs requis sont présents
if (empty($topic) || empty($title) || empty($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'Tous les champs sont requis.']);
    exit;
}

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
