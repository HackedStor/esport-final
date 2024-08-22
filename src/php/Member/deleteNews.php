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
    if (isset($data['id'])) {
        $id_news = intval($data['id']);
        
        // Vérifie que l'ID est valide
        if ($id_news > 0) {
            try {
                // Récupère le chemin de l'image avant de supprimer l'actualité
                $stmt = $conn->prepare("SELECT image FROM actus WHERE id = :id");
                $stmt->bindParam(':id', $id_news, PDO::PARAM_INT);
                $stmt->execute();
                $news = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($news && !empty($news['image'])) {
                    $imagePath = '../../..' . $news['image']; // Remplacez 'path_to_images' par le chemin correct
                    // $imagePath = $news['image'];
                    // Supprime l'image du serveur
                    if (file_exists($imagePath)) {
                        unlink($imagePath);
                    }else {
                        var_dump(file_exists($imagePath));
                    }
                }

                // Supprime l'actualité de la base de données
                $stmt = $conn->prepare("DELETE FROM actus WHERE id = :id");
                $stmt->bindParam(':id', $id_news, PDO::PARAM_INT);
                
                if ($stmt->execute()) {
                    // Envoie une réponse de succès
                    echo json_encode(["status" => "success", "message" => "Actualité et image supprimées avec succès", "image_path" => $imagePath]);
                } else {
                    // Envoie une réponse d'erreur
                    echo json_encode(["status" => "error", "message" => "Erreur de base de données : suppression de l'actualité"]);
                }
            } catch (PDOException $e) {
                // Envoie une réponse d'erreur en cas d'échec de la requête
                echo json_encode(["status" => "error", "message" => "Erreur de base de données : " . $e->getMessage()]);
            }
        } else {
            // Envoie une réponse d'erreur pour une ID invalide
            echo json_encode(["status" => "error", "message" => "ID de l'actualité invalide"]);
        }
    } else {
        // Envoie une réponse d'erreur si l'ID n'est pas fourni
        echo json_encode(["status" => "error", "message" => "Pas d'identification de l'actualité fournie"]);
    }
} else {
    // Envoie une réponse d'erreur pour une méthode HTTP non supportée
    echo json_encode(["status" => "error", "message" => "Méthode de requête non supportée"]);
}
?>