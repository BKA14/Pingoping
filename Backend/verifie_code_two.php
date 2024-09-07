<?php
include "config.php";

session_start(); // Démarrer la session

// Récupérer les données JSON de la requête
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Vérifier que le code a été fourni
if (!isset($data['code']) || empty($data['code'])) {
    http_response_code(422);
    echo json_encode(["status" => "Error", "message" => "Le code de vérification est requis"]);
    exit;
}

// Le code de vérification fourni par l'utilisateur
$user_code = $data['code'];

// Vérifier si le code correspond à celui stocké en session
if (isset($_SESSION['verification_code']) && $_SESSION['verification_code'] == $user_code) {
    // Le code est correct, permettre la réinitialisation du mot de passe

    // Vous pouvez ici demander au front-end d'afficher un formulaire pour entrer le nouveau mot de passe
    http_response_code(200);
    echo json_encode(["status" => "Success", "message" => "Code vérifié avec succès"]);
    

} else {
    // Le code est incorrect
    http_response_code(201); // Utiliser un code d'erreur approprié
    echo json_encode(["invalide"]);
}
