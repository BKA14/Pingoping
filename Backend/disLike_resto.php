<?php
include "config.php";

include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

// Récupérer les données JSON depuis la requête POST
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();

// Extraire les données de la requête JSON
//$contactuser =  $data['contactuser'];
$iduser =   $data['iduser'];
$id_resto =  $data['id_resto'];
$etat =  $data['etat'];



// Requête SQL sécurisée avec une requête préparée
$sql = "UPDATE etatdelikes_resto SET etat = ? WHERE id_resto = ? AND iduser = ? LIMIT 1";
$stmt = mysqli_prepare($con, $sql);

// Vérifier si la préparation de la requête a réussi
if ($stmt) {
    // Binder les paramètres à la requête préparée
    mysqli_stmt_bind_param($stmt, "sss", $etat, $id_resto, $iduser);

    // Exécuter la requête préparée
    $success = mysqli_stmt_execute($stmt);

    // Vérifier si la mise à jour a réussi
    if ($success) {
        $message['status'] = "Success";
    } else {
        // Gestion des erreurs lors de l'exécution de la requête
        http_response_code(422);
        $message['status'] = "Error";
        $message['error'] = mysqli_error($con);
    }

    // Fermer la requête préparée
    mysqli_stmt_close($stmt);
} else {
    // Gestion des erreurs lors de la préparation de la requête
    http_response_code(500);
    $message['status'] = "Error";
    $message['error'] = "Erreur lors de la préparation de la requête : " . mysqli_error($con);
}

// Retourner la réponse au format JSON
echo json_encode($message);

// Fermer la connexion à la base de données
mysqli_close($con);
