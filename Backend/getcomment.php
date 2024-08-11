<?php
include "config.php";

// Obtenir les paramètres de pagination et les valider
$page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
$limit = isset($_GET['limit']) ? max(1, min(200, (int)$_GET['limit'])) : 200; // Limitez à 100 pour éviter les abus
$start = ($page - 1) * $limit;

// Vérifiez si l'identifiant de la publication est présent dans les paramètres GET
if (isset($_GET['id'])) {
    $id = mysqli_real_escape_string($con, $_GET['id']); // Échapper l'identifiant pour éviter les injections SQL

    // Requête SELECT pour récupérer tous les commentaires de la publication spécifiée
    $sql = "SELECT * FROM `commentaires` WHERE `pubid` = '$id' ORDER BY `heure` LIMIT $start, $limit";

    $result = mysqli_query($con, $sql);

    if ($result) {
        // Tableau pour stocker les commentaires récupérés
        $comments = array();

        // Parcourez les lignes résultantes de la requête
        while ($row = mysqli_fetch_assoc($result)) {
            // Ajoutez chaque commentaire à la liste des commentaires
            $comments[] = $row;
        }

        // Retournez les commentaires au format JSON
        echo json_encode($comments);
    } else {
        // Erreur lors de l'exécution de la requête SQL
        http_response_code(500); // Code d'erreur interne du serveur
        echo json_encode(array('message' => 'Erreur lors de la récupération des commentaires.'));
    }

    // Fermez le résultat de la requête
    mysqli_free_result($result);
} else {
    // Paramètre manquant dans la requête
    http_response_code(400); // Code d'erreur de demande incorrecte
    echo json_encode(array('message' => 'Identifiant de publication manquant dans la requête.'));
}

// Fermez la connexion à la base de données
mysqli_close($con);
