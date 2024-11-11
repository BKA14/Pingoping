<?php
include"config.php";
include 'auth_admin.php'; // Inclure le fichier d'authentification admin

// Appel de la fonction pour vérifier le token et le grade
$userData = verifyAdminToken();

$input = file_get_contents('php://input');
$message = array();

include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

$id = $_GET['id'];
//$q = mysqli_query($con," DELETE FROM 'entreprise' WHERE 'id' ={$id} LIMIT 1");
//$q = mysqli_query($con,"DELETE FROM 'entreprise'  WHERE 'id' ={$id} LIMIT 1");
$q = mysqli_query($con,"DELETE FROM pubvideo WHERE `pubvideo`.`id` = $id LIMIT 1");
if($q){
    http_response_code(201);
    $message['status'] = "Success";
}else{
    http_response_code(422);
    $message['status']= " Error";
}
echo json_encode($message);
echo mysqli_error($con);