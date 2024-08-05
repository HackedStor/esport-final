<?php
// Informations d'identification
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'esport');
$mdp_smtp = "crnyuclfmyalhffa";

try {
    // Connexion à la base de données MySQL via PDO
    $conn = new PDO("mysql:host=".DB_SERVER.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
    
    // Définir le mode d'erreur PDO à exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // echo "Connexion réussie à la base de données.";
} catch(PDOException $e) {
    die("ERREUR : Impossible de se connecter. " . $e->getMessage());
}
?>