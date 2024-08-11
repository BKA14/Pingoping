<?php
include "config.php";

$mot = $_GET['term'];


// Obtenir les paramètres de pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 32;
$start = ($page - 1) * $limit;

// Ajoutez les caractères de pourcentage pour la recherche avec LIKE
$searchTerm = "%" . $mot . "%";

// Requête SELECT pour récupérer les données paginées de la table signalisation
$sql = "SELECT * FROM signalisation 
        WHERE 
          id LIKE ? OR 
          iduser LIKE ? OR 
          numuser LIKE ? OR
          heure_signalisation LIKE ? OR
          iduser_admin LIKE ? OR
          CONCAT(nom, ' ', prenom) LIKE ? 
        ORDER BY 
          CASE 
            WHEN statut = 'non' THEN 0
            ELSE 1
          END,
          heure_signalisation DESC
        LIMIT ?, ?";

// Préparer et exécuter la requête
$stmt = $con->prepare($sql);
if ($stmt) {
    // Lier les paramètres à la requête
    $stmt->bind_param("ssssssii", $searchTerm, $searchTerm, $searchTerm, $searchTerm, $searchTerm, $searchTerm, $start, $limit);
    $stmt->execute();
    $result = $stmt->get_result();

    // Initialisez un tableau pour stocker les résultats modifiés
    $modified_rows = array();

    // Parcourez les résultats
    while ($row = $result->fetch_assoc()) {
        // Ajoutez le lien au chemin de l'image pour chaque ligne de résultat
        $row['image'] = "http://$baseUrl/alert/" . $row['image'];
        // Ajoutez la ligne modifiée au tableau de résultats
        $modified_rows[] = $row;
    }
    
    // Renvoie le tableau de résultats modifiés au format JSON
    echo json_encode($modified_rows);

    // Fermez la déclaration
    $stmt->close();
} else {
    // Gestion des erreurs de requête
    echo json_encode(array("error" => $con->error));
}

// Fermez la connexion à la base de données
mysqli_close($con);
