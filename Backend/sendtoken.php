<?php
include "config.php";
require 'vendor/autoload.php';

use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$results = [];

// Récupération du token et du rôle de l'utilisateur depuis la requête
$token = $data['token'] ?? ''; // Assurez-vous que le token est bien envoyé dans la requête
$userRole = $data['role'] ?? 'user'; // Par défaut, rôle "user" si non spécifié

// Initialiser Firebase
$factory = (new Factory)
    ->withServiceAccount('cle_firebase/pingoping-firebase-adminsdk-gjefv-00ca2d68c2.json');

$messaging = $factory->createMessaging();

// Vérifier le rôle de l'utilisateur et s'abonner au topic approprié
if ($userRole === 'admin' || $userRole === 'superadmin') {
    $results['admin'] = subscribeToTopic($messaging, $token, 'admin');
    $results['alluser'] = subscribeToTopic($messaging, $token, 'alluser');
} else {
    $results['user'] = subscribeToTopic($messaging, $token, 'user');
    $results['alluser'] = subscribeToTopic($messaging, $token, 'alluser');
}

echo json_encode($results);

function subscribeToTopic($messaging, $token, $topic) {
    try {
        // Abonner l'utilisateur au topic
        $messaging->subscribeToTopic($topic, $token);
        error_log('Successfully subscribed to topic: ' . $topic);
        return ['success' => true, 'message' => 'Subscribed to ' . $topic];
    } catch (\Kreait\Firebase\Exception\MessagingException $e) {
        error_log('Error subscribing to topic: ' . $e->getMessage());
        return ['success' => false, 'message' => 'Failed to subscribe to ' . $topic];
    }
}
