<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once 'config/config.php';

try {
    $stmt = $conn->prepare("SELECT * FROM actus ORDER BY date DESC");
    $stmt->execute();
    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($news);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
