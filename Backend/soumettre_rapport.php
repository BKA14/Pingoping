<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();
$id = $_GET['id'];

// Vérifier et définir une valeur par défaut pour le rapport s'il est null ou vide
$rapport = isset($data['rapport']) && !empty(trim($data['rapport'])) ? $data['rapport'] : 'Terminer';
$statut_rapport = $data['statut_rapport'];

// Préparer la requête SQL
$q = mysqli_query($con, "UPDATE `signalisation` SET `rapport` = '$rapport', `statut_rapport` = '$statut_rapport' WHERE `id`= '$id' LIMIT 1");

// Vérifier le succès de la requête
if ($q) {
    $message['status'] = "Success";
} else {
    http_response_code(422);
    $message['status'] = "Error";
}

// Retourner la réponse au format JSON
echo json_encode($message);
echo mysqli_error($con);

