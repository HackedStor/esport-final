<?php
require('../config/config.php');
$users = [
    ['userId' => '', 'prenom' => 'user1@gmail.com', 'nom' => 'User1', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    ['userId' => '', 'prenom' => 'johndoe@gmail.com', 'nom' => 'JohnD', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    ['userId' => '', 'prenom' => 'alicesmith@gmail.com', 'nom' => 'AliceS', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    ['userId' => '', 'prenom' => 'bobjones@gmail.com', 'nom' => 'BobbyJ', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    ['userId' => '', 'prenom' => 'emmawilson@gmail.com', 'nom' => 'EmmaW', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    ['userId' => '', 'prenom' => 'michaelbrown@gmail.com', 'nom' => 'MikeB', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    ['userId' => '', 'prenom' => 'sarahlee@gmail.com', 'nom' => 'SarahL', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    ['userId' => '', 'prenom' => 'davidmiller@gmail.com', 'nom' => 'DavidM', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    ['userId' => '', 'prenom' => 'oliviataylor@gmail.com', 'nom' => 'OliviaT', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    ['userId' => '', 'prenom' => 'jamesanderson@gmail.com', 'nom' => 'JamesA', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    ['userId' => '', 'prenom' => 'sophiawhite@gmail.com', 'nom' => 'SophiaW', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    ['userId' => '', 'prenom' => 'danharris@gmail.com', 'nom' => 'DanH', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    ['userId' => '', 'prenom' => 'emilyclark@gmail.com', 'nom' => 'EmilyC', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    ['userId' => '', 'prenom' => 'williammoore@gmail.com', 'nom' => 'WillM', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    ['userId' => '', 'prenom' => 'avajackson@gmail.com', 'nom' => 'AvaJ', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    ['userId' => '', 'prenom' => 'ethanmartin@gmail.com', 'nom' => 'EthanM', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    // ['userId' => '', 'prenom' => 'isabellathompson@gmail.com', 'nom' => 'IsabellaT', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    // ['userId' => '', 'prenom' => 'noahgarcia@gmail.com', 'nom' => 'NoahG', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    // ['userId' => '', 'prenom' => 'miarodriguez@gmail.com', 'nom' => 'MiaR', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
    // ['userId' => '', 'prenom' => 'liammartinez@gmail.com', 'nom' => 'LiamM', 'classe' => "TSTI1", 'date' => "2024-09-04", 'horaire' => 'crn2'],
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
    // echo "UPDATE users SET pwd = '$hashedPassword' WHERE email = '{$user['prenom']}' AND pseudo = '{$user['pseudo']}';\n";
}
?>
