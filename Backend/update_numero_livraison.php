<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();

if (isset($_GET['id'], $data['nom'], $data['numero'])) {
    $id = mysqli_real_escape_string($con, $_GET['id']);
    $nom = mysqli_real_escape_string($con, $data['nom']);
    $numero = mysqli_real_escape_string($con, $data['numero']);
  

    $q = mysqli_query($con, "UPDATE `numero_livraison` SET `nom_operateur`='$nom', `numero`='$numero' WHERE `id`='$id' LIMIT 1");

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
