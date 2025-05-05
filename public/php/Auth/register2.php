<?php
require('../config/config.php');
$users = [
    ['userId' => '', 'prenom' => 'user1@gmail.com', 'nom' => 'User1', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
];

$newPassword = '123456789';

foreach ($users as $user) {
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO crn2 (user_id, nom, prenom, classe, date) VALUES (:user_id, :nom, :prenom, :classe, :date)");
    $stmt->bindParam(':nom', $user['nom']);
    $stmt->bindParam(':prenom', $user['prenom']);
    $stmt->bindParam(':classe', $user['classe']);
    $stmt->bindParam(':date', $user['date']);
    $stmt->bindParam(':user_id', $user['userId']);
    $stmt->execute();
}
?>
