<?php
include "config.php";

// Récupérer les données JSON de la requête POST
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Initialiser un tableau pour la réponse JSON
$message = array();



// Extraire les données du commentaire à partir des données JSON
$nom_operateur = $data['nom'];
$numero = $data['numero'];

// Préparer et exécuter la requête SQL pour insérer le commentaire dans la table commentaires
$sql_commentaires = "INSERT INTO numero_livraison (nom_operateur, numero) VALUES (?, ?)";
$stmt_commentaires = mysqli_prepare($con, $sql_commentaires);
mysqli_stmt_bind_param($stmt_commentaires, "si",$nom_operateur, $numero);
$success_commentaires = mysqli_stmt_execute($stmt_commentaires);


// Vérifier le succès de l'insertion dans les deux tables
if ($success_commentaires) {
    http_response_code(201); 
    $message['status'] = "Success";
} else {
    http_response_code(422); // Indiquer une erreur de traitement
    $message['status'] = "Error";
}

// Retourner la réponse au format JSON
echo json_encode($message);

// Fermer la connexion à la base de données
mysqli_close($con);
