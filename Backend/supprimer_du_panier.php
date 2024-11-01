<?php
include "config.php";

// Récupérer les données de la requête POST
$input = file_get_contents('php://input');
$message = array();

// Vérifier si l'ID et l'ID utilisateur sont passés en paramètre GET
if (isset($_GET['id']) && isset($_GET['id_user'])) {

    $id = $_GET['id'];
    $id_user = $_GET['id_user'];

   // Validation des paramètres pour vérifier qu'ils ne sont pas vides
   if (empty($id) || empty($id_user)) {
    http_response_code(400);
    $message['status'] = "Bad Request: ID parameters must not be empty";
    echo json_encode($message);
    exit();
}
    // Préparer et exécuter la requête DELETE
    $sql = "DELETE FROM panier WHERE id = ? AND user_id = ?";
    $stmt = mysqli_prepare($con, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "ss", $id, $id_user);
        $success = mysqli_stmt_execute($stmt);

        // Vérifier le succès de la requête DELETE
        if ($success) {
            http_response_code(204); // 204 No Content pour une suppression réussie
        } else {
            http_response_code(422);
            $message['status'] = "Error: Unable to delete the item from the cart";
        }
        mysqli_stmt_close($stmt);
    } else {
        http_response_code(500);
        $message['status'] = "Error: Failed to prepare the SQL statement";
    }
} else {
    http_response_code(400);
    $message['status'] = "Bad Request: ID parameters missing";
}

// Retourner le résultat au format JSON (uniquement si une erreur s'est produite)
if (isset($message['status'])) {
    echo json_encode($message);
}
