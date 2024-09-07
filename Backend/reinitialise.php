<?php
// Obtenez l'ID utilisateur à partir de la session ou d'une autre méthode sécurisée
session_start();
require 'vendor/autoload.php';
include "config.php";

// Récupérer les données JSON de la requête
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Vérifier que les champs requis sont présents
if (!isset($data['password']) || !isset($data['password2'])) {
    http_response_code(422);
    echo json_encode(["status" => "Error", "message" => "Les deux mots de passe sont requis"]);
    exit;
}

// Vérifier que les mots de passe correspondent
if ($data['password'] !== $data['password2']) {
    http_response_code(400);
    echo json_encode(["status" => "Error", "message" => "Les mots de passe ne correspondent pas"]);
    exit;
}

// Hacher le mot de passe
$hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);


if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    echo json_encode(["status" => "Error", "message" => "Utilisateur non authentifié"]);
    exit;
}

$user_id = $_SESSION['user_id'];

// Mettre à jour le mot de passe dans la base de données
$query = "UPDATE user SET password = ? WHERE id = ?";
$stmt = $con->prepare($query);
$stmt->bind_param('ss', $hashed_password, $user_id);

if ($stmt->execute()) {
    echo json_encode(["status" => "Success", "message" => "Mot de passe réinitialisé avec succès"]);
     
    session_unset(); // Effacer les données de la session
    session_destroy(); // Détruire la session
    mysqli_close($con);
} else {
    http_response_code(500);
    echo json_encode(["status" => "Error", "message" => "Erreur lors de la réinitialisation du mot de passe"]);
}

