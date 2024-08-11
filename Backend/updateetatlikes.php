<?php
include"config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$contactuser = $data['contactuser'];
$iduser = $data['iduser'];
$idpub = $data['pubid'];
$etat = $data['etat'];
$id = $_GET['id'];


//$q = mysqli_query($con,"UPDATE `entreprise` SET `year`=$year,`entrepriseOne`=$entrepriseOne,`entrepriseTwo`=$entrepriseTwo WHERE `id`=$id");
//$q = mysqli_query($con,"DELETE FROM entreprise WHERE `entreprise`.`id` = $id LIMIT 1");
$q = mysqli_query($con, "UPDATE `etatdelikes` SET `contactuser` =' $contactuser', `idpub` =' $idpub',`etat` =' $etat', `iduser` =' $iduser' WHERE `id`= '$id' LIMIT 1");
if($q){
    $message['status'] = "Success";
}else{
    http_response_code(422);
    $message['status']= " Error";
}
echo json_encode($message);
echo mysqli_error($con);
