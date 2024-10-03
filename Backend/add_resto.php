<?php
include "config.php";


// Fonction pour générer un ID unique
function generateUniqueID($con) {
    do {
        $id = uniqid();
        $query = mysqli_query($con, "SELECT * FROM `restaurant` WHERE `id` = '$id'");
    } while (mysqli_num_rows($query) > 0);
    
    return $id;
}


 // Générer un identifiant unique pour le panier (CHAR 32)
 $id = bin2hex(random_bytes(16)); // Génère un identifiant de 32 caractères hexadécimaux

// Obtenez les autres données du formulaire (non fichiers) à partir de $_POST

$nom = $_POST['nom'];
$description = $_POST['description'];
$rang = $_POST['rang'];
$contact = $_POST['contact'];
$longitude = $_POST['longitude'];
$latitude = $_POST['latitude'];
$date_deb = $_POST['date_deb'];
$date_fin = $_POST['date_fin'];
$etiquette = $_POST['etiquette'];
$supprimer = $_POST['supprimer'];
$commentaire = $_POST['commentaire'];
$contact_admin = $_POST['contact_admin'];


// Initialisez une variable pour stocker le chemin du fichier (qui peut être modifié si un nouveau fichier est téléchargé)
$target_path = "";

// Vérifiez si un fichier a été téléchargé
if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    $file_tmp = $_FILES['photo']['tmp_name'];

    function generateRandomString($length) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randomString;
    }

    // Générez un nom de fichier unique de 20 caractères
    $file_name = $nom . generateRandomString(20) . "." . pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);

    // Spécifiez le chemin cible où vous souhaitez enregistrer le fichier sur votre serveur
    $target_path = "C:/xampp/htdocs/restaurant/" . $file_name;

    // Déplacez le fichier téléchargé vers le chemin spécifié
    if (!move_uploaded_file($file_tmp, $target_path)) {
        // Gérer les erreurs côté serveur
        http_response_code(422);
        $message['status'] = "Error moving file";
        echo json_encode($message);
        exit;
    }
} else {
    // Aucun fichier sélectionné, assignez "non" à la variable
    $target_path = 'non';
    $file_name = 'non';
}

// Construisez la requête SQL en utilisant une requête préparée pour la table pub
$sql_pub = "INSERT INTO `restaurant` (`id`, `nom_resto`, `description`, `rang`, `contact`, `longitude`, `latitude`, `heure_deb`, `heure_fin`, `image`, `supprimer`, `commentaire`, `etiquette`, `contact_admin`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?)";
$stmt_pub = mysqli_prepare($con, $sql_pub);
mysqli_stmt_bind_param($stmt_pub, "ssssssssssssss", $id, $nom, $description, $rang, $contact, $longitude, $latitude, $date_deb, $date_fin, $file_name, $supprimer, $commentaire, $etiquette, $contact_admin );
$success_pub = mysqli_stmt_execute($stmt_pub);


// Vérifiez le succès de l'insertion dans les deux tables
if($success_pub) {
    http_response_code(201);
    $message['status'] = "Success";
} else {
    http_response_code(422);
    $message['status'] = "Error";
}

// Retourner le résultat au format JSON
echo json_encode($message);
