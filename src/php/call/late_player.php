<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
include('../config/config.php');

// Récupère l'ID utilisateur
$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['userId'];

$status = 'Late'; // Modifier ce paramètre selon le fichier : 'Présent', 'Absent', 'Retard'

// Mets à jour le statut du joueur
$query = "UPDATE users SET status = :status WHERE id = :id";
$stmt = $conn->prepare($query);
$stmt->bindParam(':status', $status);
$stmt->bindParam(':id', $userId);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Statut mis à jour.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Échec de la mise à jour du statut.']);
}
?>
