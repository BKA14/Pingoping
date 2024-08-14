<?php
include "config.php";

// Initialiser un tableau pour stocker les données
$data = array();

// Obtenir les paramètres de pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 9;
$start = ($page - 1) * $limit;

// Exécuter la requête SQL pour récupérer les messages, triés par heure d'envoi
$query = "SELECT * FROM `message_user` ORDER BY heure_message DESC LIMIT $start, $limit";
$result = mysqli_query($con, $query);

// Vérifier si la requête a réussi
if ($result) {
    // Parcourir les résultats et les ajouter au tableau $data
    while ($row = mysqli_fetch_object($result)) {
        $data[] = $row;
    }

    // Envoyer les données au format JSON
    echo json_encode($data);
} else {
    // En cas d'erreur, envoyer un message d'erreur JSON
    echo json_encode(array(
        "status" => "Error",
        "message" => "Erreur lors de l'exécution de la requête.",
        "error" => mysqli_error($con)
    ));
}

// Fermer la connexion à la base de données
mysqli_close($con);
