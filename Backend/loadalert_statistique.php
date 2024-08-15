<?php
include "config.php";

// Requête SELECT pour récupérer les données de la table signalisation
$sql = "SELECT ville, service FROM signalisation";
$result = mysqli_query($con, $sql);

// Vérifiez si la requête a renvoyé des résultats
if ($result) {
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo json_encode($data); // Encodez les résultats sous forme de JSON
} else {
    // Gestion des erreurs de requête
    echo json_encode(array("error" => mysqli_error($con)));
}

// Fermez la connexion à la base de données
mysqli_close($con);
