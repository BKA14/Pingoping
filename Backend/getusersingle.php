<?php
include"config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

$data = array();
$id = $_GET['id'];

//$q = mysqli_query($con," SELECT * FROM 'entreprise' WHERE 'id' =$id LIMIT 1");
//$q = mysqli_query($con, " SELECT * FROM 'entreprise' WHERE 'id'='{$id}'");
//$q = mysqli_query($con, "SELECT `year`, `entrepriseOne`, `entrepriseTwo` FROM `entreprise` WHERE  'id' = $id LIMIT 1");
$q = mysqli_query($con, "SELECT * FROM `user` WHERE `id`='{$id}' LIMIT 1");

while ($row = mysqli_fetch_object($q)){
    $data[]= $row;

}echo json_encode($data);
echo mysqli_error($con);