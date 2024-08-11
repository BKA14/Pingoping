<?php
include"config.php";
$data = array();

$id = $_GET['id'];

//$q = mysqli_query($con, "SELECT * FROM 'entreprise'");
$q = mysqli_query($con, "SELECT nom, prenom, contact, email FROM `user`  WHERE `id`='{$id}' LIMIT 1 ");
//SELECT `id`, `year`, `entrepriseOne`, `entrepriseTwo` FROM `entreprise` WHERE 1

while ($row = mysqli_fetch_object($q)){
    $data[]= $row;

}
echo json_encode($data);
echo mysqli_error($con);

