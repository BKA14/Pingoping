<?php
include "config.php";

// Obtenir les paramètres de pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 12;
$start = ($page - 1) * $limit;

// Vérifier si l'ID est passé
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Requête SELECT pour récupérer les données paginées de la table plat_restaurant
    $sql = "SELECT *
            FROM plat_restaurant 
            WHERE `id_restaurant` = ?
            ORDER BY (CASE WHEN rang = 0 THEN heure_ajout END) ASC, 
                     (CASE WHEN rang != 0 THEN rang END) DESC, 
                     heure_ajout ASC 
            LIMIT ?, ?";

    // Préparer la requête
    $stmt = mysqli_prepare($con, $sql);

    // Lier les paramètres
    mysqli_stmt_bind_param($stmt, "sii", $id, $start, $limit);

    // Exécuter la requête
    mysqli_stmt_execute($stmt);

    // Obtenir les résultats
    $result = mysqli_stmt_get_result($stmt);

    // Vérifier si des résultats ont été trouvés
    if ($result) {
        // Initialisez un tableau pour stocker les résultats modifiés
        $modified_rows = array();

        // Parcourez les résultats
        while ($row = mysqli_fetch_assoc($result)) {
            // Ajoutez le lien au chemin de l'image pour chaque ligne de résultat
            $row['image'] = "http://$baseUrl/plat_restaurant/" . $row['image'];
            
            // Ajouter la ligne modifiée au tableau de résultats
            $modified_rows[] = $row;
        }

        // Renvoie le tableau de résultats modifiés au format JSON
        echo json_encode($modified_rows);
    } else {
        // Gestion des erreurs si aucun résultat trouvé
        echo json_encode(array("error" => "Aucun résultat trouvé."));
    }

    // Fermer la déclaration préparée
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(array("error" => "ID invalide."));
}

// Fermer la connexion à la base de données
mysqli_close($con);
