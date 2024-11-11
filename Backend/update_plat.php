<?php
include "config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

// Initialisez un tableau pour les messages de retour
$message = array();

// Vérifiez que l'ID est fourni
if (!isset($_POST['id']) || empty(trim($_POST['id']))) {
    http_response_code(422);
    $message['status'] = "ID manquant ou invalide.";
    echo json_encode($message);
    exit;
}
$id = trim($_POST['id']);

// Récupérez les autres données du formulaire
$nom = isset($_POST['nom']) ? trim($_POST['nom']) : '';
$description = isset($_POST['description']) ? trim($_POST['description']) : '';
$rang = isset($_POST['rang']) ? trim($_POST['rang']) : '';
$prix = isset($_POST['prix']) ? trim($_POST['prix']) : '';
$etiquette = isset($_POST['etiquette']) ? trim($_POST['etiquette']) : '';
$supprimer = isset($_POST['supprimer']) ? trim($_POST['supprimer']) : '';

// Initialisation de la variable pour le fichier
$file_name = 'non';
$target_path = "";

// Fonction pour générer un nom de fichier unique
function generateRandomString($length = 20) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return substr(str_shuffle(str_repeat($characters, ceil($length / strlen($characters)))), 1, $length);
}

// Gestion de la photo
if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    // Gestion de l'upload de fichier
    $file_tmp = $_FILES['photo']['tmp_name'];
    $file_extension = strtolower(pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION));
    $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (in_array($file_extension, $allowed_extensions)) {
        $file_name = $nom . generateRandomString() . "." . $file_extension;
        $target_path = "C:/xampp/htdocs/plat_restaurant/" . $file_name;

        if (!move_uploaded_file($file_tmp, $target_path)) {
            http_response_code(422);
            $message['status'] = "Erreur lors du déplacement du fichier.";
            echo json_encode($message);
            exit;
        }
    } else {
        http_response_code(422);
        $message['status'] = "Type de fichier non autorisé.";
        echo json_encode($message);
        exit;
    }
} elseif (isset($_POST['photo']) && trim($_POST['photo']) != 'non') {
    // Si aucune photo n'a été envoyée mais que le nom de la photo est fourni
    $file_name = trim($_POST['photo']); // Utilisez le nom de la photo fourni
}

// Construire la requête SQL pour la mise à jour des données
$sql = "UPDATE `plat_restaurant` SET 
    `nom_plat` = ?, 
    `description` = ?, 
    `rang` = ?, 
    `prix` = ?, 
    `supprimer` = ?, 
    `etiquette` = ?, 
    `image` = ? 
    WHERE `id` = ?";

// Préparer la requête
$stmt = mysqli_prepare($con, $sql);

if (!$stmt) {
    http_response_code(422);
    $message['status'] = "Erreur de préparation de la requête : " . mysqli_error($con);
    echo json_encode($message);
    exit;
}

// Lier les paramètres
mysqli_stmt_bind_param($stmt, "ssssssss", 
    $nom, 
    $description, 
    $rang,  
    $prix, 
    $supprimer, 
    $etiquette, 
    $file_name, 
    $id
);

// Exécutez la requête
if (mysqli_stmt_execute($stmt)) {
    http_response_code(200);
    $message['status'] = "Succès. Le plat a été mis à jour.";
} else {
    http_response_code(422);
    $message['status'] = "Erreur lors de la mise à jour : " . mysqli_stmt_error($stmt);
}

// Fermer la requête
mysqli_stmt_close($stmt);

// Retourner le résultat
echo json_encode($message);

// Fermer la connexion à la base de données
mysqli_close($con);
