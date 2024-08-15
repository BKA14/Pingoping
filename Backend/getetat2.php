<?php
include "config.php";

// Récupération de l'entrée brute JSON et décodage
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Sécurisation des données d'entrée pour éviter les injections SQL
$iduser = mysqli_real_escape_string($con, $data['iduser']);
$contactuser = mysqli_real_escape_string($con, $data['contactuser']);
$pubid = mysqli_real_escape_string($con, $data['pubid']);

// Requête SQL pour vérifier l'existence de l'utilisateur et de la publication dans la table etatdelikes
$q = mysqli_query($con, "SELECT * FROM `etatdelikes` WHERE idpub = '$pubid' AND iduser = '$iduser' LIMIT 1");

// Vérification des résultats et réponse au client
if (mysqli_num_rows($q) > 0) {
    $row = mysqli_fetch_assoc($q);
    echo json_encode([
        "result" => "oui",
        "data" => $row
    ]);
} else {
    echo json_encode(["result" => "non"]);
}

// Gestion des erreurs MySQL
if (mysqli_error($con)) {
    error_log("MySQL error: " . mysqli_error($con));
}
