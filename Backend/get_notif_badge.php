<?php
include "config.php";

// Création d'une nouvelle notification
$title = $_POST['title'];
$message = $_POST['message'];

$sql = "INSERT INTO notifications (title, message) VALUES ('$title', '$message')";
if (mysqli_query($con, $sql)) {
    $notificationId = mysqli_insert_id($con);

    // Récupération de tous les utilisateurs
    $usersSql = "SELECT id FROM user";
    $result = mysqli_query($con, $usersSql);
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $userId = $row['id'];

            // Insertion de l'association utilisateur-notification
            $userNotifSql = "INSERT INTO user_notifications (user_id, notification_id) VALUES ('$userId', '$notificationId')";
            mysqli_query($con, $userNotifSql);
        }
    }

    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("error" => mysqli_error($con)));
}

mysqli_close($con);

