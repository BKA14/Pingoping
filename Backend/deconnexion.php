<?php
include"config.php";
$input = file_get_contents('php://input');
$message = array();
$id = $_GET['id'];

$logoutTime = date('Y-m-d H:i:s');
$sql = mysqli_query($con, "UPDATE user_sessions SET logout_time = '$logoutTime' WHERE user_id = '$id' AND logout_time IS NULL");

if($sql){
    $message['status'] = "Success";
}else{
    http_response_code(422);
    $message['status']= " Error";
}
echo json_encode($message);
echo mysqli_error($con);
