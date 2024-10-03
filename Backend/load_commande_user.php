<?php 
include "config.php";

// Obtenir les paramètres de pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 12;
$start = ($page - 1) * $limit;

// Récupérer l'ID utilisateur de la requête
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($id === null) {
    echo json_encode(['error' => 'L\'ID de l\'utilisateur est manquant.']);
    exit;
}

try {
    // Requête pour récupérer toutes les commandes et leurs détails pour un utilisateur spécifique
    $query = $con->prepare("
        SELECT c.id AS commande_id, c.total, c.date_commande, c.nom_user, c.prenom_user, c.contact_user, c.statut,  
               cp.nom_plat, cp.nom_restaurant, cp.quantity
        FROM commandes c
        JOIN commande_plats cp ON c.id = cp.commande_id
        WHERE c.user_id = ?
        ORDER BY c.date_commande DESC
        LIMIT ?, ?");

    // Lier les paramètres pour éviter les injections SQL
    $query->bind_param('iii', $id, $start, $limit);

    // Exécuter la requête
    $query->execute();
    $result = $query->get_result();

    $orders = [];

    // Organiser les commandes par commande_id
    while ($row = $result->fetch_assoc()) {
        $commande_id = $row['commande_id']; // Utilisation correcte de l'ID de la commande

        // Si la commande n'a pas encore été ajoutée à la liste, la créer
        if (!isset($orders[$commande_id])) {
            $orders[$commande_id] = [
                'total' => $row['total'],
                'date_commande' => $row['date_commande'],
                'nom_user' => $row['nom_user'],
                'prenom_user' => $row['prenom_user'],
                'contact_user' => $row['contact_user'],
                'statut' => $row['statut'],
                'contact_service' => '0022674443434', // Contact service ajouté manuellement
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

} catch (Exception $e) {
    // Gérer les erreurs en cas d'échec de la requête
    echo json_encode(['error' => $e->getMessage()]);
}

// Fermer la connexion à la base de données
$con->close();
