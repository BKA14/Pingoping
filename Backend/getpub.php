<?php
include "config.php";

// Définir le fuseau horaire à UTC+0
date_default_timezone_set('UTC');

// Récupérer la date actuelle
$currentDate = date("Y-m-d\TH:i:s");

// Obtenir les paramètres de pagination et les valider
$page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
$limit = isset($_GET['limit']) ? max(1, min(100, (int)$_GET['limit'])) : 20; // Limitez à 100 pour éviter les abus
$start = ($page - 1) * $limit;

// Définir le fuseau horaire de MySQL à UTC+0
mysqli_query($con, "SET time_zone = '+00:00'");

// Requête SQL sécurisée avec une requête préparée pour la pagination
$sql = "
SELECT p.*, 
       COUNT(el.id) AS likes_count,
       GROUP_CONCAT(el.iduser) AS user_ids,
       IF(p.date = 'non' OR p.datefin = 'non', 'non', 
          IF(NOW() < STR_TO_DATE(p.date, '%Y-%m-%dT%H:%i:%s') 
             AND STR_TO_DATE(p.date, '%Y-%m-%dT%H:%i:%s') < STR_TO_DATE(p.datefin, '%Y-%m-%dT%H:%i:%s'), 
             CONCAT(
                 FLOOR(TIMESTAMPDIFF(SECOND, NOW(), STR_TO_DATE(p.date, '%Y-%m-%dT%H:%i:%s')) / 86400), 'J - ', 
                 MOD(FLOOR(TIMESTAMPDIFF(SECOND, NOW(), STR_TO_DATE(p.date, '%Y-%m-%dT%H:%i:%s')) / 3600), 24), 'h - ', 
                 MOD(FLOOR(TIMESTAMPDIFF(SECOND, NOW(), STR_TO_DATE(p.date, '%Y-%m-%dT%H:%i:%s')) / 60), 60), 'm avant le début'),
             IF(NOW() < STR_TO_DATE(p.datefin, '%Y-%m-%dT%H:%i:%s') 
                AND STR_TO_DATE(p.date, '%Y-%m-%dT%H:%i:%s') < STR_TO_DATE(p.datefin, '%Y-%m-%dT%H:%i:%s'),
                'Événement en cours!',
                IF(STR_TO_DATE(p.datefin, '%Y-%m-%dT%H:%i:%s') < STR_TO_DATE(p.date, '%Y-%m-%dT%H:%i:%s'), 
                   'Événement terminé',
                   'non'
                )
             )
          )
       ) AS countdown
FROM pub p
LEFT JOIN etatdelikes el ON p.id = el.idpub AND el.etat = 'oui'
GROUP BY p.id
ORDER BY p.rangpub ASC
LIMIT ?, ?;
";

// Préparer la requête
$stmt = mysqli_prepare($con, $sql);

// Vérifier si la préparation a réussi
if ($stmt) {
    // Binder les paramètres
    mysqli_stmt_bind_param($stmt, "ii", $start, $limit);

    // Exécuter la requête
    mysqli_stmt_execute($stmt);

    // Récupérer le résultat
    $result = mysqli_stmt_get_result($stmt);

    // Vérifier si des résultats ont été renvoyés
    if ($result) {
        // Initialisez un tableau pour stocker les résultats modifiés
        $modified_rows = array();

        // Parcourez les résultats
        while ($row = mysqli_fetch_assoc($result)) {
            // Ajoutez le lien au chemin de la photo pour chaque ligne de résultat
            $row['photo'] = "http://$baseUrl/videopub/" . $row['photo'];

            // Convertir likes_count en entier
            $row['likes_count'] = (int) $row['likes_count'];

            // Convertir user_ids en tableau
            $row['user_ids'] = $row['user_ids'] ? explode(',', $row['user_ids']) : [];

            // Ajoutez la ligne modifiée au tableau de résultats
            $modified_rows[] = $row;
        }

        // Renvoie le tableau de résultats modifiés au format JSON
        echo json_encode($modified_rows);
    } else {
        // Gestion des erreurs de requête
        echo json_encode(array("error" => mysqli_error($con)));
    }

    // Fermer le résultat
    mysqli_stmt_close($stmt);
} else {
    // Gestion des erreurs de préparation
    echo json_encode(array("error" => mysqli_error($con)));
}

// Fermez la connexion à la base de données
mysqli_close($con);
