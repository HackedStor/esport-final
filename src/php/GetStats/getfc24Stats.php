<?php
session_start();

// Configurer les en-têtes CORS
header("Access-Control-Allow-Origin: *"); // Autoriser tous les domaines
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Gérer les requêtes préliminaires (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require('../config/config.php');

try {
    $stmt = $conn->prepare("SELECT id, score, other_team_score, date_created FROM fc24_stats ORDER BY date_created ASC");
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $chartData = [];

    foreach ($results as $row) {
        // Calcul du winrate
        $winrate = $row['score'] > $row['other_team_score'] ? 10 : 0;

        // Ajout des données formatées à chartData
        $chartData[] = [
            'game' => $row['id'],
            'winrate' => $winrate
        ];
    }

    // Retourner les données au format JSON
    echo json_encode($chartData);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
