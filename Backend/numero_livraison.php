<?php
include "config.php";

$data = array();

// Préparer la requête SQL avec pagination
$stmt = $con->prepare("SELECT * FROM `numero_livraison` ");

// Vérifier si la préparation de la requête s'est bien déroulée
if ($stmt) {
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_object()) {
        $data[] = $row;
    }

    // Libérer le résultat
    $stmt->close();
} else {
    // En cas d'erreur de préparation, afficher l'erreur
    echo "Erreur de requête : " . $con->error;
}

// Afficher les données sous format JSON
echo json_encode($data);

// Fermer la connexion à la base de données
$con->close();
