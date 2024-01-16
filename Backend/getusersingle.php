<?php
include"config.php";
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