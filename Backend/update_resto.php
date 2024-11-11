<?php
include "config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

// Initialisez un tableau pour les messages de retour
$message = array();

// Vérifiez que l'ID est fourni
if (isset($_POST['id']) && !empty(trim($_POST['id']))) {
    $id = trim($_POST['id']);
} else {
    http_response_code(422);
    $message['status'] = "ID manquant ou invalide.";
    echo json_encode($message);
    exit;
}

// Récupérez les autres données du formulaire
$nom = isset($_POST['nom']) ? trim($_POST['nom']) : '';
$description = isset($_POST['description']) ? trim($_POST['description']) : '';
$rang = isset($_POST['rang']) ? trim($_POST['rang']) : '';
$contact = isset($_POST['contact']) ? trim($_POST['contact']) : '';
$longitude = isset($_POST['longitude']) ? trim($_POST['longitude']) : '';
$latitude = isset($_POST['latitude']) ? trim($_POST['latitude']) : '';
$date_deb = isset($_POST['date_deb']) ? trim($_POST['date_deb']) : '';
$date_fin = isset($_POST['date_fin']) ? trim($_POST['date_fin']) : '';
$etiquette = isset($_POST['etiquette']) ? trim($_POST['etiquette']) : '';
$supprimer = isset($_POST['supprimer']) ? trim($_POST['supprimer']) : '';
$commentaire = isset($_POST['commentaire']) ? trim($_POST['commentaire']) : '';
$ville = isset($_POST['ville']) ? trim($_POST['ville']) : '';
$contact_admin = isset($_POST['contact_admin']) ? trim($_POST['contact_admin']) : '';

// Initialisation de la variable pour le fichier
$file_name = 'non';
$target_path = "";

// Vérifiez si un fichier a été téléchargé
if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    $file_tmp = $_FILES['photo']['tmp_name'];
    
    // Vérifier le type de fichier (par exemple, uniquement les images)
    $file_extension = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
    $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (in_array(strtolower($file_extension), $allowed_extensions)) {
        // Fonction pour générer un nom de fichier unique
        function generateRandomString($length) {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $randomString = '';
            for ($i = 0; $i < $length; $i++) {
                $randomString .= $characters[rand(0, strlen($characters) - 1)];
            }
            return $randomString;
        }

        // Générez un nom de fichier unique
        $file_name = $nom . generateRandomString(20) . "." . $file_extension;

        // Chemin cible pour enregistrer le fichier
        $target_path = "C:/xampp/htdocs/restaurant/" . $file_name;

        // Déplacez le fichier téléchargé vers le chemin spécifié
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
} elseif (isset($_POST['photo']) && trim($_POST['photo']) !== 'non') {
    // Si une valeur autre que 'non' est fournie dans 'photo', cela signifie que c'est le nom du fichier
    $file_name = trim($_POST['photo']);
}

// Construire la requête SQL pour la mise à jour des données du restaurant
$sql = "UPDATE `restaurant` SET 
    `nom_resto` = ?, 
    `description` = ?, 
    `rang` = ?, 
    `contact` = ?, 
    `longitude` = ?, 
    `latitude` = ?, 
    `heure_deb` = ?, 
    `heure_fin` = ?, 
    `supprimer` = ?, 
    `commentaire` = ?, 
    `etiquette` = ?, 
    `image` = ?, 
    `ville` = ?,
    `contact_admin` = ? 
    WHERE `id` = ?";

// Préparer la requête
$stmt = mysqli_prepare($con, $sql);

// Vérification des erreurs de préparation
if (!$stmt) {
    http_response_code(422);
    $message['status'] = "Erreur de préparation de la requête : " . mysqli_error($con);
    echo json_encode($message);
    exit;
}

// Lier les paramètres en s'assurant que chaque type correspond
mysqli_stmt_bind_param($stmt, "sssssssssssssss", 
    $nom, 
    $description, 
    $rang, 
    $contact, 
    $longitude, 
    $latitude, 
    $date_deb, 
    $date_fin, 
    $supprimer, 
    $commentaire, 
    $etiquette, 
    $file_name, 
    $ville,
    $contact_admin, 
    $id
);

// Exécutez la requête
if (mysqli_stmt_execute($stmt)) {
    http_response_code(200);
    $message['status'] = "Succès. Le restaurant a été mis à jour.";
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
