<?php
include "config.php";
include "auth.php"; // Inclure le fichier d'authentification

// Appel de la fonction pour vérifier le token
$userData = verifyToken(); // Cette ligne bloque l'accès si le token est invalide

// Récupérer le mot de recherche depuis les paramètres GET
$mot = $_GET['term'] ?? '';

// Obtenir les paramètres de pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 12;
$start = ($page - 1) * $limit;

// Ajouter les caractères de pourcentage pour la recherche avec LIKE
$searchTerm = "%" . $mot . "%";

// Requête SELECT pour récupérer les données paginées de la table signalisation
$sql = "SELECT * FROM signalement 
        WHERE 
          id LIKE ? OR 
          idcomsignaler LIKE ? OR 
          idusersignaler LIKE ? OR
          heuredusignalement LIKE ? OR
          pubidcomsignaler LIKE ? OR
          CONCAT(nomestsignaler, ' ', prenomestsignaler) LIKE ? OR
          CONCAT(nomsignaleur, ' ', prenomdusignaleur) LIKE ? 
        ORDER BY 
          CASE 
            WHEN traitement = 'non' THEN 0
            ELSE 1
          END,
          heuredusignalement DESC
        LIMIT ?, ?";

// Préparer et exécuter la requête
$stmt = $con->prepare($sql);
if ($stmt) {
    // Lier les paramètres à la requête
    $stmt->bind_param("sssssssii", $searchTerm, $searchTerm, $searchTerm, $searchTerm, $searchTerm, $searchTerm, $searchTerm, $start, $limit);
    $stmt->execute();
    $result = $stmt->get_result();

    // Vérifier si la requête a renvoyé des résultats
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

    // Fermez la déclaration
    $stmt->close();
} else {
    // Gestion des erreurs de requête
    echo json_encode(array("error" => $con->error));
}

// Fermez la connexion à la base de données
mysqli_close($con);
