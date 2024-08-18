<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Répondre à une requête OPTIONS pour le CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

header('Content-Type: application/json'); // Modifiez en fonction de vos besoins

$baseUrl = "192.168.1.66";

$host = $baseUrl;
$user = "kevin";
$password = "";
$dbname = "ionic";
$port  = "3306";

$con = mysqli_connect($host, $user, $password, $dbname, $port) or die("Could not connect to the database");
