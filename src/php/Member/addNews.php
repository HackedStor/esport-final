<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json");

// Inclure la configuration de la base de données
require '../config/config.php';

try {
    // Vérifiez si un fichier a été téléchargé
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        // Récupérer les détails du fichier
        $fileTmpPath = $_FILES['image']['tmp_name'];
        $fileName = $_FILES['image']['name'];
        $fileSize = $_FILES['image']['size'];
        $fileType = $_FILES['image']['type'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        // Définir le chemin de destination
        // Assurez-vous que ce chemin est correct selon votre structure côté serveur
        $uploadFileDir = '../../actus/';
        $dest_path = $uploadFileDir . $fileName;

        // Déplacer le fichier téléchargé vers le répertoire de destination
        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            // Chemin relatif à partir de la racine du projet frontend
            $imagePath = '/src/actus/' . $fileName;

            // Lire les autres données envoyées
            $title = $_POST['title'];
            $description = $_POST['description'];
            $link = $_POST['link'];
            $date = $_POST['date'];
            $is_visible = 1;
            // Préparer la requête d'insertion
            $sql = "INSERT INTO actus (image, title, description, link, date, is_visible) VALUES (:image, :title, :description, :link, :date, :is_visible)";
            $stmt = $conn->prepare($sql);

            // Lier les paramètres
            $stmt->bindParam(':image', $imagePath);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':link', $link);
            $stmt->bindParam(':date', $date);
            $stmt->bindParam(':is_visible', $is_visible);

            // Exécuter la requête
            if ($stmt->execute()) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["success" => false, "message" => "Erreur lors de l'insertion des données."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Erreur lors du téléchargement de l'image."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Aucune image téléchargée."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erreur: " . $e->getMessage()]);
}
?>