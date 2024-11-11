<?php

include "config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

require 'vendor/autoload.php';

$redis = new Predis\Client();
$con = new mysqli($host, $user, $password, $dbname, $port);

use Google\Auth\Credentials\ServiceAccountCredentials;
use GuzzleHttp\Client;

$input = json_decode(file_get_contents('php://input'), true);

$message = array();

// Fonction pour générer un ID unique
function generateUniqueID($con) {
    $unique = false;
    while (!$unique) {
        $id = uniqid();
        $query = mysqli_query($con, "SELECT * FROM `signalisation` WHERE `id` = '$id'");
        if (mysqli_num_rows($query) == 0) {
            $unique = true;
        }
    }
    return $id;
}

$id = generateUniqueID($con);
$nom = $_POST['nom'];
$iduser = $_POST['iduser'];
$contactuser = $_POST['numero'];
$prenom = $_POST['prenom'];
$description = $_POST['description']?? 'non';
$service = $_POST['service'];
$ville = $_POST['ville'];
$statut = 'non';
$rapport = 'non';
$statut_rapport = 'non';

// Décoder les données JSON pour location
$location = json_decode($_POST['location'], true);
$longitude = $location['longitude'];
$latitude = $location['latitude'];

// Vérifier que les données de longitude et latitude sont présentes
if (!isset($longitude) || !isset($latitude) || !isset($nom) || !isset($prenom) || !isset($iduser) || !isset($contactuser)  || !isset($description) ) {
    http_response_code(422);
    $message['status'] = "Error";
    $message['message'] = "Données non présentes";
    echo json_encode($message);
    exit;
}

// Initialiser une variable pour stocker le chemin du fichier
$target_path = "";

// Vérifier si un fichier a été téléchargé
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $file_tmp = $_FILES['image']['tmp_name'];

    function generateRandomString($length) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randomString;
    }

    // Générez un nom de fichier unique de 22 caractères
    $file_name = generateRandomString(22) . "." . pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);

    // Spécifiez le chemin cible où vous souhaitez enregistrer le fichier sur votre serveur
    $target_path =  $url_move_alert . $file_name;

    // Déplacez le fichier téléchargé vers le chemin spécifié
    if (!move_uploaded_file($file_tmp, $target_path)) {
        // Gérer les erreurs côté serveur
        http_response_code(422);
        $message['status'] = "Error moving file";
        echo json_encode($message);
        exit;
    }
}

$q = mysqli_query($con, "INSERT INTO `signalisation` (`id`, `iduser`, `image`, `numuser`, `nom`, `prenom`, `longitude`, `latitude`, `description`, `service`, `statut`, `rapport`, `statut_rapport`, `ville`) 
    VALUES ('$id', '$iduser', '$file_name', '$contactuser', '$nom', '$prenom', '$longitude', '$latitude', '$description', '$service', '$statut', '$rapport', '$statut_rapport' , '$ville')");

$qq = mysqli_query($con, "INSERT INTO `signalisation_stockage` (`id`, `iduser`, `image`, `numuser`, `nom`, `prenom`, `longitude`, `latitude`, `description`, `service`, `statut`, `rapport`, `statut_rapport`, `ville`) 
    VALUES ('$id', '$iduser', '$file_name', '$contactuser', '$nom', '$prenom', '$longitude', '$latitude', '$description', '$service', '$statut', '$rapport', '$statut_rapport', '$ville')");

if ($q && $qq) {
    http_response_code(201);
    $message['status'] = "Success";
} else {
    http_response_code(422);
    $message['status'] = "Error";
}

echo json_encode($message);




// Notification
$title = "Nouvelle alert";
$body = "Une nouvelle  a été envoyé";
$page = "alert-user";

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
    $keyFilePath = 'cle_firebase/pingoping-firebase-adminsdk-gjefv-a0eaaa87d9.json';
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
