<?php
include"config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$id = $_GET['id'];
$titre = $data['titre'];
$commentaire = $data['commentaire'];
$photo = $data['photo'];
$bouton = $data['bouton'];
$rangpub = $data['rangpub'];
$contact = $data['contact'];
$longitude = $data['longitude'];
$latitude = $data['latitude'];

//$q = mysqli_query($con,"UPDATE `entreprise` SET `year`=$year,`entrepriseOne`=$entrepriseOne,`entrepriseTwo`=$entrepriseTwo WHERE `id`=$id");
//$q = mysqli_query($con,"DELETE FROM entreprise WHERE `entreprise`.`id` = $id LIMIT 1");
$q = mysqli_query($con, "UPDATE `pub` SET  `titre` = '$titre',`commentaire` =' $commentaire',`photo` ='$photo', `longitude` ='$longitude', `bouton` ='$bouton', `contact` ='$contact', `latitude` ='$latitude', `rangpub` ='$rangpub' WHERE `id`= '$id' LIMIT 1");
if($q){
    $message['status'] = "Success";
}else{
    http_reponse_code(422);
    $message['status']= " Error";
}
echo json_encode($message);
echo mysqli_error($con);
