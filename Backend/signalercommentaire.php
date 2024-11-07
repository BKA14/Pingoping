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
$message = array();

// Fonction pour générer un ID unique
function generateUniqueID($con) {
    $unique = false;
    while (!$unique) {
        $id = uniqid();
        $query = mysqli_query($con, "SELECT * FROM `signalement` WHERE `id` = '$id'");
        if (mysqli_num_rows($query) == 0) {
            $unique = true;
        }
    }
    return $id;
}

// Générer un ID unique
$id = generateUniqueID($con);



// Extraire les données du commentaire à partir des données JSON
// donnee du signaleur
$nomsignaleur = $data['nomsignaleur'];
$prenomdusignaleur = $data['prenomdusignaleur'];
$iduserdusignaleur = $data['iduserdusignaleur'];


//id commentaire 
$idcomsignaler = $data['idcomsignaler'];

//bouton traitement 
$traitement = 'non';

// donnee du signalé
$nomestsignaler = $data['nomestsignaler'];
$prenomestsignaler = $data['prenomestsignaler'];
$heurecomdusignaler = $data['heurecomdusignaler'];
$commentairesignaler = $data['commentairesignaler'];
$pubidcomsignaler = $data['pubidcomsignaler'];
$idusersignaler = $data['idusersignaler'];

// Préparer et exécuter la requête SQL pour insérer le commentaire dans la base de données
$sql = "INSERT INTO signalement (id, nomsignaleur, prenomdusignaleur, iduserdusignaleur, nomestsignaler, prenomestsignaler, heurecomdusignaler, commentairesignaler, pubidcomsignaler, idcomsignaler, idusersignaler, traitement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($con, $sql);
mysqli_stmt_bind_param($stmt, "ssssssssssss", $id, $nomsignaleur, $prenomdusignaleur, $iduserdusignaleur, $nomestsignaler, $prenomestsignaler, $heurecomdusignaler, $commentairesignaler, $pubidcomsignaler, $idcomsignaler, $idusersignaler, $traitement);
$success = mysqli_stmt_execute($stmt);

// Préparer et exécuter la requête SQL pour insérer le commentaire dans la base de données
$sqll = "INSERT INTO signalement_stockage (id, nomsignaleur, prenomdusignaleur, iduserdusignaleur, nomestsignaler, prenomestsignaler, heurecomdusignaler, commentairesignaler, pubidcomsignaler, idcomsignaler, idusersignaler, traitement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($con, $sqll);
mysqli_stmt_bind_param($stmt, "ssssssssssss", $id, $nomsignaleur, $prenomdusignaleur, $iduserdusignaleur, $nomestsignaler, $prenomestsignaler, $heurecomdusignaler, $commentairesignaler, $pubidcomsignaler, $idcomsignaler, $idusersignaler, $traitement);
$success = mysqli_stmt_execute($stmt);

// Vérifier le succès de l'insertion

if ($success) {
    http_response_code(201); // Indiquer que la création a réussi
    $message['status'] = "Success";
} else {
    http_response_code(422); // Indiquer une erreur de traitement
    $message['status'] = "Error";
}

// Retourner la réponse au format JSON
echo json_encode($message);



// Notification
$title = "Nouveau commentaire signalé";
$body = "Un nouveau commentaire signalé";
$page = "signalement";

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

