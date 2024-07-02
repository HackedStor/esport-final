<?php
require('php/config/config.php');
session_start();

// Effectuez une requête SQL pour compter le nombre d'inscriptions dans chaque table
$sql_crn1 = "SELECT COUNT(*) AS total FROM crn1";
$stmt_crn1 = $conn->prepare($sql_crn1);
$stmt_crn1->execute();
$total_crn1 = $stmt_crn1->fetchColumn();

$sql_crn2 = "SELECT COUNT(*) AS total FROM crn2";
$stmt_crn2 = $conn->prepare($sql_crn2);
$stmt_crn2->execute();
$total_crn2 = $stmt_crn2->fetchColumn();

if (isset($_SESSION['resaNotif'])) {
    $notification = htmlspecialchars($_SESSION['resaNotif'], ENT_QUOTES, 'UTF-8');
    unset($_SESSION['resaNotif']);
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/index.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <title>Esport Reservation</title>
</head>
<body>
    <div class="container">
        <div class="mydiv">
            <h2>Inscription session E-sport</h2>
            <span class="headline">
                Rentre ton prénom, ton nom, ta classe le jour et la session pour participer à 1h20 de fun !
            </span>
        </div>
        <form class="form_container"  method="post" action="php/inscription.php">
            <div class="page1">
                <div class="form_control">
                    <div class="form">
                        <label for="nom">Nom:</label>
                        <input class="input" type="text" name="nom" required>
                        <span class="input-border"></span>
                    </div>
                    <div class="form">
                        <label for="prenom">Prénom:</label>
                        <input class="input" type="text" name="prenom" required>
                        <span class="input-border"></span>
                    </div>
                </div>
            </div>
            <div class="page2"> 
                <div class="form_control">
                    <div class="form">
                        <label for="classe">Classe:</label>
                        <input class="input" type="text" name="classe" required>
                        <span class="input-border"></span>
                    </div>
                    <div class="form">
                        <label for="Date">Date:</label>
                        <select id="date" class="input" name="date" required>
                            <?php

                                // Trouver le prochain mercredi
                                $jourActuel = strtotime('today');
                                while (date('N', $jourActuel) != 3) {
                                    $jourActuel = strtotime('+1 day', $jourActuel);
                                }

                                // Afficher les deux mercredis consécutifs suivants
                                for ($i = 0; $i < 2; $i++) {
                                    echo "<option class='option' value='" . date('Y-m-d', $jourActuel) . "'>" . strftime('%A %d %B %Y', $jourActuel) . "</option>";
                                    $jourActuel = strtotime('+1 week', $jourActuel);
                                }
                            ?>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form">
                <label for="horaire">Horaire:</label>
                <select id="horaire" class="input" name="horaire" required>
                    <option class="option" value="crn1">16h20 ⟩ 17h40</option>
                    <option class="option" value="crn2">17h40 ⟩ 19h00</option>
                </select>
            </div><br>
            <div class="submit_control">
                <input type="submit" class="submit" value="S'inscrire">
            </div>
        </form>
        <?php if(isset($notification)): ?>
            <div class="info">
                <div class="info__icon">
                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#393a37"></path></svg>
                </div>
                <div class="info__title"><?php echo $notification; ?></div>
                <div class="info__close"><svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#393a37"></path></svg></div>
            </div>
        <?php endif ?>
    </div>
    <script>
        function closeinfo() {
            const info = document.querySelector(".info");
            info.parentNode.removeChild(info);
        }
        document.querySelector(".info__close").addEventListener("click", closeinfo);

    </script>
    <script type="module">
        import { createNightowl } from './node_modules/@bufferhead/nightowl/dist/nightowl.js';

        createNightowl({
            defaultMode: 'dark',
            toggleButtonMode: 'currentState'
        })
    </script>
    <script>
        $(document).ready(function(){
            // Fonction pour charger les horaires en fonction de la date
            function chargerHoraires(date) {
                $.ajax({
                    url: 'php/ajax/get_horaires.php',
                    type: 'post',
                    data: {date: date},
                    dataType: 'json',
                    success:function(response){
                        $('#horaire').empty();
                        $.each(response, function(index, value){
                            $('#horaire').append('<option class="option" value="' + value.id + '">' + value.horaire + '</option>');
                        });
                    }
                });
            }

            // Appeler la fonction chargerHoraires lorsque la page se charge initialement
            chargerHoraires($('#date').val());

            // Écouter les changements de la date et charger les horaires en conséquence
            $('#date').change(function(){
                var selectedDate = $(this).val();
                chargerHoraires(selectedDate);
            });
        });
    </script>
</body>
</html>