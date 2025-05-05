<?php
session_start();
require('../config/config.php');
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Création de l'objet PHPMailer
$mail = new PHPMailer(true); // true active les exceptions

// $table = $_SESSION['table'];

$incremental_id_crn1 = 1;
// Requête sur la table crn1
$sql_crn1 = "SELECT * FROM crn1 WHERE date = :date";
$stmt_crn1 = $conn->prepare($sql_crn1);
$stmt_crn1->bindParam(':date', $date);
$stmt_crn1->execute();
$count_crn1 = $stmt_crn1->rowCount();

// Envoyer la liste des inscrits
$verif5 = "SELECT * FROM crn2 WHERE date=:date";
$stmt = $conn->prepare($verif5);
$stmt->bindParam(':date', $date);
$stmt->execute();
$participants = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Paramètres du serveur SMTP
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
$mail->setFrom('hacked.storm.pro@gmail.com', 'Serveur FROM send_list.php file');
$mail->addAddress('hacked.storm.pro@gmail.com');
$mail->Subject = 'Liste inscrits pour session ' . $table . '';

$body = '
    <html>
    <head>
        <title>Liste des inscrits</title>
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
        <h2>Liste des inscrits</h2>
        <table>
            <thead>
                <tr>
                    <th>Numéro d\'inscription</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Classe</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>';

        // foreach ($participants as $participant) {
        //     $body .= '
        //                 <tr>
        //                     <td>' . $incremental_id_crn1++ . '</td>
        //                     <td>' . $participant['nom'] . '</td>
        //                     <td>' . $participant['prenom'] . '</td>
        //                     <td>' . $participant['classe'] . '</td>
        //                     <td>' . $participant['date'] . '</td>
        //                 </tr>';
        // }
        while($row = $stmt_crn1->fetch(PDO::FETCH_ASSOC)) {
            $body .= '<tr>';
            $body .= '<td>' .  $incremental_id_crn1++ . '</td>';
            $body .= '<td>' . $row['nom'] . '</td>';
            $body .= '<td>' . $row['prenom'] . '</td>';
            $body .= '<td>' . $row['classe'] . '</td>';
            $body .= '<td>' . $row['date'] . '</td>';
            $body .= '</tr>';
        }

$body .= '
            </tbody>
        </table>
    </body>
    </html>';

$mail->Body = $body;

// Envoyer l'e-mail
$mail->send();


?>