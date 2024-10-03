<?php
include "config.php";

// Activer l'affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Récupérer les paramètres de requête avec un fallback par défaut
$term = $_GET['term'] ?? '';

// Obtenir les paramètres de pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 12;
$start = ($page - 1) * $limit;

// Construire dynamiquement la requête SELECT
$sql = "SELECT * FROM restaurant WHERE 1=1";

// Si un terme de recherche est fourni, ajouter une condition WHERE
if (!empty($term)) {
    $sql .= " AND (LOWER(nom_resto) LIKE LOWER(?))";
    $term = '%' . strtolower($term) . '%'; // Formatage pour le LIKE
}

// Ajouter l'ordre de tri et les limites de pagination
$sql .= "LIMIT ?, ?";

// Préparer la requête
$stmt = $con->prepare($sql);

// Vérifier si la préparation de la requête a réussi
if (!$stmt) {
    die(json_encode(array("error" => "Erreur de préparation de la requête : " . $con->error)));
}

// Lier les paramètres en fonction de la présence ou non du terme de recherche
if (!empty($term)) {
    // Si un terme de recherche est présent, il y a 3 paramètres à lier
    $stmt->bind_param('sii', $term, $start, $limit);
} else {
    // S'il n'y a pas de terme de recherche, il y a 2 paramètres à lier
    $stmt->bind_param('ii', $start, $limit);
}

// Exécuter la requête
if (!$stmt->execute()) {
    die(json_encode(array("error" => "Erreur lors de l'exécution de la requête : " . $stmt->error)));
}

// Obtenir les résultats
$result = $stmt->get_result();

// Vérifiez si la requête a renvoyé des résultats
if ($result) {
    // Initialisez un tableau pour stocker les résultats
    $modified_rows = array();
    

    // Parcourez les résultats
    while ($row = mysqli_fetch_assoc($result)) {
        // Ajoutez le lien au chemin de l'image pour chaque ligne de résultat
        $row['image'] = "http://$baseUrl/restaurant/" . $row['image'];
        // Ajoutez la ligne modifiée au tableau de résultats
        $modified_rows[] = $row;
    }
    // Renvoie le tableau de résultats modifiés au format JSON
    echo json_encode($modified_rows);
} else {
    // Gestion des erreurs de requête
    echo json_encode(array("error" => "Aucun résultat trouvé"));
}

