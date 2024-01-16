<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$nom = $data['nom'];
$prenom = $data['prenom'];
$email = $data['email'];
$password = $data['password'];
$password2 = $data['password2'];
$grade = $data['grade'];
$genre = $data['genre'];
$contact = $data['contact'];

$q = mysqli_query($con,  "INSERT INTO `user` (`nom`, `prenom`, `email`, `password`, `password2`, `grade`, `genre`, `contact`) VALUES ('$nom', '$prenom', '$email', '$password', '$password2', '$grade', '$genre', '$contact')");
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