<?php

include "config.php";
include 'auth_admin.php'; // Inclure le fichier d'authentification admin

// Appel de la fonction pour vérifier le token et le grade
$userData = verifyAdminToken();

require 'vendor/autoload.php';

$redis = new Predis\Client();
$con = new mysqli($host, $user, $password, $dbname, $port);

use Google\Auth\Credentials\ServiceAccountCredentials;
use GuzzleHttp\Client;

$input = json_decode(file_get_contents('php://input'), true);

$cart = $input['cart'];
$total = $input['total'];
$user = $input['user'];
$location = $input['location'];

// Vérifier si l'utilisateur existe
$stmt_check_user = $con->prepare("SELECT id, nom, prenom, contact FROM user WHERE id = ?");
$stmt_check_user->bind_param("s", $user['id']); 
$stmt_check_user->execute();
$result = $stmt_check_user->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['error' => 'L\'utilisateur avec cet ID n\'existe pas.']);
    $stmt_check_user->close();
    $con->close();
    exit();
}

// Récupérer les informations de l'utilisateur
$user_data = $result->fetch_assoc();
$nom_user = $user_data['nom'];
$prenom_user = $user_data['prenom'];
$contact_user = $user_data['contact'];

// Préparer la requête pour insérer la commande
$stmt = $con->prepare("INSERT INTO commandes (user_id, total, date_commande, nom_user, prenom_user, contact_user, latitude, longitude) 
                       VALUES (?, ?, NOW(), ?, ?, ?, ?, ?)");
$stmt->bind_param("sdsssdd", $user['id'], $total, $nom_user, $prenom_user, $contact_user, $location['latitude'], $location['longitude']); 

if (!$stmt->execute()) {
    echo json_encode(['error' => 'Erreur lors de l\'enregistrement de la commande']);
    $stmt->close();
    $con->close();
    exit();
}

// Récupérer l'ID de la commande
$commande_id = $stmt->insert_id;

// Préparer la requête pour insérer les plats commandés
$stmt_plat = $con->prepare("INSERT INTO commande_plats (commande_id, plat_id, quantity, nom_plat, nom_restaurant) 
                             VALUES (?, ?, ?, ?, ?)");

foreach ($cart as $plat) {
    $plat_id = $plat['plat_id'];
    $quantity = $plat['quantity'];
    $nom_plat = $plat['nom_plat'];
    $nom_restaurant = $plat['nom_restaurant'];
    
    $stmt_plat->bind_param("issss", $commande_id, $plat_id, $quantity, $nom_plat, $nom_restaurant);
    
    if (!$stmt_plat->execute()) {
        echo json_encode(['error' => 'Erreur lors de l\'enregistrement des plats']);
        $stmt_plat->close();
        $con->close();
        exit();
    }
}

// Fermer les requêtes préparées
$stmt->close();
$stmt_plat->close();

// Renvoyer la réponse JSON de succès
echo json_encode(['message' => 'Commande enregistrée', 'commande_id' => $commande_id]);

// Notification
$title = "Nouvelle Commande";
$body = "Une nouvelle commande a été effectuée - ID_commande: {$commande_id}";
$page = "get-commande";

// Essayer d'envoyer la notification, sans affecter la réponse précédente
try {
    sendFCMNotification($con, $title, $body, $page);
} catch (Exception $e) {
    // Log or handle the error without affecting the user response
}

// Fermer la connexion
$con->close();

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
