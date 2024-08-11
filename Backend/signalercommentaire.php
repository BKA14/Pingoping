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
        $query = mysqli_query($con, "SELECT * FROM `signalement` WHERE `id` = '$id'");
        if (mysqli_num_rows($query) == 0) {
            $unique = true;
        }
    }
    return $id;
}

// Générer un ID unique
$id = generateUniqueID($con);



// Extraire les données du commentaire à partir des données JSON
// donnee du signaleur
$nomsignaleur = $data['nomsignaleur'];
$prenomdusignaleur = $data['prenomdusignaleur'];
$iduserdusignaleur = $data['iduserdusignaleur'];


//id commentaire 
$idcomsignaler = $data['idcomsignaler'];

//bouton traitement 
$traitement = 'non';

// donnee du signalé
$nomestsignaler = $data['nomestsignaler'];
$prenomestsignaler = $data['prenomestsignaler'];
$heurecomdusignaler = $data['heurecomdusignaler'];
$commentairesignaler = $data['commentairesignaler'];
$pubidcomsignaler = $data['pubidcomsignaler'];
$idusersignaler = $data['idusersignaler'];

// Préparer et exécuter la requête SQL pour insérer le commentaire dans la base de données
$sql = "INSERT INTO signalement (id, nomsignaleur, prenomdusignaleur, iduserdusignaleur, nomestsignaler, prenomestsignaler, heurecomdusignaler, commentairesignaler, pubidcomsignaler, idcomsignaler, idusersignaler, traitement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($con, $sql);
mysqli_stmt_bind_param($stmt, "ssssssssssss", $id, $nomsignaleur, $prenomdusignaleur, $iduserdusignaleur, $nomestsignaler, $prenomestsignaler, $heurecomdusignaler, $commentairesignaler, $pubidcomsignaler, $idcomsignaler, $idusersignaler, $traitement);
$success = mysqli_stmt_execute($stmt);

// Préparer et exécuter la requête SQL pour insérer le commentaire dans la base de données
$sqll = "INSERT INTO signalement_stockage (id, nomsignaleur, prenomdusignaleur, iduserdusignaleur, nomestsignaler, prenomestsignaler, heurecomdusignaler, commentairesignaler, pubidcomsignaler, idcomsignaler, idusersignaler, traitement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($con, $sqll);
mysqli_stmt_bind_param($stmt, "ssssssssssss", $id, $nomsignaleur, $prenomdusignaleur, $iduserdusignaleur, $nomestsignaler, $prenomestsignaler, $heurecomdusignaler, $commentairesignaler, $pubidcomsignaler, $idcomsignaler, $idusersignaler, $traitement);
$success = mysqli_stmt_execute($stmt);

// Vérifier le succès de l'insertion

if ($success) {
    http_response_code(201); // Indiquer que la création a réussi
    $message['status'] = "Success";
} else {
    http_response_code(422); // Indiquer une erreur de traitement
    $message['status'] = "Error";
}

// Retourner la réponse au format JSON
echo json_encode($message);

// Fermer la connexion à la base de données
mysqli_close($con);
