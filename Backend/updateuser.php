<?php
include"config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$nom = $data['nom'];
$prenom = $data['prenom'];
$email = $data['email'];
$grade = $data['grade'];
$password = $data['password'];
$password2 = $data['password2'];
$id = $_GET['id'];
$genre = $data['genre'];
$contact = $data['contact'];


//$q = mysqli_query($con,"UPDATE `entreprise` SET `year`=$year,`entrepriseOne`=$entrepriseOne,`entrepriseTwo`=$entrepriseTwo WHERE `id`=$id");
//$q = mysqli_query($con,"DELETE FROM entreprise WHERE `entreprise`.`id` = $id LIMIT 1");
$q = mysqli_query($con, "UPDATE `user` SET `nom` = '$nom',`prenom` =' $prenom',`email` ='$email', `grade` ='$grade', `password` ='$password', `password2` ='$password2', `genre` ='$genre', `contact` ='$contact' WHERE `id`= '$id' LIMIT 1");
if($q){
    $message['status'] = "Success";
}else{
    http_reponse_code(422);
    $message['status']= " Error";
}
echo json_encode($message);
echo mysqli_error($con);
