<?php
//session_start(); // Démarre la session pour toutes les pages qui incluent ce fichier
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true'); // Ajoutez cet en-tête

// Répondre à une requête OPTIONS pour le CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

header('Content-Type: application/json'); 

mysql://root:woHXCLZJcnIzAgjVnocnAbGxwevRcqMo@autorack.proxy.rlwy.net:53042/railway
$baseUrl = "192.168.1.67";

$host = $baseUrl;
$user = "kevin";
$password = "";
$dbname = "ionic";
$port  = "3306";

$con = mysqli_connect($host, $user, $password, $dbname, $port) or die("Could not connect to the database");
