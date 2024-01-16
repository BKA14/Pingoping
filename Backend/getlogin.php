<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$email = $data['email'];
$password = $data['password'];


//$q = mysqli_query($con,"SELECT prenom FROM user WHERE email = '$email' and password = '$password' LIMIT 1");

$q = mysqli_query($con,"SELECT * FROM user WHERE email = '$email' and password = '$password' LIMIT 1");
//$q = mysqli_query($con, "INSERT INTO 'entreprise' ('year','entrepriseOne','entrepriseTwo') VALUES ('$year','$entrepriseOne','$entrepriseTwo')");


while ($row = mysqli_fetch_object($q)){
    $data[]= $row;

}echo json_encode($data);
echo mysqli_error($con);
