<?php
include"config.php";
$data = array();

// Récupérer la date actuelle
$currentDate = date("Y-m-d\TH:i:s");

// Mettre à jour la date de fin de blocage pour les utilisateurs dont la date est dépassée
$updateQuery = "UPDATE `user` SET datefinblocage = 'non' WHERE (datefinblocage IS NULL OR datefinblocage < '$currentDate') OR datefinblocage = 'non'";
mysqli_query($con, $updateQuery);




//$q = mysqli_query($con, "SELECT * FROM 'entreprise'");
$q = mysqli_query($con, "SELECT * FROM `etatdelikes`  ORDER BY id ASC");
//SELECT `id`, `year`, `entrepriseOne`, `entrepriseTwo` FROM `entreprise` WHERE 1

while ($row = mysqli_fetch_object($q)){
    $data[]= $row;

}echo json_encode($data);
echo mysqli_error($con);

