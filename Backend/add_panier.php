<?php
include "config.php"; // Inclusion du fichier de configuration pour la connexion à la base de données
include 'auth_admin.php'; // Inclure le fichier d'authentification admin

// Appel de la fonction pour vérifier le token et le grade
$userData = verifyAdminToken();

// Récupérer les données JSON depuis la requête POST
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Vérifier si toutes les données nécessaires sont fournies dans la requête POST
if (isset($data['user_id']) && isset($data['plat_id']) && isset($data['quantity'])) {
    // Récupération des données envoyées par le client
    $user_id = $data['user_id'];
    $plat_id = $data['plat_id'];
    $nom_restaurant = $data['nom_restaurant'];
    $nom_plat = $data['nom_plat'];
    $prix = $data['prix'];
    $quantity = $data['quantity'];

    // Générer un identifiant unique pour le panier (CHAR 32)
    $id = bin2hex(random_bytes(16)); // Génère un identifiant de 32 caractères hexadécimaux

    // Préparer la requête SQL pour insérer les données dans la table panier
    $stmt = $con->prepare("INSERT INTO `panier` (id, user_id, plat_id, quantity, nom_restaurant, nom_plat, prix) VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    // Vérifier si la préparation de la requête a réussi
    if ($stmt === false) {
        http_response_code(500); // Erreur interne du serveur
        echo json_encode(["error" => "Erreur lors de la préparation de la requête"]);
        exit;
    }
    
    // Lier les paramètres à la requête préparée (id en string, user_id et plat_id en int, quantity en int)
    $stmt->bind_param('sssssss', $id, $user_id, $plat_id, $quantity, $nom_restaurant, $nom_plat, $prix);

    // Exécuter la requête et vérifier si l'insertion a réussi
    if ($stmt->execute()) {
        // Si l'insertion est réussie, retourner un message de succès avec l'ID généré
        http_response_code(200); // Succès
        echo json_encode([
            "success" => true,
            "message" => "L'article a été ajouté au panier avec succès",
            "panier_id" => $id
        ]);
    } else {
        // Si l'insertion échoue, retourner un message d'erreur
        http_response_code(500); // Erreur interne du serveur
        echo json_encode(["error" => "Erreur lors de l'ajout au panier"]);
    }

    // Fermer la requête préparée
    $stmt->close();
} else {
    // Si des données sont manquantes dans la requête POST
    http_response_code(400); // Mauvaise requête
    echo json_encode(["error" => "Données manquantes (user_id, plat_id, quantity)"]);
}

// Gérer les erreurs de connexion ou autres erreurs MySQL
if ($con->error) {
    // En mode production, ne pas afficher les erreurs MySQL directement
    http_response_code(500); // Erreur interne du serveur
    echo json_encode(["error" => "Erreur interne du serveur"]);
}

// Fermer la connexion à la base de données
$con->close();
