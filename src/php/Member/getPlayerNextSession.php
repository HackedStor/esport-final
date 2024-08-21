<?php
// En-têtes pour les requêtes CORS et JSON
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once '../config/config.php';


// Connexion à la base de données via PDO
try {

    // Requête pour récupérer les utilisateurs de la date la plus proche dans les deux tables
    $sql = "
        SELECT * FROM (
            SELECT * FROM crn1
            UNION ALL
            SELECT * FROM crn2
        ) AS combined
        ORDER BY STR_TO_DATE(date, '%d-%m-%Y') DESC
        LIMIT 1
    ";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retourner les résultats en format JSON
    echo json_encode($result);

} catch(PDOException $e) {
    echo json_encode(["error" => "ERREUR : Impossible de se connecter. " . $e->getMessage()]);
}
?>
