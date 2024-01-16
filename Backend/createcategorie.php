<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$nomcategorie = $data['nomcategorie'];


$q = mysqli_query($con,  "INSERT INTO `categorie` (`nom_categorie`) VALUES ('$nomcategorie')");
//$q = mysqli_query($con, "INSERT INTO 'entreprise' ('year','entrepriseOne','entrepriseTwo') VALUES ('$year','$entrepriseOne','$entrepriseTwo')");

if($q){
    http_response_code(201);
    $message['status'] = "Success";
}else{
   
    http_response_code(422);
    $message['status']= " Error";
}
echo json_encode($message);
echo mysqli_error($con);