<?php 
include "config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Vérifier si le champ 'user_id' est présent
$user_id = $data['user_id'];

if (isset($user_id, $data['items'])) {
    foreach ($data['items'] as $item) {
        // Vérifier que 'plat_id' et 'quantity' sont présents pour chaque item
        if (isset($item['plat_id']) && isset($item['quantity'])) {
            $id = trim($item['plat_id']);
            $quantity = trim($item['quantity']);
            
            // Validation de la quantité pour s'assurer qu'elle est un entier positif
            if (!is_numeric($quantity) || intval($quantity) < 0) {
                echo json_encode(['error' => 'La quantité doit être un entier positif.']);
                exit();
            }

            try {
                // Préparer la requête pour mettre à jour la quantité dans le panier pour un utilisateur spécifique
                $query = $con->prepare("UPDATE panier SET quantity = ? WHERE plat_id = ? AND user_id = ?");
                $query->bind_param('iss', $quantity, $id, $user_id); 

                $query->execute();

                if ($query->affected_rows > 0) {
                    // Vous pouvez accumuler les succès pour renvoyer un message global
                    $response[] = ['plat_id' => $id, 'status' => 'Quantité mise à jour'];
                } else {
                    $response[] = ['plat_id' => $id, 'error' => 'Aucun article trouvé ou mise à jour non nécessaire'];
                }
            } catch (Exception $e) {
                $response[] = ['plat_id' => $id, 'error' => $e->getMessage()];
            }
        } else {
            $response[] = ['error' => 'Données invalides pour un item'];
        }
    }
    // Retourner le résultat au format JSON
    echo json_encode($response);
} else {
    echo json_encode(['error' => 'Données invalides']);
}

$con->close();
