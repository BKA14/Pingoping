<?php
include "config.php";

// Récupérer les paramètres de requête avec un fallback par défaut
$id = $_GET['id'] ?? '';
$datefin = $_GET['datefin'] ?? '';
$datedeb = $_GET['datedeb'] ?? '';
$service = $_GET['service'] ?? '';
$categorie = $_GET['categorie'] ?? '';

// Obtenir les paramètres de pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 32;
$start = ($page - 1) * $limit;

// Vérifier si l'ID utilisateur est vide
if (!$id) {
    die(json_encode(array("error" => "ID utilisateur manquant")));
}

// Construire dynamiquement la requête SELECT
$sql = "SELECT * FROM signalisation WHERE 1=1";
$params = [];
$types = '';

// Ajouter des conditions dynamiquement en fonction des valeurs
if ($datedeb && $datefin) {
    $sql .= " AND heure_signalisation BETWEEN ? AND ?";
    $params[] = $datedeb;
    $params[] = $datefin;
    $types .= 'ss';
}

if ($service) {
    $sql .= " AND LOWER(service) LIKE LOWER(?)";
    $params[] = '%' . strtolower($service) . '%';
    $types .= 's';
}

if ($categorie) {
    $sql .= " AND LOWER(statut) LIKE LOWER(?)";
    $params[] = '%' . strtolower($categorie) . '%';
    $types .= 's';
}

// Ajouter la condition pour l'ID utilisateur
$sql .= " AND iduser = ?";
$params[] = $id;
$types .= 'i';

// Ajouter l'ordre de tri et les limites de pagination
$sql .= " ORDER BY 
          CASE 
            WHEN LOWER(statut) = 'non' THEN 0
            ELSE 1
          END,
          heure_signalisation DESC
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
    // Initialisez un tableau pour stocker les résultats modifiés
    $modified_rows = array();

    // Parcourez les résultats
    while ($row = $result->fetch_assoc()) {
        // Ajoutez le lien au chemin de l'image pour chaque ligne de résultat
        $row['image'] =  $url_alert . $row['image'];
        // Ajoutez la ligne modifiée au tableau de résultats
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
