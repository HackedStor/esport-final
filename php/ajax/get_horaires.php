<?php
// Assurez-vous que la connexion à la base de données est établie
require('../config/config.php');

if(isset($_POST['date'])) {
    $date = $_POST['date'];

    // Utilisez une requête préparée pour éviter les injections SQL
    $sql = "SELECT COUNT(*) AS total FROM crn1 WHERE date = :date";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':date', $date);
    $stmt->execute();
    $total1 = $stmt->fetchColumn();
    
    // Utilisez une requête préparée pour éviter les injections SQL
    $sql = "SELECT COUNT(*) AS total FROM crn2 WHERE date = :date";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':date', $date);
    $stmt->execute();
    $total2 = $stmt->fetchColumn();

    // Initialisez le tableau horaire
    $horaires = array();

    if($total1 >= 16) {
        $horaires[] = array('id' => 'crn1', 'horaire' => 'Plus de place');
    }else {
        $horaires[] = array('id' => 'crn1', 'horaire' => '16h20 ⟩ 17h40');
    }

    // Vérifiez également pour crn2
    $sql = "SELECT COUNT(*) AS total FROM crn2 WHERE date = :date";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':date', $date);
    $stmt->execute();
    $total2 = $stmt->fetchColumn();

    if($total2 >= 16) {
        $horaires[] = array('id' => 'crn2', 'horaire' => 'Plus de place');
    }else {
        $horaires[] = array('id' => 'crn2', 'horaire' => '17h40 ⟩ 19h00');
    }

    // Envoyez le tableau horaire encodé en JSON
    echo json_encode($horaires);
}
?>