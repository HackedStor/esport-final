<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require('../config/config.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email'])) {
    echo json_encode(['success' => false, 'message' => 'Email manquant.']);
    exit;
}

$email = $data['email'];

$stmt = $conn->prepare("SELECT id, email, pseudo FROM users WHERE email = :email");
$stmt->execute(['email' => $email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo json_encode(['success' => true, 'id' => $user['id'], 'pseudo' => $user['pseudo']]);
} else {
    echo json_encode(['success' => false, 'message' => 'Utilisateur non trouvé']);
}
?>
