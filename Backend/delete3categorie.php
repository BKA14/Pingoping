<?php
include"config.php";
include 'auth_admin.php'; // Inclure le fichier d'authentification admin

// Appel de la fonction pour vérifier le token et le grade
$userData = verifyAdminToken();

$input = file_get_contents('php://input');
$message = array();


$id = $_GET['id'];
//$q = mysqli_query($con," DELETE FROM 'entreprise' WHERE 'id' ={$id} LIMIT 1");
//$q = mysqli_query($con,"DELETE FROM 'entreprise'  WHERE 'id' ={$id} LIMIT 1");
$q = mysqli_query($con,"DELETE FROM categorie WHERE `categorie`.`id` = $id LIMIT 1");
if($q){
    http_response_code(201);
    $message['status'] = "Success";
}else{
    http_response_code(422);
    $message['status']= " Error";
}
echo json_encode($message);
echo mysqli_error($con);