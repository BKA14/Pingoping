<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();

$titre = $data['titre'];
$commentaire = $data['commentaire'];
$photo = $data['photo'];
$bouton = $data['bouton'];
$rangpub = $data['rangpub'];
$contact = $data['contact'];
$longitude = $data['longitude'];
$latitude = $data['latitude'];


$q = mysqli_query($con,  "INSERT INTO `pub` (`titre`, `commentaire`, `photo`, `rangpub`, `longitude`, `latitude`, `contact`, `bouton`) VALUES ('$titre', '$commentaire', '$photo', '$rangpub', '$longitude', '$latitude', '$contact', '$bouton')");
//$q = mysqli_query($con, "INSERT INTO 'entreprise' ('year','entrepriseOne','entrepriseTwo') VALUES ('$year','$entrepriseOne','$entrepriseTwo')");

if($q){
    http_response_code(201);
    $message['status'] = "Success";
}else{
   
    http_response_code(422);
    $message['status']= "Error";
}
echo json_encode($message);
echo mysqli_error($con);