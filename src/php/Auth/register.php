<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require('../config/config.php');

// Fonction de validation et de vérification de l'unicité
function validateAndCheckUnique($conn, $email, $pseudo, $password) {
    // Assainissement et validation des entrées
    $email = trim($email);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return "Email invalide.";
    }

    $pseudo = filter_var($pseudo, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    if (!preg_match("/^[a-zA-Z0-9_]{3,20}$/", $pseudo)) {
        return "Pseudo invalide. (3-20 caractères, lettres, chiffres et underscores seulement)";
    }

    $password = filter_var($password, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    if (strlen($password) < 8) {
        return "Le mot de passe doit contenir au moins 8 caractères.";
    }

    // Vérification de l'unicité de l'email et du pseudo
    $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE Email = :email OR Pseudo = :pseudo");
    $stmt->execute(['email' => $email, 'pseudo' => $pseudo]);
    $count = $stmt->fetchColumn();

    if ($count > 0) {
        return "L'email ou le pseudo existe déjà.";
    }

    // Les données sont valides et uniques
    return true;
}

// Lire le corps de la requête
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(array('error' => 'Invalid JSON data'));
        exit;
    }

    $Email = $input['Email'];
    $Pseudo = $input['Pseudo'];
    $Password = $input['Password'];
    $Classe = $input['Classe'];
    // Vérification et validation
    $result = validateAndCheckUnique($conn, $Email, $Pseudo, $Password);

    if ($result === true) {
        // Les données sont valides et uniques, vous pouvez les insérer dans la base de données
        $stmt = $conn->prepare("INSERT INTO users (email, pseudo, classe, pwd) VALUES (:email, :pseudo, :classe, :password)");
        $stmt->execute([
            'email' => $Email,
            'pseudo' => $Pseudo,
            'classe' => $Classe,
            'password' => password_hash($Password, PASSWORD_DEFAULT) // Hash du mot de passe
        ]);
        echo json_encode(array('success' => 'Utilisateur enregistré avec succès.'));
    } else {
        // Affichage du message d'erreur
        echo json_encode(array('error' => $result, 'Email reçu :' => $Email));
    }
} else {
    echo json_encode(array('error' => 'Méthode de requête non valide.'));
}
?>
