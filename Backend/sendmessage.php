<?php

include "config.php";
require 'vendor/autoload.php';

$redis = new Predis\Client();
$con = new mysqli($host, $user, $password, $dbname, $port);

use Google\Auth\Credentials\ServiceAccountCredentials;
use GuzzleHttp\Client;

$input = json_decode(file_get_contents('php://input'), true);

// Récupérer les données JSON de la requête POST
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Initialiser un tableau pour la réponse JSON
$response = array();

// Fonction pour générer un ID unique
function generateUniqueID($con) {
    do {
        $id = uniqid();
        $query = mysqli_query($con, "SELECT * FROM `message_user` WHERE `id` = '$id'");
    } while (mysqli_num_rows($query) > 0);
    
    return $id;
}

// Valider les données d'entrée
$iduser = isset($data['iduser']) ? trim($data['iduser']) : null;
$nom = isset($data['nom']) ? trim($data['nom']) : null;
$prenom = isset($data['prenom']) ? trim($data['prenom']) : null;
$contact = isset($data['contact']) ? trim($data['contact']) : null;
$message = isset($data['message']) ? trim($data['message']) : null;

if ($iduser && $nom && $prenom && $contact && $message) {
    if (strlen($message) > 300) {
        http_response_code(400); // Bad Request
        $response['status'] = "Error";
        $response['message'] = "Message trop long. Maximum 300 caractères autorisés.";
    } else {
        // Générer un ID unique
        $id = generateUniqueID($con);

        // Préparer et exécuter la requête SQL pour insérer le message dans les tables
        $sql = "INSERT INTO message_user (id, iduser, message, nom, prenom, contact) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($con, $sql);
        mysqli_stmt_bind_param($stmt, "sssssi", $id, $iduser, $message, $nom, $prenom, $contact);
        $success_message_user = mysqli_stmt_execute($stmt);

        // Insertion dans la table `message_userstockage`
        $sql_stockage = "INSERT INTO message_userstockage (id, iduser, message, nom, prenom, contact) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt_stockage = mysqli_prepare($con, $sql_stockage);
        mysqli_stmt_bind_param($stmt_stockage, "sssssi", $id, $iduser, $message, $nom, $prenom, $contact);
        $success_message_userstockage = mysqli_stmt_execute($stmt_stockage);

        // Vérifier le succès de l'insertion dans les deux tables
        if ($success_message_user && $success_message_userstockage) {
            http_response_code(201); // Created
            $response['status'] = "Success";
            $response['id'] = $id;
        } else {
            http_response_code(422); // Unprocessable Entity
            $response['status'] = "Error";
            $response['message'] = "Erreur lors de l'insertion du message.";
        }
    }
} else {
    http_response_code(400); // Bad Request
    $response['status'] = "Error";
    $response['message'] = "Données manquantes ou invalides.";
}

// Retourner la réponse au format JSON
echo json_encode($response);




// Notification
$title = "Nouveau message";
$body = "Un nouveau message a été envoyé";
$page = "message-admin";

// Essayer d'envoyer la notification, sans affecter la réponse précédente
try {
    sendFCMNotification($con, $title, $body, $page);
} catch (Exception $e) {
    // Log or handle the error without affecting the user response
}

// Fermer la connexion à la base de données
mysqli_close($con);


function insertNotification($con, $title, $body, $page) {
    $sql = "INSERT INTO notifications (title, message, page) VALUES ('$title', '$body', '$page')";
    return mysqli_query($con, $sql) ? mysqli_insert_id($con) : null;
}

function sendFCMNotification($con, $title, $body, $page) {
    $keyFilePath = 'C:/xampp/htdocs/cle_firebase/pingoping-firebase-adminsdk-gjefv-a0eaaa87d9.json';
    $scopes = ['https://www.googleapis.com/auth/firebase.messaging'];
    $credentials = new ServiceAccountCredentials($scopes, $keyFilePath);
    $accessToken = $credentials->fetchAuthToken()['access_token'];
    $client = new Client();

    $topic = 'admin';

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
                'android' => ['ttl' => '7200s'],
                'apns' => ['headers' => ['apns-expiration' => (string)(time() + 7200)]],
                'webpush' => ['headers' => ['TTL' => '7200']],
            ],
        ],
    ]);

    $notificationId = insertNotification($con, $title, $body, $page);
    if ($notificationId) {
        $usersSql = "INSERT INTO user_notifications (user_id, notification_id) 
                     SELECT id, '$notificationId' FROM user WHERE grade IN ('admin', 'superadmin')";
        mysqli_query($con, $usersSql);
    }
}
