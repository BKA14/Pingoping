<?php
include "config.php"; // Connexion à la base de données
require 'vendor/autoload.php'; // Chargement de l'autoloader de Composer pour Twilio

use Twilio\Rest\Client;

// Twilio credentials
$account_sid = 'AC52c282152bdc58e116f14a65101e18a0';
$auth_token = '0cfbe6fe1400998f12e911600be2acc2';
$twilio_phone_number = '+14435438201'; // Remplacez par votre numéro Twilio valide

$client = new Client($account_sid, $auth_token);

// Récupérer les données JSON de la requête
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Récupérer le contact entré par l'utilisateur
$contact =  (isset($data['contact']) ? $data['contact'] : '');

// Vérifier que le contact n'est pas vide
if (empty($contact)) {
    http_response_code(422);
    echo json_encode(["status" => "Error", "message" => "Le contact est requis"]);
    exit;
}

// Vérifier si le contact existe dans la table des utilisateurs
$query = mysqli_query($con, "SELECT * FROM `user` WHERE `contact` = '$contact'");

if (mysqli_num_rows($query) > 0) {
    // Récupérer les informations de l'utilisateur
    $user = mysqli_fetch_assoc($query);
    $user_id = $user['id']; // Supposons que la colonne ID s'appelle 'id'

    // Générer un code de vérification
    $verification_code = rand(100000, 999999);

    // Envoyer le code de vérification via SMS
    try {
        $client->messages->create(
           '+226' . $contact, // Numéro de téléphone de l'utilisateur
            [
                'from' => $twilio_phone_number, // Numéro Twilio
                'body' => "Votre code de vérification pour réinitialiser votre mot de passe est: $verification_code"
            ]
        );

        // Enregistrer le code de vérification et l'ID utilisateur en session pour validation ultérieure
        session_start();
        $_SESSION['verification_code'] = $verification_code;
        $_SESSION['contact_user'] = $contact;
        $_SESSION['user_id'] = $user_id; // Stocker l'ID utilisateur

        http_response_code(200);
        echo json_encode(["status" => "Success", "message" => "Code de vérification envoyé"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "Error", "message" => "Échec de l'envoi du code de vérification: " . $e->getMessage()]);
    }
} else {
    // Si le contact n'existe pas dans la base de données
    http_response_code(200);
    echo json_encode(["status" => "error_contact", "message" => "Contact non trouvé"]);
}
