<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json");

$version = "14.16";
$url = "https://ddragon.leagueoflegends.com/cdn/$version/data/fr_FR/champion.json";

$response = file_get_contents($url);

if ($response === FALSE) {
    echo json_encode(["error" => "Erreur lors de la récupération des données"]);
    exit();
}

echo $response;
?>
