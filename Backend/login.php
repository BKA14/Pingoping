<?php
include "config.php";
require 'vendor/autoload.php'; // Charger l'autoloader de Composer


use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();
$email = $data['email']; // contient soit le numero ou l'email
$password = $data['password'];

// Préparer la requête SQL pour vérifier à la fois l'email et le contact
$stmt = $con->prepare("SELECT * FROM user WHERE email = ? OR contact = ? LIMIT 1");

// Lier les deux paramètres : une pour l'email et une pour le contact (qui peut aussi être l'email)
$stmt->bind_param("ss", $email, $email);

// Exécuter la requête
$stmt->execute();

// Obtenir le résultat
$result = $stmt->get_result();

if ($row = $result->fetch_object()) {
    // Vérifiez le mot de passe
    if (password_verify($password, $row->password)) {
        // Générer un token d'accès avec une expiration de 24 heures
        $accessTokenPayload = array(
            "id" => $row->id,
            "email" => $row->email,
            "grade" => $row->grade,
            "access_app" => $row->access_app,
            "nom" => $row->nom,
            "prenom" => $row->prenom,
            "genre" => $row->genre,
            "contact" => $row->contact,
            "datefinblocage" => $row->datefinblocage,
            "date_inscription" => $row->date_inscription,
            "exp" => time() + (48 * 60 * 60) // 24 heures
        );
        $accessToken = JWT::encode($accessTokenPayload, 'your_secret_key', 'HS256');

        // Générer un token de rafraîchissement avec une expiration de 30 jours
        $refreshTokenPayload = array(
            "id" => $row->id,
            "email" => $row->email,
            "exp" => time() + (30 * 24 * 60 * 60) // 30 jours
        );
        $refreshToken = JWT::encode($refreshTokenPayload, 'your_secret_key', 'HS256');

        // Insérer une nouvelle session utilisateur dans la table user_sessions
        $userId = $row->id; // Récupérer l'ID de l'utilisateur connecté
        $loginTime = date('Y-m-d H:i:s');
        $sql = "INSERT INTO user_sessions (user_id, login_time, last_activity) VALUES ('$userId', '$loginTime', '$loginTime')";
        mysqli_query($con, $sql);

        // Retourner les tokens
        http_response_code(200);
        echo json_encode(array(
            "access_token" => $accessToken,
            "refresh_token" => $refreshToken,
            "user" => $row
        ));
    } else {
        // Mauvais mot de passe
        http_response_code(200);
        echo json_encode(array("status" => "Error", "message" => "incorrect"));
    }
} else {
    // L'utilisateur n'existe pas
    http_response_code(200);
    echo json_encode(array("status" => "Error", "message" => "inconnu"));
}

// Fermer la déclaration préparée
$stmt->close();
