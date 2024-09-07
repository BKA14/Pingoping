<?php
include "config.php";

$userId = $_GET['id']; // Id de l'utilisateur reçu en paramètre

$sql = "SELECT n.* FROM notifications n
        INNER JOIN user_notifications un ON n.id = un.notification_id
        WHERE un.user_id = '$userId' AND un.isread = 0
        ORDER BY n.timestamp ASC";

$result = mysqli_query($con, $sql);

if ($result) {
    $rows = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo json_encode(array("error" => mysqli_error($con)));
}

mysqli_close($con);
