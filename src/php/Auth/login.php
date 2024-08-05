<?php
session_start(); // Ajoutez ceci pour démarrer la session
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require('../config/config.php');

function validateLogin($conn, $email, $password) {
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return "Email invalide.";
    }

    // Recherche de l'utilisateur dans la base de données
    $stmt = $conn->prepare("SELECT id, email, pwd, is_admin FROM users WHERE email = :email");
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['pwd'])) {
        return "Email ou mot de passe incorrect.";
    }

    return $user;
}

// Lire le corps de la requête
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $input['Email'];
    $password = $input['Password'];

    $result = validateLogin($conn, $email, $password);

    if (is_array($result)) {
        // Connexion réussie
        $_SESSION['email'] = $email; // Définir l'email dans la session
        session_write_close();
        
        echo json_encode([
            'success' => true,
            'message' => 'Connexion réussie.',
            'redirectUrl' => $result['is_admin'] ? '/admin/dashboard/' : '/dashboard',
            'email' => $email,
            'is_admin' => $result['is_admin']
        ]);
    } else {
        // Échec de la connexion
        echo json_encode([
            'success' => false,
            'message' => $result
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Méthode de requête non valide.'
    ]);
}
?>
