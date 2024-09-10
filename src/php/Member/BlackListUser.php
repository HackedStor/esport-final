<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json");

require '../config/config.php';

$input = json_decode(file_get_contents("php://input"), true);

if (isset($input['userId'])) {
    $userId = $input['userId'];

    // Requête pour ajouter l'utilisateur à la liste noire
    $sql = "INSERT INTO `blacklist` (`user_id`) VALUES (:userId)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([':userId' => $userId]);

    if ($stmt->rowCount() > 0) {
        // Suppression de l'utilisateur des tables `crn1` et `crn2`
        $sql = "DELETE crn1, crn2 
                FROM crn1 
                LEFT JOIN crn2 ON crn2.user_id = crn1.user_id 
                WHERE crn1.user_id = :userId OR crn2.user_id = :userId";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute([':userId' => $userId]);

        if ($stmt->rowCount() > 0) {
            echo json_encode([
                "success" => true,
                "userId" => $userId,
                "message" => "L'utilisateur a bien été inscrit sur la liste noire et supprimé des tables crn1 et crn2"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "userId" => $userId,
                "message" => "Une erreur est survenue lors de la suppression de l'utilisateur des tables crn1 et crn2"
            ]);
        }
    } else {
        echo json_encode([
            "success" => false,
            "userId" => $userId,
            "message" => "Une erreur est survenue lors de l'inscription sur la liste noire"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Aucun ID d'utilisateur reçu."
    ]);
}
?>
