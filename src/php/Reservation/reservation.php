<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require('../config/config.php');

session_start();

$msg = '';
$maxParticipants = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $classe = $_POST['classe'];
    $date = $_POST['date'];
    $horaire = $_POST['horaire'];

    // Commenter ou supprimer les var_dump pour éviter d'insérer du HTML dans la réponse JSON
    // var_dump($nom);
    // var_dump($prenom);
    // var_dump($classe);
    // var_dump($date);
    // var_dump($horaire);


    // Vérifiez que toutes les données requises sont présentes
    if (!$nom || !$prenom || !$classe || !$date || !$horaire) {
        $msg = "Tous les champs sont requis.";
        $success = false
    } else {
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
            $success = false;
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
                $success = false;
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
                    $success = false;
                } else {
                    $verif3 = "INSERT INTO $table (nom, prenom, classe, date) VALUES (:nom, :prenom, :classe, :date)";
                    $stmt = $conn->prepare($verif3);
                    $stmt->bindParam(':nom', $nom);
                    $stmt->bindParam(':prenom', $prenom);
                    $stmt->bindParam(':classe', $classe);
                    $stmt->bindParam(':date', $date);
                    if ($stmt->execute()) {
                        $msg = "Inscription réussie.";
                        $success = true;
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
                        $success = false;
                    }
                }
            }
        }

        if ($maxParticipants) {
            try {
                include_once 'send_list.php';
                $msg = 'Bravo tu viens de prendre la dernière place !';
                $success = true
            } catch (PDOException $e) {
                $msg = "Erreur. Envoie un mail à Monsieur Roux par l'ENT pour plus d'informations.";
                $success = false;
            }
        }
    }

    header('Content-Type: application/json');
    echo json_encode(['message' => $msg]);
    exit();
} elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    $msg = "Tu fais quoi la frero !";
    echo json_encode(['message' => $msg, 'success' => $success ]);
    exit();
}
?>
