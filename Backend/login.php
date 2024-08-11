<?php
include "config.php";
require 'vendor/autoload.php'; // Charger l'autoloader de Composer

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();
$email = $data['email'];
$password = $data['password'];

// Préparer la requête SQL pour éviter les injections SQL
$stmt = $con->prepare("SELECT * FROM user WHERE email = ? LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();
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
            "exp" => time() + (24 * 60 * 60) // 24 heures
        );
        $accessToken = JWT::encode($accessTokenPayload, 'your_secret_key', 'HS256');

        // Générer un token de rafraîchissement avec une expiration de 30 jours
        $refreshTokenPayload = array(
            "id" => $row->id,
            "email" => $row->email,
            "exp" => time() + (30 * 24 * 60 * 60) // 30 jours
        );
        $refreshToken = JWT::encode($refreshTokenPayload, 'your_secret_key', 'HS256');

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
