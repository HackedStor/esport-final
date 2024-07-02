<?php
session_start();
require __DIR__.'/../config/config.php';
require __DIR__ . '/../../vendor/autoload.php';
$del_file_path = __DIR__ . 'dropTable.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if(date('D') == 'Sun') {
    $date = $_SESSION['date'];

    $sql_crn1 = "DELETE FROM `crn1` WHERE date = :date";
    $stmt_crn1 = $conn->prepare($sql_crn1);
    $stmt_crn1->bindParam(':date', $date);
    $stmt_crn1->execute();
    $count_crn1 = $stmt_crn1->rowCount();

    // Requête sur la table crn2
    $sql_crn2 = "DELETE FROM `crn2` WHERE date = :date";
    $stmt_crn2 = $conn->prepare($sql_crn2);
    $stmt_crn2->bindParam(':date', $date);
    $stmt_crn2->execute();
    $count_crn2 = $stmt_crn2->rowCount();
    
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Spécifiez votre serveur SMTP
    $mail->SMTPAuth = true;
    $mail->Username = 'hacked.storm.pro@gmail.com'; // Spécifiez votre adresse e-mail
    $mail->Password = $mdp_smtp; // Spécifiez votre mot de passe e-mail
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    // Paramètres de l'e-mail
    $mail->isHTML(true);
    $mail->setFrom('hacked.storm.pro@gmail.com', 'Serveur FROM dropTable.php file');
    $mail->addAddress('hacked.storm.pro@gmail.com');
    $mail->Subject = 'Suppression des inscrits pour les sessions '. $date .'';

    // Requête sur la table crn1
    $sql_crn1 = "SELECT * FROM crn1 WHERE date = :date";
    $stmt_crn1 = $conn->prepare($sql_crn1);
    $stmt_crn1->bindParam(':date', $date);
    $stmt_crn1->execute();
    $tot_crn1_del = $stmt_crn1->rowCount();

    // Requête sur la table crn2
    $sql_crn2 = "SELECT * FROM crn2 WHERE date = :date";
    $stmt_crn2 = $conn->prepare($sql_crn2);
    $stmt_crn2->bindParam(':date', $date);
    $stmt_crn2->execute();
    $tot_crn2_del = $stmt_crn2->rowCount();


    if($tot_crn1_del == 0 && $tot_crn2_del == 0) {
        $body = '
        <html>
        <head>
            <title>Tables vidées</title>
            <meta charset="UTF-8">
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h2>Bonjour Monsieur Roux,</h2>
            <p>Ce mail automatique vous confirme que les tables pour les sessions 1 et 2 du ' . $date . ' est bien vidée.</p>
            <p>Bonne fin de jounée</p>
        </body>
        </html>';
    } else {
        $body = '
        <html>
        <head>
            <title>Tables non vidées</title>
            <meta charset="UTF-8">
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h2>Bonjour Monsieur Roux,</h2>
            <h1>ATTENTION !! ERREUR</h1>
            <p>Il y a eu une erreur lors de la suppression des tables pour la date  ' . $date . '.</p>
            <p>Il faut le faire manuellement</p>
        </body>
        </html>';
    }

    $mail->Body = $body;

    // Envoyer l'e-mail
    $mail->send();
    // Réinitialisation de l'auto-incrémentation pour la table crn1
    $sql_reset_auto_increment_crn1 = "ALTER TABLE crn1 AUTO_INCREMENT = 1";
    $conn->exec($sql_reset_auto_increment_crn1);
    // Réinitialisation de l'auto-incrémentation pour la table crn2
    $sql_reset_auto_increment_crn2 = "ALTER TABLE crn2 AUTO_INCREMENT = 1";
    $conn->exec($sql_reset_auto_increment_crn2);
    }
?>