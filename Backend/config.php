<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: token,  Content-Type');
header('Access-Control-Max-Age: 1728000');
header('Content-Length: 0');
header('Content-Type: text/plain');


$host = "localhost";
$user = "root";
$password = "";
$dbname = "ionic";
$port  = "3306";

//$con = mysqli_connect("localhost", "root", "", "ionic") or die("could not connect DB"); 
$con = mysqli_connect($host, $user, $password, $dbname, $port) or die("could not connect DB");


