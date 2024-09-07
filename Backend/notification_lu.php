<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$user_id = $data['id'];

// Met à jour toutes les notifications de l'utilisateur comme lues
$sql = "UPDATE user_notifications SET isread = 1 WHERE user_id = '$user_id' AND isread = 0";

if (mysqli_query($con, $sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($con)]);
}

mysqli_close($con);
