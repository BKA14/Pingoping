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
$url_render = "https://pingoping.onrender.com/";
$baseUrl = "192.168.1.67";
//$url_alert = $url_render . "image_app/image_alert/";
//$url_pub = $url_render ."image_app/image_pub/";
//$url_resto = $url_render ."image_app/image_resto/";
//$url_plat =$url_render . "image_app/image_plat/";
//$url_apropos = $url_render ."image_app/image_apropos/";
$url_firebase = "https://pingoping.onrender.com/cle_firebase/pingoping-firebase-adminsdk-gjefv-a0eaaa87d9.json";

//sur render
//$url_move_pub = "/var/www/html/image_app/image_pub/";
//$url_move_alert = "/var/www/html/image_app/image_alert/";
//$url_move_resto = "/var/www/html/image_app/image_pub/";
//$url_move_plat = "/var/www/html/image_app/image_plat/";
//$url_move_apropos = "/var/www/html/image_app/image_apropos/";


// en local
$url_alert = "http://192.168.1.67/Projet_ Lokaliser/Backend/image_app/image_alert/";
$url_pub = "http://192.168.1.67/Projet_ Lokaliser/Backend/image_app/image_pub/";
$url_resto = "http://192.168.1.67/Projet_ Lokaliser/Backend/image_app/image_resto/";
$url_plat = "http://192.168.1.67/Projet_ Lokaliser/Backend/image_app/image_plat/";
$url_apropos = "http://192.168.1.67/Projet_ Lokaliser/Backend/image_app/image_apropos/";

// en local
$url_move_alert = "C:/xampp/htdocs/Projet_ Lokaliser/Backend/image_app/image_alert/";
$url_move_pub = "C:/xampp/htdocs/Projet_ Lokaliser/Backend/image_app/image_pub/";
$url_move_resto = "C:/xampp/htdocs/Projet_ Lokaliser/Backend/image_app/image_resto/";
$url_move_plat = "C:/xampp/htdocs/Projet_ Lokaliser/Backend/image_app/image_plat/";
$url_move_apropos =  "C:/xampp/htdocs/Projet_ Lokaliser/Backend/image_app/image_apropos/";

$host = $baseUrl;
$user = "kevin";
$password = "";
$dbname = "ionic";
$port  = "3306";

$con = mysqli_connect($host, $user, $password, $dbname, $port) or die("Could not connect to the database");
