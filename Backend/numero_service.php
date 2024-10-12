<?php
include "config.php";

// Obtenir les paramètres de pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 25;
$start = ($page - 1) * $limit;

$data = array();

// Requête SQL avec pagination
$stmt = $con->prepare("SELECT * FROM `numero_service` ORDER BY `rang` DESC LIMIT ?, ?");
$stmt->bind_param("ii", $start, $limit);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_object()) {
    $data[] = $row;
}

echo json_encode($data);


// Afficher les erreurs SQL (pour le débogage)
echo mysqli_error($con);

