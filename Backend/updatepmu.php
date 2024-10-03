<?php
include "config.php";


$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();

// Validate required fields
if (empty($data['commentaire1']) || empty($data['typecourse']) || empty($data['nbrpartant']) || empty($data['numdujour']) || empty($data['num2']) || empty($data['commentaire2'])) {
    http_response_code(400);
    echo json_encode(['status' => 'Error', 'message' => 'Missing required fields.']);
    exit;
}

$commentaire1 = $data['commentaire1'];
$typecourse = $data['typecourse'];
$nbrpartant = $data['nbrpartant'];
$numdujour = $data['numdujour'];
$num2 = $data['num2'];
$commentaire2 = $data['commentaire2'];
$id = intval($_GET['id']); // Ensure the ID is an integer

// Prepare SQL statement to prevent SQL injection
$stmt = $con->prepare("UPDATE `pmu` SET `commentaire1` = ?, `typecourse` = ?, `nbrpartant` = ?, `numdujour` = ?, `num2` = ?, `commentaire2` = ?");
$stmt->bind_param("ssssss", $commentaire1, $typecourse, $nbrpartant, $numdujour, $num2, $commentaire2);

if ($stmt->execute()) {
    $message['status'] = "Success";
} else {
    http_response_code(422);
    $message['status'] = "Error";
    $message['details'] = $stmt->error; // Provide more details about the error
}

$stmt->close();
$con->close();
echo json_encode($message);
