<?php
include"config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$commentaire1 = $data['commentaire1'];
$commentaire2 = $data['commentaire2'];
$commentaire3 = $data['commentaire3'];
$id = $_GET['id'];


//$q = mysqli_query($con,"UPDATE `entreprise` SET `year`=$year,`entrepriseOne`=$entrepriseOne,`entrepriseTwo`=$entrepriseTwo WHERE `id`=$id");
//$q = mysqli_query($con,"DELETE FROM entreprise WHERE `entreprise`.`id` = $id LIMIT 1");
$q = mysqli_query($con, "UPDATE `achatalimentation` SET `commentaire1` =' $commentaire1', `commentaire2` =' $commentaire2', `commentaire3` =' $commentaire3'");
if($q){
    $message['status'] = "Success";
}else{
    http_response_code(422);
    $message['status'] = "Invalid Input";
}
echo json_encode($message);
echo mysqli_error($con);
