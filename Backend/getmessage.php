<?php
include "config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide


// Initialiser un tableau pour stocker les données
$data = array();

// Obtenir les paramètres de pagination avec validation
$page = isset($_GET['page']) && is_numeric($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) && is_numeric($_GET['limit']) ? (int)$_GET['limit'] : 30;
$start = ($page - 1) * $limit;

// Utiliser des requêtes préparées pour éviter les injections SQL
$query = "SELECT * FROM `message_user` ORDER BY heure_message DESC LIMIT ?, ?";
$stmt = $con->prepare($query);

if ($stmt) {
    // Lier les paramètres pour la requête préparée
    $stmt->bind_param("ii", $start, $limit);
    
    // Exécuter la requête
    if ($stmt->execute()) {
        // Récupérer les résultats
        $result = $stmt->get_result();

        // Parcourir les résultats et les ajouter au tableau $data
        while ($row = $result->fetch_object()) {
            $data[] = $row;
        }

        // Envoyer les données au format JSON
        echo json_encode($data);
    } else {
        // En cas d'erreur lors de l'exécution de la requête
        echo json_encode(array(
            "status" => "Error",
            "message" => "Erreur lors de l'exécution de la requête.",
            "error" => $stmt->error
        ));
    }

    // Fermer le statement
    $stmt->close();
} else {
    // En cas d'erreur lors de la préparation de la requête
    echo json_encode(array(
        "status" => "Error",
        "message" => "Erreur lors de la préparation de la requête.",
        "error" => $con->error
    ));
}

// Fermer la connexion à la base de données
$con->close();
