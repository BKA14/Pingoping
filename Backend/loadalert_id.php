<?php
include "config.php";

$id = $_GET['id'];
// Obtenir les paramètres de pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$start = ($page - 1) * $limit;


// Requête SELECT pour récupérer toutes les données de la table pub
$sql = "SELECT * FROM `signalisation` WHERE `iduser`='{$id}'  ORDER BY heure_signalisation DESC LIMIT $start, $limit";
$result = mysqli_query($con, $sql);

// Vérifiez si la requête a renvoyé des résultats
if ($result) {
    // Initialisez un tableau pour stocker les résultats modifiés
    $modified_rows = array();

    // Parcourez les résultats
    while ($row = mysqli_fetch_assoc($result)) {
        // Ajoutez le lien au chemin de l'image pour chaque ligne de résultat
        $row['image'] = "http://$baseUrl/alert/" . $row['image'];
        // Ajoutez la ligne modifiée au tableau de résultats
        $modified_rows[] = $row;
    }
    // Renvoie le tableau de résultats modifiés au format JSON
    echo json_encode($modified_rows);
} else {
    // Gestion des erreurs de requête
    echo json_encode(array("error" => mysqli_error($con)));
}

// Fermez la connexion à la base de données
mysqli_close($con);

