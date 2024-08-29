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
    $stmt = $conn->prepare("SELECT id, map_name, score, date_created FROM mk_stats ORDER BY date_created ASC");
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $chartData = [];

    foreach ($results as $row) {
        $dateString = $row['date_created'];
        $date = new DateTime($dateString);
        
        // Remplace strftime par format
        $formattedDate = $date->format('d F Y');
        
        // Pour traduire le mois en français
        $months = [
            'January' => 'janvier',
            'February' => 'février',
            'March' => 'mars',
            'April' => 'avril',
            'May' => 'mai',
            'June' => 'juin',
            'July' => 'juillet',
            'August' => 'août',
            'September' => 'septembre',
            'October' => 'octobre',
            'November' => 'novembre',
            'December' => 'décembre'
        ];
        $formattedDate = strtr($formattedDate, $months);
        

        // Ajout des données formatées à chartData
        $chartData[] = [
            'id' => $row['id'],
            'map_name' => $row['map_name'],
            'date_created' => $formattedDate,
            'score' => $row['score']
        ];
    }

    // Retourner les données au format JSON
    echo json_encode($chartData);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
