<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require('../config/config.php');

session_start();


require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$msg = '';
$maxParticipants = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userID = $_POST['userId'];
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $classe = $_POST['classe'];
    $date = $_POST['date'];
    $horaire = $_POST['horaire'];

    // Vérifier que toutes les données requises sont présentes
    if (!$nom || !$prenom || !$classe || !$date || !$horaire) {
        $msg = "Tous les champs sont requis.";
        $success = false;
    } else {
        // Vérifier si l'utilisateur est dans la blacklist
        $checkBlacklist = "SELECT COUNT(*) AS total FROM blacklist WHERE user_id = :user_id";
        $stmt = $conn->prepare($checkBlacklist);
        $stmt->bindParam(':user_id', $userID);
        $stmt->execute();
        $isBlacklisted = $stmt->fetchColumn();

        if ($isBlacklisted > 0) {
            $msg = "Vous ne pouvez pas vous inscrire car vous êtes sur la liste noire.";
            $success = false;
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
                        $verif3 = "INSERT INTO $table (user_id, nom, prenom, classe, date) VALUES (:user_id, :nom, :prenom, :classe, :date)";
                        $stmt = $conn->prepare($verif3);
                        $stmt->bindParam(':nom', $nom);
                        $stmt->bindParam(':prenom', $prenom);
                        $stmt->bindParam(':classe', $classe);
                        $stmt->bindParam(':date', $date);
                        $stmt->bindParam(':user_id', $userID);
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
                    // include_once 'send_list.php';
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




                    $msg = 'Bravo tu viens de prendre la dernière place !';
                    $success = true;
                } catch (PDOException $e) {
                    $msg = "Erreur. Envoie un mail à Monsieur Roux par l'ENT pour plus d'informations.";
                    $success = false;
                }
            }
        }
    }

    header('Content-Type: application/json');
    echo json_encode(['message' => $msg, 'success' => $success ]);
    exit();
} elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    $msg = "Tu fais quoi là frero !";
    echo json_encode(['message' => $msg, 'success' => $success ]);
    exit();
}
?>
