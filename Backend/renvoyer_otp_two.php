<?php
session_start(); // Démarrer la session en haut du fichier

include "config.php";
require 'vendor/autoload.php';

use Twilio\Rest\Client;

// Twilio credentials
$account_sid = 'AC52c282152bdc58e116f14a65101e18a0';
$auth_token = '0cfbe6fe1400998f12e911600be2acc2';
$twilio_phone_number = '+14435438201';

$client = new Client($account_sid, $auth_token);
$message = array();

if (isset($_SESSION['contact_user'])) {
    $contact = '+226' .$_SESSION['contact_user'];

} else {
    // Gérer le cas où le contact n'est pas défini
echo 'pas de contact';
}
// Générer un code de vérification
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

    // Stocker le code de vérification en session
    $_SESSION['verification_code'] = $verification_code;

    http_response_code(200);
    $message['status'] = "renvoyer";
    echo json_encode($message);
    mysqli_close($con);

} catch (Exception $e) {
    http_response_code(500);
    $message['status'] = "Error";
    $message['message'] = "Failed to send verification code: " . $e->getMessage();
    echo json_encode($message);
    exit;
}

