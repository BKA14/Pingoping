<?php
include "config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

// Récupérer les données de la requête POST
$input = file_get_contents('php://input');
$message = array();

// Vérifier si l'ID est passé en paramètre GET
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Préparer et exécuter la requête DELETE
    $sql = "DELETE FROM panier WHERE user_id = ?";
    $stmt = mysqli_prepare($con, $sql);
    
    // Vérifier si la préparation de la requête a réussi
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "s", $id); 
        $success = mysqli_stmt_execute($stmt);

        // Vérifier le succès de la requête DELETE
        if ($success) {
            http_response_code(200); // Code 200 pour succès
            $message['status'] = "Success";
        } else {
            http_response_code(422); // Code 422 pour une erreur d'entité
            $message['status'] = "Error: Could not execute delete.";
        }
    } else {
        http_response_code(500); // Code 500 pour erreur interne
        $message['status'] = "Error: Could not prepare statement.";
    }
} else {
    http_response_code(400); // Code 400 pour mauvaise requête
    $message['status'] = "Bad Request: ID parameter missing";
}

// Retourner le résultat au format JSON
echo json_encode($message);
