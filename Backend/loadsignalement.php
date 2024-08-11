<?php
include"config.php";
$data = array();

// Obtenir les paramètres de pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$start = ($page - 1) * $limit;



//$q = mysqli_query($con, "SELECT * FROM 'entreprise'");
$q = mysqli_query($con, "SELECT * FROM `signalement`  ORDER BY heuredusignalement DESC  LIMIT $start, $limit");
//SELECT `id`, `year`, `entrepriseOne`, `entrepriseTwo` FROM `entreprise` WHERE 1

while ($row = mysqli_fetch_object($q)){
    $data[]= $row;

}echo json_encode($data);
echo mysqli_error($con);


// Récupérer la date actuelle
$currentDate = date("Y-m-d\TH:i:s");

