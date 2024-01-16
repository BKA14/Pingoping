<?php
include"config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$nom = $data['nom'];
$id = $_GET['id'];


//$q = mysqli_query($con,"UPDATE `entreprise` SET `year`=$year,`entrepriseOne`=$entrepriseOne,`entrepriseTwo`=$entrepriseTwo WHERE `id`=$id");
//$q = mysqli_query($con,"DELETE FROM entreprise WHERE `entreprise`.`id` = $id LIMIT 1");
$q = mysqli_query($con, "UPDATE `entreprise` SET `nom_entreprise` =' $nom' WHERE `id`= '$id' LIMIT 1");
if($q){
    $message['status'] = "Success";
}else{
    http_reponse_code(422);
    $message['status']= " Error";
}
echo json_encode($message);
echo mysqli_error($con);
