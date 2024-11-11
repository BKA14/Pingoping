<?php
include "config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

$data = array();
$message = array();

// Requête SQL sécurisée avec une requête préparée
$sql = "SELECT * FROM `etatdelikes` ORDER BY id ASC";
$stmt = mysqli_prepare($con, $sql);

// Vérifier si la préparation de la requête a réussi
if ($stmt) {
    // Exécuter la requête préparée
    mysqli_stmt_execute($stmt);

    // Récupérer le résultat de la requête
    $result = mysqli_stmt_get_result($stmt);

    // Vérifier si des résultats ont été renvoyés
    if ($result) {
        // Parcourir les résultats et les ajouter au tableau $data
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
        // Retourner les données au format JSON
        echo json_encode($data);
    } else {
        // Gestion des erreurs de requête
        http_response_code(500);
        $message['error'] = "Erreur lors de l'exécution de la requête : " . mysqli_error($con);
        echo json_encode($message);
    }

    // Fermer le résultat
    mysqli_stmt_close($stmt);
} else {
    // Gestion des erreurs de préparation de requête
    http_response_code(500);
    $message['error'] = "Erreur lors de la préparation de la requête : " . mysqli_error($con);
    echo json_encode($message);
}

// Fermer la connexion à la base de données
mysqli_close($con);
