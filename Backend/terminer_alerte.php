<?php
include"config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$id = $_GET['id'];
$statut = $data['statut'];
$nom_admin = $data['nom_admin'];
$prenom_admin = $data['prenom_admin'];
$numuser_admin = $data['numuser_admin'];
$iduser_admin = $data['iduser_admin'];
$rapport = 'terminé';

$q = mysqli_query($con, "UPDATE `signalisation` SET `statut` = '$statut', `rapport` = '$rapport', `nom_admin` = '$nom_admin', `prenom_admin` = '$prenom_admin', `numuser_admin` = '$numuser_admin', `iduser_admin` = '$iduser_admin' WHERE `id`= '$id' LIMIT 1");
if($q){
    $message['status'] = "Success";
}else{
    http_response_code(422);
    $message['status']= " Error";
}
echo json_encode($message);
echo mysqli_error($con);
