<?php
include "config.php";
//require 'vendor/autoload.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$code_saisi = isset($data['code']) ? $data['code'] : '';

session_start();

if (!isset($_SESSION['verification_code']) || !isset($_SESSION['user_data'])) {
    http_response_code(400);
    echo json_encode(["status" => "Error", "message" => "Session expired or data missing."]);
    exit;
}

function generateUniqueID($con) {
    $unique = false;
    while (!$unique) {
        $id = uniqid();
        $query = mysqli_query($con, "SELECT * FROM `user` WHERE `id` = '$id'");
        if (mysqli_num_rows($query) == 0) {
            $unique = true;
        }
    }
    return $id;
}

if ($code_saisi == $_SESSION['verification_code']) {
    // Le code est correct, insérer les données de l'utilisateur dans la base de données
    
    $user_data = $_SESSION['user_data'];
    $id = generateUniqueID($con);
    $nom = $user_data['nom'];
    $prenom = $user_data['prenom'];
    $email = $user_data['email'];
    $password = password_hash($user_data['password'], PASSWORD_BCRYPT);
    $grade = isset($user_data['grade']) ? $user_data['grade'] : 'utilisateur';
    $genre = $user_data['genre'];
    $contact = $user_data['contact'];
    $date_inscription = $user_data['date_inscription'];
    $datefinblocage = 'non';

    $sql_user = "INSERT INTO `user` (`id`, `nom`, `prenom`, `email`, `password`, `grade`, `genre`, `contact`, `datefinblocage`, `date_inscription`) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt_user = mysqli_prepare($con, $sql_user);
    mysqli_stmt_bind_param($stmt_user, "ssssssssss", $id, $nom, $prenom, $email, $password, $grade, $genre, $contact, $datefinblocage, $date_inscription);
    $success_user = mysqli_stmt_execute($stmt_user);

    if ($success_user) {
        http_response_code(201);
        echo json_encode(["status" => "Success"]);
    } else {
        http_response_code(422);
        echo json_encode(["status" => "Error", "message" => mysqli_error($con)]);
    }

    mysqli_close($con);
    session_unset(); // Effacer les données de la session
    session_destroy(); // Détruire la session
} else {
    http_response_code(201);
    echo json_encode(["invalid_code"]);
}

