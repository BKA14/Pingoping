<?php
include "config.php";
include 'auth_admin.php'; // Inclure le fichier d'authentification admin

// Appel de la fonction pour vérifier le token et le grade
$userData = verifyAdminToken();

// Obtenez l'ID de la pub à modifier 
$id_pub = $_POST['id_pub'];

// Autres données du formulaire non fichier
$titre = $_POST['titre'];
$commentaire = $_POST['commentaire'];
$rangpub = $_POST['rangpub'];
$contact = $_POST['contact'];
$longitude = $_POST['longitude'];
$latitude = $_POST['latitude'];
$datePublication = $_POST['datePublication'];
$datefin = $_POST['datefin'];
$admin = $_POST['admin'];


// Initialisez une variable pour stocker le chemin du fichier (qui peut être modifié si un nouveau fichier est téléchargé)
$target_path = "";

// Vérifiez si un fichier a été téléchargé
if (isset($_POST['photo']) && strtolower(trim($_POST['photo'])) == 'non') {
    // Aucun fichier sélectionné, pas de traitement supplémentaire nécessaire
} elseif (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    $file_tmp = $_FILES['photo']['tmp_name'];


    function generateRandomString($length) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randomString;
    }


    // Générez un nom de fichier unique
    $file_name = generateRandomString(20) . "." . pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);


    // Spécifiez le chemin cible où vous souhaitez enregistrer le fichier sur votre serveur
    $target_path = "C:/xampp/htdocs/videopub/" . $file_name;

    // Déplacez le fichier téléchargé vers le chemin spécifié
    if (!move_uploaded_file($file_tmp, $target_path)) {
        // Gérer les erreurs côté serveur
        http_response_code(422);
        $message['status'] = "Error moving file";
        echo json_encode($message);
        exit;
    }
}

// Construisez la requête SQL en fonction de la présence ou de l'absence d'un nouveau fichier
$sql = "UPDATE `pub` SET `titre`=?, `commentaire`=?, `rangpub`=?, `contact`=?, `longitude`=?, `latitude`=?, `date`=?, `datefin`=?, `admin`=?";
$types = "sssssssss";
$params = [$titre, $commentaire, $rangpub, $contact, $longitude, $latitude, $datePublication, $datefin, $admin];

if (isset($_POST['photo']) && strtolower(trim($_POST['photo'])) == 'non') {
    $sql .= ", `photo`='non'";
} elseif (!empty($target_path)) {
    // Si un nouveau fichier a été téléchargé, incluez la colonne `photo` dans la mise à jour
    $sql .= ", `photo`=?";
    $types .= "s";
    $params[] = $file_name;
}

else if (isset($_POST['photo'])){

     // Si l'ancienne photo a ete garder
     $sql .= ", `photo`=?";
     $types .= "s";
     $params[] = $_POST['photo'];
    
}

$sql .= " WHERE `id`=?";
$types .= "s";
$params[] = $id_pub;

// Préparez la requête
$stmt = mysqli_prepare($con, $sql);

// Liez les paramètres
mysqli_stmt_bind_param($stmt, $types, ...$params);

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
