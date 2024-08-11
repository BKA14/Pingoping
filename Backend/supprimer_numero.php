<?php
include "config.php";

// Récupérer les données de la requête POST
$input = file_get_contents('php://input');
$message = array();

// Vérifier si l'ID est passé en paramètre GET
if(isset($_GET['id'])) {
    $id = $_GET['id'];

    // Préparer et exécuter la requête DELETE
    $sql = "DELETE FROM numero_service WHERE id = ?";
    $stmt = mysqli_prepare($con, $sql);
    mysqli_stmt_bind_param($stmt, "s", $id);
    $success = mysqli_stmt_execute($stmt);

    // Vérifier le succès de la requête DELETE
    if($success) {
        http_response_code(201);
        $message['status'] = "Success";
    } else {
        http_response_code(422);
        $message['status'] = "Error";
    }
} else {
    http_response_code(400);
    $message['status'] = "Bad Request: ID parameter missing";
}

// Retourner le résultat au format JSON
echo json_encode($message);
