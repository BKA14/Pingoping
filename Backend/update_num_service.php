<?php
include "config.php";
include 'auth_admin.php'; // Inclure le fichier d'authentification admin

// Appel de la fonction pour vérifier le token et le grade
$userData = verifyAdminToken();

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();

if (isset($_GET['id'], $data['nom'], $data['numero'], $data['description'])) {
    $id = mysqli_real_escape_string($con, $_GET['id']);
    $nom = mysqli_real_escape_string($con, $data['nom']);
    $numero = mysqli_real_escape_string($con, $data['numero']);
    $description = mysqli_real_escape_string($con, $data['description']);
    $rang = mysqli_real_escape_string($con, $data['rang']);
    $vip = mysqli_real_escape_string($con, $data['vip']);

    $q = mysqli_query($con, "UPDATE `numero_service` SET `nom_service`='$nom', `numero`='$numero', `description`='$description', `rang`='$rang', `vip`='$vip' WHERE `id`='$id' LIMIT 1");

    if ($q) {
        $message['status'] = "Success";
    } else {
        http_response_code(422);
        $message['status'] = "Error";
    }
} else {
    http_response_code(400);
    $message['status'] = "Invalid Input";
}

echo json_encode($message);
echo mysqli_error($con);
