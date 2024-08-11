<?php
include "config.php";
$message = array();

// Vérifie si un fichier a été envoyé
if ($_FILES['photo']) {
    $file_name = $_FILES['photo']['name'];
    $file_tmp = $_FILES['photo']['tmp_name'];

    // Spécifiez le chemin où vous souhaitez enregistrer le fichier sur votre serveur
    $target_path = "http://192.168.1.75/imagepub/" . $file_name;

    // Déplacez le fichier vers le chemin spécifié
    if (move_uploaded_file($file_tmp, $target_path)) {
        // Vous pouvez également ajouter d'autres informations sur le fichier si nécessaire
        $size = $_FILES['photo']['size'];

        // Enregistrez le chemin du fichier et d'autres informations dans votre base de données
        $q = mysqli_query($con, "INSERT INTO `pub` (`photo`, `size`) VALUES ('$target_path', '$size')");

        if ($q) {
            http_response_code(201);
            $message['status'] = "Success";
        } else {
            http_response_code(422);
            $message['status'] = "Error";
        }
    } else {
        http_response_code(422);
        $message['status'] = "Error moving file";
    }
} else {
    http_response_code(422);
    $message['status'] = "No file uploaded";
}

echo json_encode($message);
echo mysqli_error($con);
