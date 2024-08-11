<?php
include "config.php";

// Récupérer les données JSON de la requête
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$message = array();

// Fonction pour générer un ID unique
function generateUniqueID($con) {
    $unique = false;
    while (!$unique) {
        $id = uniqid();
        $query = mysqli_query($con, "SELECT * FROM `user` WHERE `id` = '$id'");
        if (mysqli_num_rows($query) == 0) {
            $unique = true;
        }
    }
    return $id;
}

// Générer un ID unique
$id = generateUniqueID($con);

// Récupérer les données de l'utilisateur à partir des données JSON
$nom = isset($data['nom']) ? $data['nom'] : null;
$prenom = isset($data['prenom']) ? $data['prenom'] : null;
$email = isset($data['email']) ? $data['email'] : null;
$password = isset($data['password']) ? $data['password'] : null;
$password2 = isset($data['password2']) ? $data['password2'] : null;
$grade = isset($data['grade']) ? $data['grade'] : null;
$genre = isset($data['genre']) ? $data['genre'] : null;
$contact = isset($data['contact']) ? $data['contact'] : null;
$date_inscription = isset($data['date_inscription']) ? $data['date_inscription'] : null;
$datefinblocage = 'non';

// Vérifier que toutes les données nécessaires sont présentes et non vides
if (empty($nom) || empty($prenom) || empty($email) || empty($password) || empty($password2) || empty($genre) || empty($contact)) {
    http_response_code(422);
    $message['status'] = "Error";
    $message['message'] = "All fields are required";
    echo json_encode($message);
    exit;
}

// Vérifier si l'email ou le contact existe déjà
$emailCheck = mysqli_query($con, "SELECT * FROM `user` WHERE `email` = '$email'");
$contactCheck = mysqli_query($con, "SELECT * FROM `user` WHERE `contact` = '$contact'");

if (mysqli_num_rows($emailCheck) > 0) {
    http_response_code(201);
    $message = "email_exist";
    echo json_encode($message);
    exit;
}

if (mysqli_num_rows($contactCheck) > 0) {
    http_response_code(201);
    $message = "contact_exist";
    echo json_encode($message);
    exit;
}

// Hacher le mot de passe
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// Préparer et exécuter la requête d'insertion pour la table user
$sql_user = "INSERT INTO `user` (`id`, `nom`, `prenom`, `email`, `password`, `grade`, `genre`, `contact`, `datefinblocage`, `date_inscription`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt_user = mysqli_prepare($con, $sql_user);
mysqli_stmt_bind_param($stmt_user, "ssssssssss", $id, $nom, $prenom, $email, $hashed_password, $grade, $genre, $contact, $datefinblocage, $date_inscription);
$success_user = mysqli_stmt_execute($stmt_user);

// Préparer et exécuter la requête d'insertion pour la table userstockage
$sql_userstockage = "INSERT INTO `userstockage` (`id`, `nom`, `prenom`, `email`, `password`, `grade`, `genre`, `contact`, `datefinblocage`, `date_inscription`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt_userstockage = mysqli_prepare($con, $sql_userstockage);
mysqli_stmt_bind_param($stmt_userstockage, "ssssssssss", $id, $nom, $prenom, $email, $hashed_password, $grade, $genre, $contact, $datefinblocage, $date_inscription);
$success_userstockage = mysqli_stmt_execute($stmt_userstockage);

// Vérifier le succès de l'insertion dans les deux tables
if ($success_user && $success_userstockage) {
    http_response_code(201);
    $message['status'] = "Success";
} else {
    http_response_code(422);
    $message['status'] = "Error";
    $message['message'] = mysqli_error($con);
}

// Retourner la réponse au format JSON
echo json_encode($message);

// Fermer la connexion à la base de données
mysqli_close($con);
