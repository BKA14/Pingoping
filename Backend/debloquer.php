<?php
include "config.php";

header('Content-Type: application/json'); // Indique que la réponse est en JSON

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$message = array();
$id = isset($_GET['id']) ? $_GET['id'] : null; // Vérifiez si l'ID est présent dans la requête
$datefin = isset($data['datefinblocage']) ? $data['datefinblocage'] : null; // Vérifiez si datefinblocage est présent

// Validation des données d'entrée
if (is_null($id) || is_null($datefin)) {
    http_response_code(400); // Mauvaise requête
    $message['status'] = "Error";
    $message['message'] = "ID et datefinblocage sont requis.";
    echo json_encode($message);
    exit();
}

// Préparation de la requête
$stmt = $con->prepare("UPDATE `user` SET `datefinblocage` = ? WHERE `id` = ? LIMIT 1");
$stmt->bind_param("ss", $datefin, $id); // 's' pour string, 'i' pour integer

// Exécution de la requête
if ($stmt->execute()) {
    $message['status'] = "Success";
} else {
    http_response_code(500); // Erreur interne du serveur
    $message['status'] = "Error";
    $message['message'] = "Erreur lors de la mise à jour des données."; // Message d'erreur générique
}

// Fermez la déclaration et la connexion
$stmt->close();
$con->close();

// Renvoyez la réponse
echo json_encode($message);
