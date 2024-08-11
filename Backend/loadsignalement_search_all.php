<?php
include "config.php";

// Activer l'affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Récupérer les paramètres de requête avec un fallback par défaut
$datefin = $_GET['datefin'] ?? '';
$datedeb = $_GET['datedeb'] ?? '';
$traitement = $_GET['traitement'] ?? '';

// Obtenir les paramètres de pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 32;
$start = ($page - 1) * $limit;

// Construire dynamiquement la requête SELECT
$sql = "SELECT * FROM signalement WHERE 1=1";
$params = [];
$types = '';

// Ajouter des conditions dynamiquement en fonction des valeurs
if ($datedeb && $datefin) {
    $sql .= " AND heuredusignalement BETWEEN ? AND ?";
    $params[] = $datedeb;
    $params[] = $datefin;
    $types .= 'ss';
}

if ($traitement) {
    $sql .= " AND LOWER(traitement) LIKE LOWER(?)";
    $params[] = '%' . strtolower($traitement) . '%';
    $types .= 's';
}

// Ajouter l'ordre de tri et les limites de pagination
$sql .= " ORDER BY 
          CASE 
            WHEN LOWER(traitement) = 'non' THEN 0
            ELSE 1
          END,
          heuredusignalement DESC
        LIMIT ?, ?";
        
$params[] = $start;
$params[] = $limit;
$types .= 'ii';

// Préparer la requête
$stmt = $con->prepare($sql);

// Vérifier si la préparation de la requête a réussi
if (!$stmt) {
    die(json_encode(array("error" => "Erreur de préparation de la requête : " . $con->error)));
}

// Lier les paramètres
if (!empty($types)) {
    $stmt->bind_param($types, ...$params);
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
    while ($row = $result->fetch_assoc()) {
        // Ajoutez chaque ligne de résultat au tableau
        $modified_rows[] = $row;
    }
    // Renvoie le tableau de résultats modifiés au format JSON
    echo json_encode($modified_rows);
} else {
    // Gestion des erreurs de requête
    echo json_encode(array("error" => "Aucun résultat trouvé"));
}

// Fermez la connexion à la base de données
$stmt->close();
mysqli_close($con);
