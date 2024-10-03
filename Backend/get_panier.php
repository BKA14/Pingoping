<?php
include "config.php"; // Inclusion du fichier de configuration pour la connexion à la base de données

$data = array(); // Tableau pour stocker les données retournées

// Vérifiez si un ID a été fourni dans la requête GET
if (isset($_GET['id'])) {
    $id = $_GET['id']; // Récupération de l'ID fourni

    // Préparez la requête SQL pour éviter les injections SQL
    $stmt = $con->prepare("SELECT * FROM `panier` WHERE `user_id` = ?");
    
    // Vérifier si la requête préparée a été bien créée
    if ($stmt === false) {
        echo json_encode(["error" => "Erreur lors de la préparation de la requête"]);
        exit;
    }
    
    // Liez le paramètre (ici un string, car l'ID est de type VARCHAR)
    $stmt->bind_param('s', $id); 
    
    // Exécutez la requête préparée
    if ($stmt->execute()) {
        // Obtenez le résultat de la requête
        $result = $stmt->get_result();

        // Si des données sont trouvées, les récupérer
        if ($result->num_rows > 0) {
            // Récupérez les données et stockez-les dans le tableau $data
            $data = $result->fetch_all(MYSQLI_ASSOC); // Fetch all rows as an associative array

            // Retournez les données au format JSON
            echo json_encode($data);
        } else {
            // Si aucun résultat n'est trouvé, retournez un message d'erreur
            echo json_encode(["error" => "Aucun panier trouvé avec cet ID"]);
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

