<?php
include "config.php";


$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Vérifier si les champs 'id' et 'statut' sont présents
$id = $data['id'] ?? null;
$statut = $data['statut'] ?? null;


if ($id && $statut) {
    try {
        $query = $con->prepare("UPDATE commandes SET statut = ? WHERE id = ?");
        $query->bind_param('si', $statut, $id);
        $query->execute();

        if ($query->affected_rows > 0) {
            echo json_encode(['success' => 'Statut mis à jour']);
        } else {
            echo json_encode(['error' => 'Aucune commande trouvée']);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Données invalides']);
}

$con->close();
