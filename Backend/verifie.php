<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$iduser = $data['iduser'];
$idcomsignaler = $data['idcomsignaler'];
$pubidcommentaire = $data['pubidcommentaire'];


$q = mysqli_query($con,"SELECT * FROM signalement WHERE iduserdusignaleur = '$iduser' and idcomsignaler = '$idcomsignaler' and pubidcomsignaler = '$pubidcommentaire'");
//$q = mysqli_query($con, "INSERT INTO 'entreprise' ('year','entrepriseOne','entrepriseTwo') VALUES ('$year','$entrepriseOne','$entrepriseTwo')");
$row = mysqli_num_rows($q);

//$rep= mysqli_fetch_object($q);
$rep = mysqli_fetch_array($q);
    

if($q){
    http_response_code(201);
    $message['status'] = "Success"; 
    if($row >0) {$message=true;}
    if($row <1 ) {$message=false;}
      }
else{
    http_response_code(422);
    $message['status']= " Error";
}

echo json_encode($message);
echo mysqli_error($con);

