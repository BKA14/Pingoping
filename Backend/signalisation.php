<?php
include "config.php";

$message = array();

// Fonction pour générer un ID unique
function generateUniqueID($con) {
    $unique = false;
    while (!$unique) {
        $id = uniqid();
        $query = mysqli_query($con, "SELECT * FROM `signalisation` WHERE `id` = '$id'");
        if (mysqli_num_rows($query) == 0) {
            $unique = true;
        }
    }
    return $id;
}

$id = generateUniqueID($con);
$nom = $_POST['nom'];
$iduser = $_POST['iduser'];
$contactuser = $_POST['numero'];
$prenom = $_POST['prenom'];
$description = $_POST['description'];
$categorie = $_POST['category'];
$statut = 'non';
$rapport = 'non';
$statut_rapport = 'non';

// Décoder les données JSON pour location
$location = json_decode($_POST['location'], true);
$longitude = $location['longitude'];
$latitude = $location['latitude'];

// Vérifier que les données de longitude et latitude sont présentes
if (!isset($longitude) || !isset($latitude) || !isset($nom) || !isset($prenom) || !isset($iduser) || !isset($contactuser)  || !isset($description) || !isset($categorie)) {
    http_response_code(422);
    $message['status'] = "Error";
    $message['message'] = "Données non présentes";
    echo json_encode($message);
    exit;
}

// Initialiser une variable pour stocker le chemin du fichier
$target_path = "";

// Vérifier si un fichier a été téléchargé
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $file_tmp = $_FILES['image']['tmp_name'];

    function generateRandomString($length) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randomString;
    }

    // Générez un nom de fichier unique de 22 caractères
    $file_name = generateRandomString(22) . "." . pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);

    // Spécifiez le chemin cible où vous souhaitez enregistrer le fichier sur votre serveur
    $target_path = "C:/xampp/htdocs/alert/" . $file_name;

    // Déplacez le fichier téléchargé vers le chemin spécifié
    if (!move_uploaded_file($file_tmp, $target_path)) {
        // Gérer les erreurs côté serveur
        http_response_code(422);
        $message['status'] = "Error moving file";
        echo json_encode($message);
        exit;
    }
}

$q = mysqli_query($con, "INSERT INTO `signalisation` (`id`, `iduser`, `image`, `numuser`, `nom`, `prenom`, `longitude`, `latitude`, `description`, `categorie`, `statut`, `rapport`, `statut_rapport`) 
    VALUES ('$id', '$iduser', '$target_path', '$contactuser', '$nom', '$prenom', '$longitude', '$latitude', '$description', '$categorie', '$statut', '$rapport', '$statut_rapport')");

$qq = mysqli_query($con, "INSERT INTO `signalisation_stockage` (`id`, `iduser`, `image`, `numuser`, `nom`, `prenom`, `longitude`, `latitude`, `description`, `categorie`, `statut`, `rapport`, `statut_rapport`) 
    VALUES ('$id', '$iduser', '$target_path', '$contactuser', '$nom', '$prenom', '$longitude', '$latitude', '$description', '$categorie', '$statut', '$rapport', '$statut_rapport')");

if ($q && $qq) {
    http_response_code(201);
    $message['status'] = "Success";
} else {
    http_response_code(422);
    $message['status'] = "Error";
}

echo json_encode($message);
