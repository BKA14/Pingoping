<?php
include "config.php";
require 'vendor/autoload.php'; // Charger l'autoloader de Composer

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$refreshToken = $data['refresh_token'];

try {
    // Décoder le token de rafraîchissement
    $decoded = JWT::decode($refreshToken, new Key('your_secret_key', 'HS256'));

    // Vérifiez si l'utilisateur existe dans la base de données
    $userId = $decoded->id;
    $q = mysqli_query($con, "SELECT * FROM user WHERE id = '$userId' LIMIT 1");

    if ($row = mysqli_fetch_object($q)) {
        // Générer un nouveau token d'accès avec une expiration de 24 heures
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
            "exp" => time() + (1 * 60) // 2 minutes
        );
        $accessToken = JWT::encode($accessTokenPayload, 'your_secret_key', 'HS256');

        // Générer un nouveau token de rafraîchissement avec une expiration de 30 jours
        $refreshTokenPayload = array(
            "id" => $row->id,
            "email" => $row->email,
            "exp" => time() + (30 * 24 * 60 * 60) // 30 jours
        );
        $refreshToken = JWT::encode($refreshTokenPayload, 'your_secret_key', 'HS256');

        // Retourner les nouveaux tokens
        echo json_encode(array(
            "access_token" => $accessToken,
            "refresh_token" => $refreshToken,
            "user" => $row
        ));
    } else {
        http_response_code(404);
        echo json_encode(array("status" => "Error", "message" => "Aucun utilisateur trouvé avec cet ID"));
    }
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(array("status" => "Error", "message" => "Token de rafraîchissement invalide", "error" => $e->getMessage()));
}

echo mysqli_error($con);
