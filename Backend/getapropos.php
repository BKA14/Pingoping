<?php
include "config.php";

// Initialiser un tableau pour stocker les données
$data = array();

// Exécuter la requête SQL pour récupérer les données
$sql = "SELECT * FROM `apropos`";
$result = mysqli_query($con, $sql);

// Vérifier si la requête a renvoyé des résultats
if (mysqli_num_rows($result) > 0) {
    // Parcourir les résultats et les ajouter au tableau de données
    while ($row = mysqli_fetch_assoc($result)) {
        // Modifier le chemin de la photo pour inclure le préfixe de l'URL
        $row['logo'] = $url_apropos  . $row['logo'];
        // Ajouter la ligne modifiée au tableau de données
        $data[] = $row;
    }
    // Renvoyer les données au format JSON
    echo json_encode($data);
} else {
    // Aucun résultat trouvé, renvoyer un tableau vide
    echo json_encode(array());
}

// Fermer la connexion à la base de données
mysqli_close($con);

