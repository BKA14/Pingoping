<?php
include "config.php";

// Récupérer la date actuelle
$currentDate = date("Y-m-d H:i:s");

// Récupérer tous les utilisateurs
$q = mysqli_query($con, "SELECT * FROM `user`");

// Parcourir les utilisateurs
while ($row = mysqli_fetch_assoc($q)) {
    $id = $row['id'];
    $dateFinBlocage = $row['datefinblocage'];

    // Si la date de fin de blocage est dépassée et n'est pas déjà 'non'
    if ($dateFinBlocage != 'non' && strtotime($currentDate) > strtotime($dateFinBlocage)) {
        // Mettre à jour la date de fin de blocage à 'non'
        $updateQuery = "UPDATE `user` SET datefinblocage = 'non' WHERE id = $id";
        mysqli_query($con, $updateQuery);
    }
}

// Sélectionner à nouveau tous les utilisateurs et les renvoyer en tant que JSON
$q = mysqli_query($con, "SELECT * FROM `user`");
$data = [];
while ($row = mysqli_fetch_object($q)) {
    $data[] = $row;
}
echo json_encode($data);

mysqli_close($con);
?>
