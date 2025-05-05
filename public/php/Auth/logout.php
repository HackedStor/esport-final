<?php
session_start(); // Ajoutez ceci pour démarrer la session
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
session_unset();
session_destroy();
header("Content-Type: application/json");

echo json_encode([
    'success' => true,
    'message' => 'Déconnexion réussie.'
]);
?>
