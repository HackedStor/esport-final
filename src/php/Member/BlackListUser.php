<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json");

require '../config/config.php';

// Récupérer les données envoyées via POST
$input = json_decode(file_get_contents("php://input"), true);

if (isset($input['userId'])) {
    $userId = $input['userId'];

    



    // Retourner l'ID en JSON
    echo json_encode([
        "success" => true,
        "userId" => $userId
    ]);
} else {
    // Gérer le cas où l'ID n'est pas envoyé
    echo json_encode([
        "success" => false,
        "message" => "Aucun ID d'utilisateur reçu."
    ]);
}
?>
