<?php
// En-têtes pour les requêtes CORS et JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once '../config/config.php';



// Connexion à la base de données via PDO
try {

    $sql = "
    SELECT * FROM (
        SELECT 'CRN1' AS table_name, id, user_id, nom, prenom, classe, date FROM crn1

        UNION ALL

        SELECT 'CRN2' AS table_name, id, user_id, nom, prenom, classe, date FROM crn2
    ) AS combined_results ORDER BY STR_TO_DATE(date, '%Y-%m-%d') ASC;
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

