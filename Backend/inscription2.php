<?php
include "config.php";
require 'vendor/autoload.php';

use Twilio\Rest\Client;

// Twilio credentials
$account_sid = 'AC52c282152bdc58e116f14a65101e18a0';
$auth_token = '0cfbe6fe1400998f12e911600be2acc2';
$twilio_phone_number = '+14435438201';

$client = new Client($account_sid, $auth_token);

// Récupérer les données JSON de la requête
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$message = array();

// Fonction pour générer un ID unique
function generateUniqueID($con) {
    do {
        $id = uniqid();
        $query = mysqli_query($con, "SELECT * FROM `user` WHERE `id` = '$id'");
    } while (mysqli_num_rows($query) > 0);
    return $id;
}

// Générer un ID unique
$id = generateUniqueID($con);

// Récupérer les données de l'utilisateur à partir des données JSON
$nom = isset($data['nom']) ? $data['nom'] : null;
$prenom = isset($data['prenom']) ? $data['prenom'] : null;
$email = isset($data['email']) ? $data['email'] : null;
$password = isset($data['password']) ? $data['password'] : null;
$password2 = isset($data['password2']) ? $data['password2'] : null;
$grade = isset($data['grade']) ? $data['grade'] : 'utilisateur';
$genre = isset($data['genre']) ? $data['genre'] : null;
$contact = (isset($data['contact']) ? $data['contact'] : '');
$date_inscription = isset($data['date_inscription']) ? $data['date_inscription'] : null;
$datefinblocage = 'non';

// Vérifier que toutes les données nécessaires sont présentes et non vides
if (empty($nom) || empty($prenom) || empty($email) || empty($password) || empty($password2) || empty($genre) || empty($contact)) {
    http_response_code(422);
    $message['status'] = "Error";
    $message['message'] = "All fields are required";
    echo json_encode($message);
    exit;
}

// Vérifier si l'email ou le contact existe déjà
$emailCheck = mysqli_query($con, "SELECT * FROM `user` WHERE `email` = '$email'");
$contactCheck = mysqli_query($con, "SELECT * FROM `user` WHERE `contact` = '$contact'");

if (mysqli_num_rows($emailCheck) > 0) {
    http_response_code(201);
    $message = "email_exist";
    echo json_encode($message);
    exit;
}

if (mysqli_num_rows($contactCheck) > 0) {
    http_response_code(201);
    $message = "contact_exist";
    echo json_encode($message);
    exit;
}

// Générer un code de vérification
$verification_code = rand(100000, 999999);

// Envoyer le code de vérification via SMS
try {
    $client->messages->create(
       '+226' .  $contact, // Numéro de téléphone de l'utilisateur
        [
            'from' => $twilio_phone_number,
            'body' => "Votre code de vérification est: $verification_code"
        ]
    );
} catch (Exception $e) {
    http_response_code(500);
    $message['status'] = "Error";
    $message['message'] = "Failed to send verification code: " . $e->getMessage();
    echo json_encode($message);
    exit;
}


// Stocker le code de vérification et les informations utilisateur en session
session_start();

$_SESSION['verification_code'] = $verification_code;

$_SESSION['user_data'] = $data;


http_response_code(200);
$message['status'] = "Verification Sent";
echo json_encode($message);

mysqli_close($con);
