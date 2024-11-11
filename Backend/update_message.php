<?php
include "config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

$message = array();

// Validation de l'ID
if (isset($_GET['id']) && !empty($_GET['id'])) {
    $id = $_GET['id'];

    // Utiliser des requêtes préparées pour éviter les injections SQL
    $query = "UPDATE `message_user` SET `lu` = 'oui' WHERE `id` = ? LIMIT 1";
    $stmt = $con->prepare($query);

    if ($stmt) {
        // Lier les paramètres (type "s" pour string car id est un VARCHAR)
        $stmt->bind_param("s", $id);

        // Exécuter la requête
        if ($stmt->execute()) {
            $message['status'] = "Success";
        } else {
            // En cas d'erreur d'exécution de la requête
            http_response_code(422);
            $message['status'] = "Error";
            $message['error'] = $stmt->error;
        }

        // Fermer la requête
        $stmt->close();
    } else {
        // En cas d'erreur de préparation de la requête
        http_response_code(500);
        $message['status'] = "Error";
        $message['error'] = $con->error;
    }
} else {
    // Si l'ID n'est pas fourni ou est vide
    http_response_code(400);
    $message['status'] = "Error";
    $message['error'] = "ID non fourni ou invalide";
}

// Envoyer la réponse au format JSON
echo json_encode($message);

// Fermer la connexion à la base de données
$con->close();
