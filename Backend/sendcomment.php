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
        $query = mysqli_query($con, "SELECT * FROM `commentaires` WHERE `id` = '$id'");
        if (mysqli_num_rows($query) == 0) {
            $unique = true;
        }
    }
    return $id;
}

// Générer un ID unique
$id = generateUniqueID($con);



// Extraire les données du commentaire à partir des données JSON
$pubid = $data['pubid'];
$iduser = $data['iduser'];
$commentaire = $data['commentaire'];
$nom = $data['nom'];
$prenom = $data['prenom'];

// Préparer et exécuter la requête SQL pour insérer le commentaire dans la table commentaires
$sql_commentaires = "INSERT INTO commentaires (id, iduser, pubid, commentaire, nom, prenom) VALUES (?, ?, ?, ?, ?, ?)";
$stmt_commentaires = mysqli_prepare($con, $sql_commentaires);
mysqli_stmt_bind_param($stmt_commentaires, "ssssss", $id, $iduser, $pubid, $commentaire, $nom, $prenom);
$success_commentaires = mysqli_stmt_execute($stmt_commentaires);

// Préparer et exécuter la requête SQL pour insérer le commentaire dans la table commentairesstockage
$sql_commentairesstockage = "INSERT INTO commentairesstockage (id, iduser, pubid, commentaire, nom, prenom) VALUES (?, ?, ?, ?, ?, ?)";
$stmt_commentairesstockage = mysqli_prepare($con, $sql_commentairesstockage);
mysqli_stmt_bind_param($stmt_commentairesstockage, "ssssss", $id, $iduser, $pubid, $commentaire, $nom, $prenom);
$success_commentairesstockage = mysqli_stmt_execute($stmt_commentairesstockage);

// Vérifier le succès de l'insertion dans les deux tables
if ($success_commentaires && $success_commentairesstockage) {
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
