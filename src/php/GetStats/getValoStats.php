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
    $stmt = $conn->prepare("SELECT id, kda, score, other_team_score, date_created FROM valorant_stats ORDER BY date_created ASC");
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $chartData = [];

    foreach ($results as $row) {
        // Extraction des kills, assists et deaths depuis la colonne kda
        list($kills, $assists, $deaths) = explode('/', $row['kda']);

        // Calcul du KDA
        $kda = ($kills + $assists) / $deaths;
        // $kda = $row['kda'];

        // Calcul du winrate
        $winrate = $row['score'] > $row['other_team_score'] ? 200 : 0;

        // Ajout des données formatées à chartData
        $chartData[] = [
            'game' => $row['id'],
            'kda' => $kda,
            'winrate' => $winrate
        ];
    }

    // Retourner les données au format JSON
    echo json_encode($chartData);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
