<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();
$email = $data['email'];
$password = $data['password'];

// Récupérer les informations de l'utilisateur par email
$q = mysqli_query($con, "SELECT * FROM user WHERE email = '$email' LIMIT 1");

if ($row = mysqli_fetch_object($q)) {
    // Vérifier si le mot de passe correspond
    if (password_verify($password, $row->password)) {
        // Le mot de passe est correct, retournez les données de l'utilisateur
        echo json_encode($row);
    } else {
        // Le mot de passe est incorrect
        http_response_code(401); // Unauthorized
        $message['status'] = "Error";
        $message['message'] = "Mot de passe incorrect";
        echo json_encode($message);
    }
} else {
    // Aucune utilisateur trouvé avec cet email
    http_response_code(404); // Not Found
    $message['status'] = "Error";
    $message['message'] = "Aucun utilisateur trouvé avec cet email";
    echo json_encode($message);
}

// Afficher les erreurs de la requête
echo mysqli_error($con);
