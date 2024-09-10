<?php
session_start(); // Démarrer la session en haut du fichier

include "config.php";
require 'vendor/autoload.php';

use Twilio\Rest\Client;

// Twilio credentials
$account_sid = 'AC52c282152bdc58e116f14a65101e18a0';  // Remplacez avec votre Account SID Twilio
$auth_token = '0cfbe6fe1400998f12e911600be2acc2';  // Remplacez avec votre Auth Token Twilio
$twilio_phone_number = '+14435438201'; // Numéro Twilio à partir duquel vous envoyez les SMS

$client = new Client($account_sid, $auth_token);
$message = array();

if (isset($_SESSION['contact_user'])) {
    $contact = '+226' .$_SESSION['contact_user'];
} else {
    // Gérer le cas où le contact n'est pas défini
    echo 'pas de contact';
    exit;
}

// Définir les délais entre les tentatives de renvoi de code
$short_waiting_time = 30; // 30 secondes pour les 4 premières tentatives
$long_waiting_time = 300; // 5 minutes (300 secondes) après la 4e tentative
$max_attempts = 5; // Nombre maximum de tentatives avec un délai de 30 secondes

// Initialiser ou récupérer les données de session
if (!isset($_SESSION['otp_attempts'])) {
    $_SESSION['otp_attempts'] = 0;
}
if (!isset($_SESSION['last_otp_request_time'])) {
    $_SESSION['last_otp_request_time'] = 0;
}

// Calculer le temps d'attente basé sur le nombre de tentatives
$waiting_time = ($_SESSION['otp_attempts'] < $max_attempts) ? $short_waiting_time : $long_waiting_time;

// Vérifier si un code a été envoyé récemment
$last_request_time = $_SESSION['last_otp_request_time'];
$current_time = time();
$time_diff = $current_time - $last_request_time;

$remaining_time = $waiting_time - $time_diff;

if ($time_diff < $waiting_time) {
    $remaining_time = $waiting_time - $time_diff;
    http_response_code(200); // Code 429 normalement, mais je le met pour afficher le temps attente
    $message['status'] = "attendre";
    $message['message'] = "Veuillez attendre " . ceil($remaining_time) . " secondes avant de renvoyer le code.";
    $message['remaining_time'] = $remaining_time;
    echo json_encode($message);
    exit;
}

// Générer un nouveau code de vérification
$verification_code = rand(100000, 999999);

// Envoyer le code de vérification via SMS
try {
    $client->messages->create(
        $contact, // Numéro de téléphone de l'utilisateur
        [
            'from' => $twilio_phone_number,
            'body' => "Votre code de vérification est: $verification_code"
        ]
    );

    // Stocker le code de vérification et les informations sur les tentatives
    $_SESSION['verification_code'] = $verification_code;
    $_SESSION['last_otp_request_time'] = time(); // Stocker le moment où le code a été envoyé

    // Incrémenter le nombre de tentatives
    $_SESSION['otp_attempts']++;

    http_response_code(200);
    $message['status'] = "Success";
    $message['remaining_time'] = 'non';
    echo json_encode($message);
    mysqli_close($con);

} catch (Exception $e) {
    http_response_code(500);
    $message['status'] = "Error";
    $message['message'] = "Failed to send verification code: " . $e->getMessage();
    echo json_encode($message);
    exit;
}
