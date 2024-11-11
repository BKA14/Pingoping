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
$baseUrl = "autorack.proxy.rlwy.net";
$url_alert = "image_app/image_alert/";
$url_pub ="image_app/image_pub/";
$url_resto = "image_app/image_resto/";
$url_plat = "image_app/image_plat/";
$url_apropos = "image_app/image_apropos/";
$url_firebase = "https://pingoping.onrender.com/cle_firebase/pingoping-firebase-adminsdk-gjefv-a0eaaa87d9.json";
$url_render = "https://pingoping.onrender.com";


$host = $baseUrl;
$user = "root";
$password = "woHXCLZJcnIzAgjVnocnAbGxwevRcqMo";
$dbname = "ionic";
$port  = "53042";

$con = mysqli_connect($host, $user, $password, $dbname, $port) or die("Could not connect to the database");
