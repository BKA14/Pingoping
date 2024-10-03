<?php
include "config.php";
$input = json_decode(file_get_contents('php://input'), true);

$cart = $input['cart'];
$total = $input['total'];
$user = $input['user'];
$location = $input['location'];

// Vérifier si l'utilisateur existe
$stmt_check_user = $con->prepare("SELECT id, nom, prenom, contact FROM user WHERE id = ?");
$stmt_check_user->bind_param("s", $user['id']); 
$stmt_check_user->execute();
$result = $stmt_check_user->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['error' => 'L\'utilisateur avec cet ID n\'existe pas.']);
    $stmt_check_user->close();
    $con->close();
    exit();
}

// Récupérer les informations de l'utilisateur
$user_data = $result->fetch_assoc();
$nom_user = $user_data['nom'];
$prenom_user = $user_data['prenom'];
$contact_user = $user_data['contact'];

// Préparer la requête pour insérer la commande avec nom, prénom, contact et coordonnées
$stmt = $con->prepare("INSERT INTO commandes (user_id, total, date_commande, nom_user, prenom_user, contact_user, latitude, longitude) 
                       VALUES (?, ?, NOW(), ?, ?, ?, ?, ?)");
$stmt->bind_param("sdsssdd", $user['id'], $total, $nom_user, $prenom_user, $contact_user, $location['latitude'], $location['longitude']); 

if (!$stmt->execute()) {
    echo json_encode(['error' => 'Erreur lors de l\'enregistrement de la commande']);
    $stmt->close();
    $con->close();
    exit();
}

// Récupérer l'ID généré pour la commande
$commande_id = $stmt->insert_id;

// Préparer la requête pour insérer les plats commandés
$stmt_plat = $con->prepare("INSERT INTO commande_plats (commande_id, plat_id, quantity, nom_plat, nom_restaurant) 
                             VALUES (?, ?, ?, ?, ?)");

foreach ($cart as $plat) {
    $plat_id = $plat['plat_id'];
    $quantity = $plat['quantity'];
    $nom_plat = $plat['nom_plat'];
    $nom_restaurant = $plat['nom_restaurant'];

    // Lier les paramètres - ajustement des types (commande_id est un entier, quantity est probablement aussi un entier)
    $stmt_plat->bind_param("issss", $commande_id, $plat_id, $quantity, $nom_plat, $nom_restaurant);

    // Exécuter la requête pour chaque plat
    if (!$stmt_plat->execute()) {
        echo json_encode(['error' => 'Erreur lors de l\'enregistrement des plats']);
        $stmt_plat->close();
        $con->close();
        exit();
    }
}

// Fermer les requêtes préparées
$stmt->close();
$stmt_plat->close();

// Réponse JSON en cas de succès
echo json_encode(['message' => 'Commande enregistrée', 'commande_id' => $commande_id]);

$con->close();
