<?php
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = 'your_secret_key';

// Fonction pour vérifier le token et le grade de l'utilisateur
function verifyAdminToken() {
    global $secret_key;

    // Vérifiez si le token est présent dans l’en-tête de la requête
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(array("message" => "Accès refusé : Aucun token fourni."));
        exit;
    }

    // Extraire le token de l’en-tête
    $token = str_replace('Bearer ', '', $headers['Authorization']);

    try {
        // Décoder le token
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));

        // Vérifier la date d'expiration
        if ($decoded->exp < time()) {
            http_response_code(401);
            echo json_encode(array("message" => "Token expiré."));
            exit;
        }

        // Vérifier si l'utilisateur est un admin ou superadmin
        if ($decoded->grade !== 'admin' && $decoded->grade !== 'superadmin') {
            http_response_code(403); // Forbidden
            echo json_encode(array("message" => "Accès refusé : Vous n'avez pas les droits nécessaires."));
            exit;
        }

        // Retourner les données utilisateur décodées si le token est valide et que l'utilisateur est admin ou superadmin
        return (array) $decoded;

    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(array("message" => "Token invalide.", "error" => $e->getMessage()));
        exit;
    }
}
