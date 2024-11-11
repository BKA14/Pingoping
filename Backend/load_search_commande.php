<?php
include "config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

// Activer l'affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Récupérer le terme de recherche
$term = $_GET['term'] ?? ''; // Le terme saisi dans la barre de recherche

// Obtenir les paramètres de pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 12;
$start = ($page - 1) * $limit;

// Construire la requête SQL pour joindre les tables `commandes` et `commande_plats`
$sql = "
    SELECT c.id AS commande_id, c.total, c.date_commande, c.nom_user, c.prenom_user, c.contact_user, c.latitude, c.longitude, c.statut,
           cp.nom_plat, cp.nom_restaurant, cp.quantity
    FROM commandes c
    JOIN commande_plats cp ON c.id = cp.commande_id
    WHERE 1=1";

// Ajouter la condition de recherche si un terme est fourni
$bindings = [];
if (!empty($term)) {
    $sql .= " AND (CAST(c.id AS CHAR) LIKE ? 
                   OR LOWER(c.contact_user) LIKE LOWER(?) 
                   OR LOWER(c.nom_user) LIKE LOWER(?) 
                   OR LOWER(c.prenom_user) LIKE LOWER(?) 
                   OR LOWER(c.statut) LIKE LOWER(?) 
                   OR CONCAT(LOWER(c.prenom_user), ' ', LOWER(c.nom_user)) LIKE LOWER(?))";
    $term_formatted = '%' . strtolower($term) . '%';
    $bindings = [$term_formatted, $term_formatted, $term_formatted, $term_formatted, $term_formatted];
}

// Ajouter l'ordre de tri et les limites de pagination
$sql .= " ORDER BY c.date_commande DESC LIMIT ?, ?";
$bindings[] = $start;
$bindings[] = $limit;

// Préparer la requête
$stmt = $con->prepare($sql);

// Vérifier si la préparation de la requête a réussi
if (!$stmt) {
    die(json_encode(array("error" => "Erreur de préparation de la requête : " . $con->error)));
}

// Lier les paramètres dynamiquement
$types = str_repeat('s', count($bindings) - 2) . 'ii'; // 's' pour les chaînes, 'ii' pour start et limit
$stmt->bind_param($types, ...$bindings);

// Exécuter la requête
if (!$stmt->execute()) {
    die(json_encode(array("error" => "Erreur lors de l'exécution de la requête : " . $stmt->error)));
}

// Obtenir les résultats
$result = $stmt->get_result();

$orders = [];

// Organiser les commandes par commande_id
while ($row = $result->fetch_assoc()) {
    $commande_id = $row['commande_id'];

    // Si la commande n'a pas encore été ajoutée à la liste, la créer
    if (!isset($orders[$commande_id])) {
        $orders[$commande_id] = [
            'commande_id' => $commande_id,
            'total' => $row['total'],
            'date_commande' => $row['date_commande'],
            'nom_user' => $row['nom_user'],
            'prenom_user' => $row['prenom_user'],
            'contact_user' => $row['contact_user'],
            'latitude' => $row['latitude'],
            'longitude' => $row['longitude'],
            'statut' => $row['statut'],
            'plats' => [] // Initialiser la liste des plats pour chaque commande
        ];
    }

    // Ajouter les plats pour chaque commande
    $orders[$commande_id]['plats'][] = [
        'nom_plat' => $row['nom_plat'],
        'nom_restaurant' => $row['nom_restaurant'],
        'quantity' => $row['quantity']
    ];
}

// Envoyer le résultat sous forme de JSON
echo json_encode(array_values($orders));

// Fermer la connexion à la base de données
$con->close();
