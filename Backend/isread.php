<?php
include "config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

// Récupérer l'ID utilisateur depuis les paramètres GET, en vérifiant que c'est un entier
if (isset($_GET['id'])) {
    $userId = $_GET['id'];
    
    // Préparer la requête pour éviter les injections SQL
    $sql = "SELECT n.* FROM notifications n
            INNER JOIN user_notifications un ON n.id = un.notification_id
            WHERE un.user_id = ? AND un.isread = 0
            ORDER BY n.timestamp ASC";

    // Préparer la requête
    if ($stmt = mysqli_prepare($con, $sql)) {
        // Lier les paramètres
        mysqli_stmt_bind_param($stmt, 's', $userId); // 'i' pour un entier

        // Exécuter la requête
        mysqli_stmt_execute($stmt);

        // Récupérer le résultat
        $result = mysqli_stmt_get_result($stmt);

        // Vérifier si la requête a réussi
        if ($result) {
            $rows = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
            // Retourner le résultat sous forme JSON
            echo json_encode($rows);
        } else {
            // Gestion des erreurs SQL
            echo json_encode(array("error" => "Erreur dans la récupération des notifications."));
        }

        // Fermer la requête préparée
        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(array("error" => "Erreur lors de la préparation de la requête."));
    }

} else {
    echo json_encode(array("error" => "ID utilisateur invalide."));
}

