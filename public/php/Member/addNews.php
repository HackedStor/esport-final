<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json");

require '../config/config.php';

try {
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['image']['tmp_name'];
        $fileNameCmps = explode(".", $_FILES['image']['name']);
        $fileExtension = strtolower(end($fileNameCmps));

        // Générer un nom unique pour l'image
        $newFileName = uniqid('image_', true) . '.' . $fileExtension;

        // Chemin de destination
        $uploadFileDir = $_SERVER['DOCUMENT_ROOT'] . '/actus/';
        $dest_path = $uploadFileDir . $newFileName;

        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            // Chemin relatif à partir de la racine du projet frontend
            $imagePath = '/actus/' . $newFileName;

            $title = $_POST['title'];
            $description = $_POST['description'];
            $link = $_POST['link'];
            $date = $_POST['date'];
            $is_visible = 1;

            $sql = "INSERT INTO actus (image, title, description, link, date, is_visible) VALUES (:image, :title, :description, :link, :date, :is_visible)";
            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':image', $imagePath);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':link', $link);
            $stmt->bindParam(':date', $date);
            $stmt->bindParam(':is_visible', $is_visible);

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
