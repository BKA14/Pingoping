<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();

$iduser = mysqli_real_escape_string($con, $data['iduser']);
$contactuser = mysqli_real_escape_string($con, $data['contactuser']);
$pubid = mysqli_real_escape_string($con, $data['pubid']);

$q = mysqli_query($con, "SELECT * FROM `etatdelikes` WHERE idpub = '$pubid' AND iduser = '$iduser' AND contactuser = '$contactuser' LIMIT 1");

if (mysqli_num_rows($q) > 0) {
    $row = mysqli_fetch_assoc($q);
    echo json_encode([
        "result" => "oui",
        "data" => $row
    ]);
} else {
    echo json_encode(["result" => "non"]);
}

if (mysqli_error($con)) {
    error_log("MySQL error: " . mysqli_error($con));
}
