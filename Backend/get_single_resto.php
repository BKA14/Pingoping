<?php
include "config.php"; // Inclusion du fichier de configuration pour la connexion à la base de données
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

$data = array(); // Tableau pour stocker les données retournées

// Vérifiez si un ID a été fourni dans la requête GET
if (isset($_GET['id'])) {
    $id = $_GET['id']; // Récupération de l'ID fourni

    // Préparez la requête SQL pour éviter les injections SQL
    $stmt = $con->prepare("SELECT * FROM `restaurant` WHERE `id` = ? LIMIT 1");
    
    // Liez le paramètre (ici un string, car l'ID est de type VARCHAR)
    $stmt->bind_param('s', $id); 
    
    // Exécutez la requête préparée
    if ($stmt->execute()) {
        // Obtenez le résultat de la requête
        $result = $stmt->get_result();

        // Si des données sont trouvées, les récupérer
        if ($result->num_rows > 0) {
            // Récupérez les données et stockez-les dans le tableau $data
            while ($row = $result->fetch_object()) {
                $data[] = $row;
            }

            // Retournez les données au format JSON
            echo json_encode($data);
        } else {
            // Si aucun résultat n'est trouvé, retournez un message d'erreur
            echo json_encode(["error" => "Aucun restaurant trouvé avec cet ID"]);
        }

        // Libérez la mémoire et fermez la déclaration préparée
        $result->free();
    } else {
        // Gérer les erreurs d'exécution de la requête
        echo json_encode(["error" => "Erreur lors de l'exécution de la requête"]);
    }

    // Fermer la requête préparée
    $stmt->close();
} else {
    // Si aucun ID n'est fourni, retournez un message d'erreur
    echo json_encode(["error" => "ID manquant dans la requête"]);
}

// Gérer les erreurs de connexion ou autres erreurs MySQL
if ($con->error) {
    // En mode production, évitez d'afficher les erreurs MySQL directement
    // echo $con->error; // Désactivez cela en production
    echo json_encode(["error" => "Erreur interne du serveur"]);
}

// Fermer la connexion à la base de données
$con->close();
