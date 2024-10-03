<?php
include "config.php";

// Obtenir les paramètres de pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 30;
$start = ($page - 1) * $limit;

try {
    // Requête pour récupérer toutes les commandes (y compris en attente et en cours de livraison) et leurs détails
    $query = $con->prepare("
        SELECT c.id AS commande_id, c.total, c.date_commande, c.nom_user, c.prenom_user, c.contact_user, c.latitude, c.longitude, c.statut,  
               cp.nom_plat, cp.nom_restaurant, cp.quantity
        FROM commandes c
        JOIN commande_plats cp ON c.id = cp.commande_id
        ORDER BY c.date_commande DESC
        LIMIT ?, ?
    ");

    if (!$query) {
        throw new Exception("Erreur lors de la préparation de la requête principale : " . $con->error);
    }

    // Lier les paramètres pour la pagination
    $query->bind_param('ii', $start, $limit);

    // Exécuter la requête
    if (!$query->execute()) {
        throw new Exception("Erreur lors de l'exécution de la requête principale : " . $query->error);
    }

    // Obtenir le résultat
    $result = $query->get_result();

    // Requête pour obtenir le nombre de commandes "en attente" et "en cours de livraison"
    $pendingQuery = $con->prepare("SELECT 
                                        SUM(CASE WHEN statut = 'en attente' THEN 1 ELSE 0 END) AS pending_count, 
                                        SUM(CASE WHEN statut = 'en cours de livraison' THEN 1 ELSE 0 END) AS delivery_count
                                    FROM commandes
                                    WHERE statut IN ('en attente', 'en cours de livraison')");
    
    if (!$pendingQuery) {
        throw new Exception("Erreur lors de la préparation de la requête pour les commandes 'en attente' et 'en cours de livraison' : " . $con->error);
    }

    // Exécuter la requête pour le nombre de commandes
    if (!$pendingQuery->execute()) {
        throw new Exception("Erreur lors de l'exécution de la requête 'en attente' et 'en cours de livraison' : " . $pendingQuery->error);
    }

    // Obtenir le résultat pour les commandes en attente et en cours de livraison
    $pendingResult = $pendingQuery->get_result();
    $pendingRow = $pendingResult->fetch_assoc();
    $pendingCount = $pendingRow['pending_count']; // Nombre de commandes "en attente"
    $deliveryCount = $pendingRow['delivery_count']; // Nombre de commandes "en cours de livraison"

    // Fermer la requête
    $pendingQuery->close();

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

    // Fermer la requête principale
    $query->close();

    // Envoyer le résultat sous forme de JSON avec le nombre de commandes "en attente" et "en cours de livraison"
    echo json_encode([
        'orders' => array_values($orders),
        'nbr_attente' => $pendingCount,
        'nbr_en_cours' => $deliveryCount
    ]);

} catch (Exception $e) {
    // Gérer les erreurs en cas d'échec de la requête
    echo json_encode(['error' => $e->getMessage()]);
}

// Fermer la connexion à la base de données
$con->close();
