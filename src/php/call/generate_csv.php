<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
include('../config/config.php');

// Récupère tous les joueurs avec leur statut
$query = "SELECT * FROM users where is_admin != 1";
$stmt = $conn->prepare($query);
$stmt->execute();

$players = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Création du fichier CSV
$filename = "attendance.csv";
$handle = fopen($filename, 'w+');
fputcsv($handle, array('ID', 'Email', 'Pseudo', 'Statut'));

foreach ($players as $row) {
    fputcsv($handle, array($row['id'], $row['email'], $row['pseudo'], $row['status']));
}

fclose($handle);

// Envoie le fichier CSV au client
header('Content-Type: application/csv');
header('Content-Disposition: attachment;filename="'.$filename.'";');
readfile($filename);

// Supprime le fichier CSV du serveur
unlink($filename);
?>
