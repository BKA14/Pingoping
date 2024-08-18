<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$results = [];

// Récupération du token et du rôle de l'utilisateur depuis la requête
$token = $data['token'];
$userRole = $data['role'];

// Vérifier le rôle de l'utilisateur et s'abonner au topic approprié
if ($userRole === 'admin' || $userRole === 'superadmin') {
    subscribeToTopic($token, 'admin');
    subscribeToTopic($token, 'alluser');
} else {
    subscribeToTopic($token, 'user');
    subscribeToTopic($token, 'alluser');
}
echo json_encode($results);

function subscribeToTopic($token, $topic) {
    // URL de l'API pour s'abonner à un topic
    $url = 'https://iid.googleapis.com/iid/v1:batchAdd';
    
    // Remplacez par votre clé de serveur FCM
    $serverKey = 'AIzaSyDMGj-RJjfSodpw19AJK3UbKDIV6v2Ub_U';

    // Données pour l'abonnement
    $data = [
        'to' => '/topics/' . $topic,
        'registration_tokens' => [$token],
    ];

    // En-têtes de la requête
    $headers = [
        'Authorization: key=' . $serverKey,
        'Content-Type: application/json',
    ];

    // Initialisation de la requête cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    // Exécution de la requête et gestion de la réponse
    $result = curl_exec($ch);
    $successMessage = json_encode(['status' => 'success', 'message' => 'User subscribed to topics successfully']);
    echo $successMessage;

    if ($result === FALSE) {
        error_log('Curl failed: ' . curl_error($ch));
        return false;
    }
    
    $errorMessage = json_encode(['status' => 'error', 'message' => 'Failed to subscribe to topics']);
    echo $errorMessage;


    // Vérification de la réponse de l'API
    $response = json_decode($result, true);
    if (isset($response['error'])) {
        error_log('Error subscribing to topic: ' . $response['error']);
    }

    curl_close($ch);
    return $result;
}
