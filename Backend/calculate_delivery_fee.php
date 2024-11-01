<?php

include "config.php";

// Récupération des données depuis la requête POST
$data = json_decode(file_get_contents("php://input"), true);
$totalPlats = isset($data['totalPlats']) ? $data['totalPlats'] : 0;
$serverTime = isset($data['serverTime']) ? $data['serverTime'] : time() * 1000;

// Conversion de l'heure du serveur en format PHP
$serverDate = new DateTime();
$serverDate->setTimestamp($serverTime / 1000);
$currentHour = (int) $serverDate->format('H');

// Paramètres des frais
$baseFee = 1500;
$extraFeePer3Plats = 500;
$nightSurcharge = 500;

// Vérification des heures de nuit
$isNightTime = ($currentHour >= 22 || $currentHour < 5);
if ($isNightTime) {
    $baseFee += $nightSurcharge;
    $extraFeePer3Plats += $nightSurcharge;
}

// Calcul des frais de livraison
if ($totalPlats <= 3) {
    $deliveryFee = $baseFee;
} else {
    $extraFees = floor(($totalPlats - 1) / 3) * $extraFeePer3Plats;
    $deliveryFee = $baseFee + $extraFees;
}

// Renvoi du résultat en JSON
echo json_encode([
    'deliveryFee' => $deliveryFee,
    'isNightTime' => $isNightTime
]);

