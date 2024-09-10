<?php
// insert_valorant_stats.php
session_start();

// Configurer les en-têtes CORS
header("Access-Control-Allow-Origin: *"); // Remplacez par le domaine de votre front-end
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Gérer les requêtes préliminaires (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require('../../config/config.php'); // Assurez-vous que ce fichier contient les paramètres de connexion à la base de données

// Lire le corps de la requête
$input = file_get_contents('php://input');

// Décoder le JSON reçu
$data = json_decode($input, true);

$response = [];

if ($data) {
    // Valider les données
    if (isset($data['user_id']) && isset($data['champion_name']) && isset($data['champion_class']) && isset($data['kda']) && isset($data['score']) && isset($data['otherTeamScore'])) {
        try {
            // Préparer une requête SQL pour insérer les données
            $stmt = $conn->prepare("INSERT INTO lol_stats (user_id, champion_name, champion_class, kda, score, other_team_score) VALUES (:user_id, :champion_name, :champion_class, :kda, :score, :otherTeamScore)");

            // Lier les paramètres et exécuter la requête
            $stmt->bindParam(':user_id', $data['user_id'], PDO::PARAM_INT);
            $stmt->bindParam(':champion_name', $data['champion_name'], PDO::PARAM_STR);
            $stmt->bindParam(':champion_class', $data['champion_class'], PDO::PARAM_STR);
            $stmt->bindParam(':kda', $data['kda'], PDO::PARAM_STR);
            $stmt->bindParam(':score', $data['score'], PDO::PARAM_STR);
            $stmt->bindParam(':otherTeamScore', $data['otherTeamScore'], PDO::PARAM_STR);

            if ($stmt->execute()) {
                $response = [
                    'success' => true,
                    'message' => 'Les données ont été enregistrées avec succès.'
                ];
            } else {
                $response = [
                    'success' => false,
                    'message' => 'Erreur lors de l\'exécution de la requête SQL.'
                ];
            }
        } catch (PDOException $e) {
            $response = [
                'success' => false,
                'message' => 'Erreur lors de l\'insertion des données : ' . $e->getMessage()
            ];
        }
    } else {
        $response = [
            'success' => false,
            'message' => 'Les données envoyées sont incomplètes.'
        ];
    }
} else {
    $response = [
        'success' => false,
        'message' => 'Les données envoyées ne sont pas valides.'
    ];
}

// Retourner la réponse en JSON
echo json_encode($response);
