<?php
include"config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$id = $_GET['id'];
$likes = $data['likes'];


//$q = mysqli_query($con,"UPDATE `entreprise` SET `year`=$year,`entrepriseOne`=$entrepriseOne,`entrepriseTwo`=$entrepriseTwo WHERE `id`=$id");
//$q = mysqli_query($con,"DELETE FROM entreprise WHERE `entreprise`.`id` = $id LIMIT 1");
$q = mysqli_query($con, "UPDATE `pub` SET `likes` =' $likes' WHERE `id`= '$id' LIMIT 1 ");
if($q){
    $message['status'] = "Le nombre de likes pour la publication ID $pub_id a été mis à jour avec succès.";
}else{
    http_reponse_code(422);
    $message['status']= " Error";
     echo "Erreur lors de la mise à jour du nombre de likes : " . mysqli_error($con);
}
echo json_encode($message);
echo mysqli_error($con);
