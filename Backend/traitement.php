<?php
include"config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$id = $_GET['id'];
$traitement = $data['traitement'];
$admin_nom = $data['admin_nom'];
$admin_prenom = $data['admin_prenom'];


$q = mysqli_query($con, "UPDATE `signalement` SET `traitement` = '$traitement', `admin_nom` = '$admin_nom', `admin_prenom` = '$admin_prenom' WHERE `id`= '$id' LIMIT 1");
if($q){
    $message['status'] = "Success";
}else{
    http_response_code(422);
    $message['status']= " Error";
    
}
echo json_encode($message);
echo mysqli_error($con);
