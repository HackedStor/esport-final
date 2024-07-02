<?php
session_start();
require __DIR__.'/../config/config.php';
require __DIR__ . '/../../vendor/autoload.php';
$del_file_path = __DIR__ . '/dropTable.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (date('D') == 'Sun') {
    $prochain_mercredi = strtotime('next Wednesday');
    $date = date("Y-m-d", $prochain_mercredi);

    // Requête sur la table crn1
    $sql_crn1 = "SELECT * FROM crn1 WHERE date = :date";
    $stmt_crn1 = $conn->prepare($sql_crn1);
    $stmt_crn1->bindParam(':date', $date);
    $stmt_crn1->execute();
    $count_crn1 = $stmt_crn1->rowCount();

    // Requête sur la table crn2
    $sql_crn2 = "SELECT * FROM crn2 WHERE date = :date";
    $stmt_crn2 = $conn->prepare($sql_crn2);
    $stmt_crn2->bindParam(':date', $date);
    $stmt_crn2->execute();
    $count_crn2 = $stmt_crn2->rowCount();

    // Corps de l'e-mail
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
        <body>';

    // Titres h2 pour les sessions
    $body .= '<h2>Liste des inscrits pour la session 1 du ' . $date . '</h2>';
    $incremental_id_crn1 = 1;
    // Tableau pour crn1
    $body .= '<table border="1">';
    $body .= '<tr><th>Numéro d\'inscription</th><th>Nom</th><th>Prénom</th><th>Classe</th><th>Date</th></tr>';
    while($row = $stmt_crn1->fetch(PDO::FETCH_ASSOC)) {
        $body .= '<tr>';
        $body .= '<td>' .  $incremental_id_crn1++ . '</td>';
        $body .= '<td>' . $row['nom'] . '</td>';
        $body .= '<td>' . $row['prenom'] . '</td>';
        $body .= '<td>' . $row['classe'] . '</td>';
        $body .= '<td>' . $row['date'] . '</td>';
        $body .= '</tr>';
    }
    $body .= '</table>';

    // Titre h2 pour la session 2
    $body .= '<h2>Liste des inscrits pour la session 2 du ' . $date . '</h2>';
    $incremental_id_crn2 = 1;
    // Tableau pour crn2
    $body .= '<table border="1">';
    $body .= '<tr><th>Numéro d\'inscription</th><th>Nom</th><th>Prénom</th><th>Classe</th><th>Date</th></tr>';
    while($row = $stmt_crn2->fetch(PDO::FETCH_ASSOC)) {
        $body .= '<tr>';
        $body .= '<td>' .  $incremental_id_crn2++ . '</td>';
        $body .= '<td>' . $row['nom'] . '</td>';
        $body .= '<td>' . $row['prenom'] . '</td>';
        $body .= '<td>' . $row['classe'] . '</td>';
        $body .= '<td>' . $row['date'] . '</td>';
        $body .= '</tr>';
    }
    $body .= '</table>';

    $body .= '</body>
        </html>';

    // Envoi de l'e-mail
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Spécifiez votre serveur SMTP
    $mail->SMTPAuth = true;
    $mail->Username = 'hacked.storm.pro@gmail.com'; // Spécifiez votre adresse e-mail
    $mail->Password = $mdp_smtp; // Spécifiez votre mot de passe e-mail
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    $mail->isHTML(true);
    $mail->setFrom('hacked.storm.pro@gmail.com', 'Serveur FROM verification.php file');
    $mail->addAddress('hacked.storm.pro@gmail.com');
    $mail->Subject = 'Liste des inscrits pour les sessions du mercredi ' . $date;
    $mail->Body = $body;

    try {
        $mail->send();
        $_SESSION['date'] = $date;
        require($del_file_path);
        echo 'E-mail envoyé avec succès';
    } catch (Exception $e) {
        echo "Erreur lors de l'envoi de l'e-mail : {$mail->ErrorInfo}";
    }
} else {
    echo "Bonsoir";
}
?>