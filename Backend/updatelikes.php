<?php
include "config.php";

// Récupérer les données JSON de la requête
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Initialiser un tableau pour le message de retour
$message = array();

// Vérifier si les données requises sont présentes
if (isset($data['id']) && isset($data['likes'])) {
    // Échapper les données pour éviter les injections SQL (utilisez mysqli_real_escape_string ou des requêtes préparées)
    $id = mysqli_real_escape_string($con, $data['id']);
    $likes = mysqli_real_escape_string($con, $data['likes']);

    // Requête SQL pour mettre à jour le nombre de likes
    $sql = "UPDATE `pub` SET `likes` = '$likes' WHERE `id` = '$id' LIMIT 1";

    // Exécuter la requête SQL
    $q = mysqli_query($con, $sql);

    // Vérifier si la requête s'est exécutée avec succès
    if ($q) {
        $message['status'] = "Le nombre de likes pour la publication ID $id a été mis à jour avec succès.";
    } else {
        http_response_code(422);
        $message['status'] = "Erreur lors de la mise à jour du nombre de likes : " . mysqli_error($con);
    }
} else {
    http_response_code(400);
    $message['status'] = "Paramètres manquants : id et likes sont requis.";
}

// Retourner le message au format JSON
echo json_encode($message);
