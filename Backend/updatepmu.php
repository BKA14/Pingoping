<?php
include"config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$commentaire1 = $data['commentaire1'];
$typecourse = $data['typecourse'];
$nbrpartant = $data['nbrpartant'];
$numdujour = $data['numdujour'];
$num2 = $data['num2'];
$commentaire2 = $data['commentaire2'];
$id = $_GET['id'];


//$q = mysqli_query($con,"UPDATE `entreprise` SET `year`=$year,`entrepriseOne`=$entrepriseOne,`entrepriseTwo`=$entrepriseTwo WHERE `id`=$id");
//$q = mysqli_query($con,"DELETE FROM entreprise WHERE `entreprise`.`id` = $id LIMIT 1");
$q = mysqli_query($con, "UPDATE `pmu` SET `commentaire1` =' $commentaire1', `typecourse` =' $typecourse',`nbrpartant` =' $nbrpartant', `numdujour` =' $numdujour', `num2` =' $num2',`commentaire2` =' $commentaire2'");
if($q){
    $message['status'] = "Success";
}else{
    http_reponse_code(422);
    $message['status']= " Error";
}
echo json_encode($message);
echo mysqli_error($con);
