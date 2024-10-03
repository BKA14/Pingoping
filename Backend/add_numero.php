<?php
include "config.php";

// Récupérer les données JSON de la requête POST
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Initialiser un tableau pour la réponse JSON
$message = array();

// Fonction pour générer un ID unique
function generateUniqueID($con) {
    $unique = false;
    while (!$unique) {
        $id = uniqid();
        $query = mysqli_query($con, "SELECT * FROM `numero_service` WHERE `id` = '$id'");
        if (mysqli_num_rows($query) == 0) {
            $unique = true;
        }
    }
    return $id;
}


 // Générer un identifiant unique pour le panier (CHAR 32)
 $id = bin2hex(random_bytes(16)); // Génère un identifiant de 32 caractères hexadécimaux

// Extraire les données du commentaire à partir des données JSON
$nom = $data['nom'];
$numero = $data['numero'];
$description = $data['description'];

// Préparer et exécuter la requête SQL pour insérer le commentaire dans la table commentaires
$sql_commentaires = "INSERT INTO numero_service (id, nom_service, description, numero) VALUES (?, ?, ?, ?)";
$stmt_commentaires = mysqli_prepare($con, $sql_commentaires);
mysqli_stmt_bind_param($stmt_commentaires, "ssss", $id, $nom, $description, $numero);
$success_commentaires = mysqli_stmt_execute($stmt_commentaires);


// Vérifier le succès de l'insertion dans les deux tables
if ($success_commentaires) {
    http_response_code(201); // Indiquer que la création a réussi
    $message['status'] = "Success";
    $message['id'] = $id; // Renvoyer l'identifiant généré avec la réponse
} else {
    http_response_code(422); // Indiquer une erreur de traitement
    $message['status'] = "Error";
}

// Retourner la réponse au format JSON
echo json_encode($message);

// Fermer la connexion à la base de données
mysqli_close($con);
