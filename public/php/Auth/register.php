<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require('../config/config.php');

// Fonction de validation et de vérification de l'unicité
function validateAndCheckUnique($conn, $email, $pseudo, $password) {
    $email = trim($email);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return "Email invalide.";
    }

    $pseudo = filter_var($pseudo, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    if (!preg_match("/^[a-zA-Z0-9_]{3,20}$/", $pseudo)) {
        return "Pseudo invalide.";
    }

    $password = filter_var($password, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    if (strlen($password) < 8) {
        return "Le mot de passe doit contenir au moins 8 caractères.";
    }

    $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE Email = :email OR Pseudo = :pseudo");
    $stmt->execute(['email' => $email, 'pseudo' => $pseudo]);
    $count = $stmt->fetchColumn();

    if ($count > 0) {
        return "L'email ou le pseudo existe déjà.";
    }

    return true;
}

// Lire le corps de la requête
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['error' => 'Invalid JSON data']);
        exit;
    }

    $Email = $input['Email'];
    $Pseudo = $input['Pseudo'];
    $Password = $input['Password'];
    $Classe = $input['Classe'];

    $result = validateAndCheckUnique($conn, $Email, $Pseudo, $Password);

    if ($result === true) {
        try {
            $stmt = $conn->prepare("INSERT INTO users (email, pseudo, classe, pwd, status) VALUES (:email, :pseudo, :classe, :password, 'Present')");
            $stmt->execute([
                'email' => $Email,
                'pseudo' => $Pseudo,
                'classe' => $Classe,
                'password' => password_hash($Password, PASSWORD_DEFAULT)
            ]);
            echo json_encode(['success' => true, 'message' => 'Utilisateur enregistré avec succès']);
            exit;
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'error' => 'Erreur lors de l\'enregistrement: ' . $e->getMessage()]);
            exit;
        }
    } else {
        echo json_encode(['error' => $result]);
        exit;
    }
} else {
    echo json_encode(['error' => 'Méthode de requête non valide.']);
    exit;
}
?>
