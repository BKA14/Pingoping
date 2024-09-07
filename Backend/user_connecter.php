<?php
include "config.php";
$input = file_get_contents('php://input');
$message = array();

$now = date('Y-m-d H:i:s');
$activeThreshold = date('Y-m-d H:i:s', strtotime('-5 minutes', strtotime($now))); // Actif dans les 5 dernières minutes
$sql = "SELECT COUNT(*) AS connected_users FROM user_sessions WHERE last_activity >= '$activeThreshold' AND logout_time IS NULL";
$result = mysqli_query($con, $sql);

if($result){
    $row = mysqli_fetch_assoc($result);
    $connectedUsers = $row['connected_users'];
    $message['status'] = "Success";
    $message['connected_users'] = $connectedUsers;
} else {
    http_response_code(422);
    $message['status'] = "Error";
    $message['error'] = mysqli_error($con);
}

echo json_encode($message);
