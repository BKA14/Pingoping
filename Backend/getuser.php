<?php
include"config.php";
$data = array();
//$q = mysqli_query($con, "SELECT * FROM 'entreprise'");
$q = mysqli_query($con, "SELECT * FROM `user`  ORDER BY email ASC");
//SELECT `id`, `year`, `entrepriseOne`, `entrepriseTwo` FROM `entreprise` WHERE 1

while ($row = mysqli_fetch_object($q)){
    $data[]= $row;

}echo json_encode($data);
echo mysqli_error($con);