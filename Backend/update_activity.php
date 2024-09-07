<?php
include"config.php";
$input = file_get_contents('php://input');
$message = array();
$id = $_GET['id'];

$lastActivity = date('Y-m-d H:i:s');
$sql = "UPDATE user_sessions SET last_activity = '$lastActivity' WHERE user_id = '$id' AND logout_time IS NULL";
mysqli_query($con, $sql);


if($sql){
    $message['status'] = "Success";
}else{
    http_response_code(422);
    $message['status']= " Error";
}
echo json_encode($message);
echo mysqli_error($con);
