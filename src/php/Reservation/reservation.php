<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require('../config/config.php');

session_start();
ob_start();
$msg = '';
$maxParticipants = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $classe = $_POST['classe'];
    $jeu = $_POST['jeu'];
    $date = $_POST['date'];
    $horaire = $_POST['Horaires'];

    $table = ($horaire == "crn1") ? "crn1" : "crn2";
    $other_table = ($horaire == "crn1") ? "crn2" : "crn1";

    $_SESSION['table'] = $table;
    $_SESSION['other_table'] = $other_table;

    $sql = "SELECT COUNT(*) AS total FROM $table WHERE date=:date";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':date', $date);
    $stmt->execute();
    $total1 = $stmt->fetchColumn();

    if ($total1 >= 16) {
        $msg = "Plus de place disponible pour cette session !";
    } else {
        $currentDate = date('Y-m-d', strtotime('last Sunday', strtotime($date)));

        $verif1 = "SELECT COUNT(*) AS total FROM $table WHERE nom=:nom AND prenom=:prenom AND date >= :currentDate AND date < DATE_ADD(:currentDate, INTERVAL 7 DAY)";
        $stmt = $conn->prepare($verif1);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prenom', $prenom);
        $stmt->bindParam(':currentDate', $currentDate);
        $stmt->execute();
        $total = $stmt->fetchColumn();

        if ($total > 0) {
            $msg = "Vous êtes déjà inscrit pour cette semaine.";
        } else {
            $verif2 = "SELECT COUNT(*) AS total FROM $other_table WHERE nom=:nom AND prenom=:prenom AND date >= :currentDate AND date < DATE_ADD(:currentDate, INTERVAL 7 DAY)";
            $stmt = $conn->prepare($verif2);
            $stmt->bindParam(':nom', $nom);
            $stmt->bindParam(':prenom', $prenom);
            $stmt->bindParam(':currentDate', $currentDate);
            $stmt->execute();
            $total = $stmt->fetchColumn();

            if ($total > 0) {
                $msg = "Vous êtes déjà inscrit pour cette semaine.";
            } else {
                $verif3 = "INSERT INTO $table (nom, prenom, classe, jeu, date) VALUES (:nom, :prenom, :classe, :jeu, :date)";
                $stmt = $conn->prepare($verif3);
                $stmt->bindParam(':nom', $nom);
                $stmt->bindParam(':prenom', $prenom);
                $stmt->bindParam(':classe', $classe);
                $stmt->bindParam(':jeu', $jeu);
                $stmt->bindParam(':date', $date);
                if ($stmt->execute()) {
                    $msg = "Inscription réussie.";
                    $verif4 = "SELECT COUNT(*) AS total FROM $table WHERE date=:date";
                    $stmt = $conn->prepare($verif4);
                    $stmt->bindParam(':date', $date);
                    $stmt->execute();
                    $total2 = $stmt->fetchColumn();
                    if ($total2 >= 16) {
                        $maxParticipants = true;
                    }
                } else {
                    $msg = "Erreur lors de l'inscription.";
                }
            }
        }
    }

    if ($maxParticipants) {
        try {
            include_once 'send_list.php';
            $msg = 'Bravo tu viens de prendre la dernière place !';
        } catch (PDOException $e) {
            $msg = "Erreur. Envoie un mail à Monsieur Roux par l'ENT pour plus d'informations.";
        }
    }

    header('Content-Type: application/json');
    echo json_encode(['message' => $msg]);
    exit();
    // var_dump($verif1);
    // var_dump($verif2);
    // var_dump($verif3);
    // var_dump($verif4);
    // var_dump($msg);
}
?>


