<?php
include "config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

// Obtenez l'ID de la pub à modifier 
$id = $_POST['id'];

// Autres données du formulaire
$email = $_POST['email'];
$commentaire = $_POST['commentaire'];
$version = $_POST['version'];
$contact = $_POST['contact'];
$facebook = $_POST['facebook'];
$whatsapp = $_POST['whatsapp'];
$instagram = $_POST['instagram'];
$tiktok = $_POST['tiktok'];
$telegram = $_POST['telegram'];
$youtube = $_POST['youtube'];

// Initialisez une variable pour stocker le chemin du fichier
$target_path = "";

// Vérifiez si un fichier a été téléchargé
if (!empty($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    // Générez un nom de fichier unique
    $file_name = generateRandomString(20) . "." . pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
    // Spécifiez le chemin cible où vous souhaitez enregistrer le fichier sur votre serveur
    $target_path = "C:/xampp/htdocs/img/" . $file_name;

    // Déplacez le fichier téléchargé vers le chemin spécifié
    if (!move_uploaded_file($_FILES['photo']['tmp_name'], $target_path)) {
        // Gérer les erreurs côté serveur
        http_response_code(422);
        $message['status'] = "Error moving file";
        echo json_encode($message);
        exit;
    }
}

elseif (!empty($_POST['photo'])) {
    // Utilisez le contenu de la variable photo comme logo si aucun fichier n'est téléchargé
    $file_name = basename($_POST['photo']);
}



// Construisez la requête SQL
$sql = "UPDATE `apropos` SET `email`=?, `commentaire`=?, `version`=?, `contact`=?, `logo`=?, `facebook`=?, `youtube`=?, `instagram`=?, `telegram`=?, `tiktok`=?, `whatsapp`=?  WHERE `id`=?";

// Préparez la requête
$stmt = mysqli_prepare($con, $sql);

// Liez les paramètres
mysqli_stmt_bind_param($stmt, "sssssssssssi", $email, $commentaire, $version, $contact, $file_name, $facebook, $youtube, $instagram, $telegram, $tiktok, $whatsapp, $id);

// Exécutez la requête préparée
$q = mysqli_stmt_execute($stmt);

// Vérifiez le résultat de la requête
if ($q) {
    http_response_code(200);
    $message['status'] = "Success";
} else {
    // Gérer les erreurs côté serveur
    http_response_code(422);
    $message['status'] = "Error";
}

echo json_encode($message);

// Fonction pour générer une chaîne aléatoire
function generateRandomString($length) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}
