<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$email = $data['email'];
$password = $data['password'];


$q = mysqli_query($con,"SELECT grade,email FROM user WHERE email = '$email' and password = '$password' LIMIT 1");
//$q = mysqli_query($con, "INSERT INTO 'entreprise' ('year','entrepriseOne','entrepriseTwo') VALUES ('$year','$entrepriseOne','$entrepriseTwo')");
$row = mysqli_num_rows($q);

//$rep= mysqli_fetch_object($q);
$rep = mysqli_fetch_array($q);
    


if($q){
    http_response_code(201);
    $message['status'] = "Success"; 
    if($row >0 && $rep['grade']==='admin' ) {$message='admin';}
    if($row >0 && $rep['grade']==='utilisateur') {$message='utilisateur';}
    if($row >0 && $rep['grade']==='superadmin') {$message='superadmin';}
    if($row <1 ) {$message=0;}
      }
else{
    http_reponse_code(422);
    $message['status']= " Error";
}

echo json_encode($message);
echo mysqli_error($con);

