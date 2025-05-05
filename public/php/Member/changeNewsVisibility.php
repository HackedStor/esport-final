<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require('../config/config.php');

session_start();

// Vérifie si la requête est une requête POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupère les données JSON depuis le corps de la requête
    $data = json_decode(file_get_contents('php://input'), true);

    // Vérifie si les données ont été décodées correctement
    if (isset($data['id']) && isset($data['is_visible'])) {
        $id_news = intval($data['id']);
        $is_visible = intval($data['is_visible']);

        // Vérifie que l'ID est valide et que la valeur de is_visible est 0 ou 1
        if ($id_news > 0 && ($is_visible === 0 || $is_visible === 1)) {
            try {
                // Mise à jour de la visibilité de l'actualité
                $stmt = $conn->prepare("UPDATE actus SET is_visible = :is_visible WHERE id = :id");
                $stmt->bindParam(':is_visible', $is_visible, PDO::PARAM_INT);
                $stmt->bindParam(':id', $id_news, PDO::PARAM_INT);

                if ($stmt->execute()) {
                    // Envoie une réponse de succès
                    echo json_encode(["status" => "success", "message" => "Visibilité de l'actualité mise à jour avec succès"]);
                } else {
                    // Envoie une réponse d'erreur
                    echo json_encode(["status" => "error", "message" => "Erreur de base de données lors de la mise à jour de la visibilité"]);
                }
            } catch (PDOException $e) {
                // Envoie une réponse d'erreur en cas d'échec de la requête
                echo json_encode(["status" => "error", "message" => "Erreur de base de données : " . $e->getMessage()]);
            }
        } else {
            // Envoie une réponse d'erreur pour une ID ou une valeur de is_visible invalide
            echo json_encode(["status" => "error", "message" => "ID ou valeur de visibilité invalide"]);
        }
    } else {
        // Envoie une réponse d'erreur si les données ne sont pas fournies
        echo json_encode(["status" => "error", "message" => "Données non fournies"]);
    }
} else {
    // Envoie une réponse d'erreur pour une méthode HTTP non supportée
    echo json_encode(["status" => "error", "message" => "Méthode de requête non supportée"]);
}
?>
