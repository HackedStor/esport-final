<?php
// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Assurez-vous que la connexion à la base de données est établie
require('../config/config.php');

// Lire le corps de la requête
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

if(isset($input['date'])) {
    $date = $input['date'];

    // Utilisez une requête préparée pour éviter les injections SQL
    $sql = "SELECT COUNT(*) AS total FROM crn1 WHERE date = :date";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':date', $date);
    $stmt->execute();
    $total1 = $stmt->fetchColumn();

    $sql = "SELECT COUNT(*) AS total FROM crn2 WHERE date = :date";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':date', $date);
    $stmt->execute();
    $total2 = $stmt->fetchColumn();

    $horaires = array();

    if($total1 >= 16) {
        $horaires[] = array('id' => 'crn1', 'horaire' => 'Plus de place');
    } else {
        $horaires[] = array('id' => 'crn1', 'horaire' => '16h20 ⟩ 17h40');
    }

    if($total2 >= 16) {
        $horaires[] = array('id' => 'crn2', 'horaire' => 'Plus de place');
    } else {
        $horaires[] = array('id' => 'crn2', 'horaire' => '17h40 ⟩ 19h00');
    }

    echo json_encode($horaires);
}else {
    echo json_encode(array('error' => 'Date invalide'));
    echo json_encode($_POST);
    echo json_encode($input['date']);
}
?>
