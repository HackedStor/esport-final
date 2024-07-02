<?php
require('config/config.php');

session_start();
ob_start();
$msg = '';
$maxParticipants = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $classe = $_POST['classe'];
    $date = $_POST['date'];
    $horaire = $_POST['horaire'];

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
        // Calcule de la date de début de semaine
        $currentDate = date('Y-m-d', strtotime('last Sunday', strtotime($date)));

        // Vérification si l'élève est déjà inscrit pour ce créneau dans la même semaine
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
            //Vérifier si inscrit sur l'autre créneau
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
                // Insertion des données dans la base de données
                $verif3 = "INSERT INTO $table (nom, prenom, classe, date) VALUES (:nom, :prenom, :classe, :date)";
                $stmt = $conn->prepare($verif3);
                $stmt->bindParam(':nom', $nom);
                $stmt->bindParam(':prenom', $prenom);
                $stmt->bindParam(':classe', $classe);
                $stmt->bindParam(':date', $date);
                if ($stmt->execute()) {
                    $msg = "Inscription réussie.";
                    // Maintenant que l'inscription est réussie, vérifiez s'il y a 16 inscrits
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

    // Si le nombre maximum de participants est atteint, envoyez un email
    if ($maxParticipants) {
        try {
            include('send_list.php');
            $msg = 'Bravo tu viens de prendre la dernière place !';

        } catch (PDOException $e) {
            $msg = "Erreur. Envoie un mail à Monsieur Roux par l'ENT pour plus d'informations.";
        }
    }
    $_SESSION['resaNotif'] = $msg;
    header("Location: ../../index.php");
    exit();
    // var_dump($verif1);
    // var_dump($verif2);
    // var_dump($verif3);
    // var_dump($verif4);
    // var_dump($msg);
}
?>