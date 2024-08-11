<?php
include "config.php";

// Récupérer les données JSON de la requête POST
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Initialiser un tableau pour la réponse JSON
$response = array();

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
$idcommentrepondu = $data['idcommentrepondu'];

// Préparer et exécuter la requête SQL pour insérer le commentaire dans la base de données
$sql = "INSERT INTO commentaires (id, iduser, pubid, commentaire, nom, prenom, idcommentrepondu) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($con, $sql);
mysqli_stmt_bind_param($stmt, "sssssss", $id, $iduser, $pubid, $commentaire, $nom, $prenom, $idcommentrepondu);
$success = mysqli_stmt_execute($stmt);

// Vérifier le succès de l'insertion
if ($success) {
    http_response_code(201); // Indiquer que la création a réussi
    $response['status'] = "Success";
    $response['id'] = $id; // Renvoyer l'identifiant généré avec la réponse
} else {
    http_response_code(422); // Indiquer une erreur de traitement
    $response['status'] = "Error";
}

// Retourner la réponse au format JSON
echo json_encode($response);

// Fermer la connexion à la base de données
mysqli_close($con);
