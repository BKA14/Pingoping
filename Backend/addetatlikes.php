<?php
include "config.php";

// Récupérer les données JSON depuis la requête POST
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();


// Extraire les données de la requête JSON
$contactuser = mysqli_real_escape_string($con, $data['contactuser']);
$iduser =  mysqli_real_escape_string($con, $data['iduser']);
$idpub = mysqli_real_escape_string($con, $data['pubid']);
$etat = mysqli_real_escape_string($con, $data['etat']);

// Requête SQL sécurisée avec une requête préparée
$sql = "INSERT INTO etatdelikes (idpub, iduser, contactuser, etat) VALUES (?, ?, ?, ?)";
$stmt = mysqli_prepare($con, $sql);

// Vérifier si la préparation de la requête a réussi
if ($stmt) {
    // Binder les paramètres à la requête préparée
    mysqli_stmt_bind_param($stmt, "ssss", $idpub, $iduser, $contactuser, $etat);

    // Exécuter la requête préparée
    $success = mysqli_stmt_execute($stmt);

    // Vérifier si l'insertion a réussi
    if ($success) {
        http_response_code(201); // Created
        $message['status'] = "Success";
    } else {
        // Gestion des erreurs lors de l'exécution de la requête
        http_response_code(422); // Unprocessable Entity
        $message['status'] = "Error";
        $message['error'] = mysqli_error($con);
    }

    // Fermer la requête préparée
    mysqli_stmt_close($stmt);
} else {
    // Gestion des erreurs lors de la préparation de la requête
    http_response_code(500); // Internal Server Error
    $message['status'] = "Error";
    $message['error'] = "Erreur lors de la préparation de la requête : " . mysqli_error($con);
}

// Retourner la réponse au format JSON
echo json_encode($message);

// Fermer la connexion à la base de données
mysqli_close($con);
