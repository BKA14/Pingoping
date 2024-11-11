<?php
include "config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

// Obtenir les paramètres de pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 12;
$start = ($page - 1) * $limit;

// Requête SELECT pour récupérer les données paginées de la table restorant
$sql = "SELECT p.*, 
       COUNT(el.id) AS likes_count,
       GROUP_CONCAT(el.iduser) AS user_ids
FROM restaurant p
LEFT JOIN etatdelikes_resto el ON p.id = el.id_resto AND el.etat = 'oui'
GROUP BY p.id
ORDER BY (CASE WHEN rang = 0 THEN heure_ajout END) ASC, 
         (CASE WHEN rang != 0 THEN rang END) DESC, 
         heure_ajout ASC 
LIMIT $start, $limit";


$result = mysqli_query($con, $sql);

// Vérifiez si la requête a renvoyé des résultats
if ($result) {
    // Initialisez un tableau pour stocker les résultats modifiés
    $modified_rows = array();

    // Parcourez les résultats
    while ($row = mysqli_fetch_assoc($result)) {
        // Ajoutez le lien au chemin de l'image pour chaque ligne de résultat
        $row['image'] =$url_resto . $row['image'];

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

// Fermez la connexion à la base de données
mysqli_close($con);
