<?php
include "config.php";

include 'auth_admin.php'; // Inclure le fichier d'authentification admin

// Appel de la fonction pour vérifier le token et le grade
$userData = verifyAdminToken();

// Récupérer les données de la requête POST
$input = file_get_contents('php://input');
$message = array();

// Vérifier si l'ID est passé en paramètre GET
if(isset($_GET['id'])) {
    $id = $_GET['id'];

    // Préparer et exécuter la requête DELETE
    $sql = "DELETE FROM pub WHERE id = ?";
    $sql_etat = "DELETE FROM etatdelikes WHERE idpub = ?";
    $stmt = mysqli_prepare($con, $sql);
    $stmt_etat = mysqli_prepare($con, $sql_etat);

    mysqli_stmt_bind_param($stmt, "s", $id);
    mysqli_stmt_bind_param($stmt_etat, "s", $id);
    $success = mysqli_stmt_execute($stmt);
    $success_etat = mysqli_stmt_execute($stmt_etat);

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
