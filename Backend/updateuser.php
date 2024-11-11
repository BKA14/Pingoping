<?php
include "config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

header('Content-Type: application/json');

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();

if (!$data || !isset($data['nom'], $data['prenom'], $data['email'], $data['grade'], $data['password'], $data['genre'], $data['contact'], $data['access_app']))   {
    http_response_code(400);
    $message['status'] = "Error";
    $message['message'] = "Invalid input data";
    echo json_encode($message);
    exit;
}

$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400);
    $message['status'] = "Error";
    $message['message'] = "Missing user ID";
    echo json_encode($message);
    exit;
}

$nom = $data['nom'];
$prenom = $data['prenom'];
$email = $data['email'];
$grade = $data['grade'];
$password = password_hash($data['password'], PASSWORD_BCRYPT); // Hashing the password
$genre = $data['genre'];
$access_app = $data['access_app'];
$contact = $data['contact'];


// Prepare and bind
$stmt = $con->prepare("UPDATE `user` SET `nom` = ?, `prenom` = ?, `email` = ?, `grade` = ?, `password` = ?, `genre` = ?, , `access_app` = ?, `contact` = ? WHERE `id`= ? LIMIT 1");

if ($stmt) {
    $stmt->bind_param("ssssssssi", $nom, $prenom, $email, $grade, $password, $genre, $contact, $access_app, $id);

    if ($stmt->execute()) {
        $message['status'] = "Success";
    } else {
        http_response_code(422);
        $message['status'] = "Error";
        $message['message'] = "Failed to update user.";
    }

    $stmt->close();
} else {
    http_response_code(500);
    $message['status'] = "Error";
    $message['message'] = "Failed to prepare statement.";
}

echo json_encode($message);
$con->close();
