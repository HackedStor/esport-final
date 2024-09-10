<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include('../config/config.php');

try {
    // Début de la transaction
    $conn->beginTransaction();

    // Récupère tous les joueurs avec leur statut
    $query = "SELECT * FROM users WHERE is_admin = 0 AND status IN ('Present', 'Absent', 'Late')";
    $stmt1 = $conn->prepare($query);
    $stmt1->execute();

    $players = $stmt1->fetchAll(PDO::FETCH_ASSOC);

    $deleteCount1 = 0;
    $deleteCount2 = 0;
    foreach ($players as $player) {
        // Suppression dans la table crn1
        $stmt2 = $conn->prepare("DELETE FROM crn1 WHERE user_id = :id");
        $stmt2->bindParam(':id', $player['id']);
        if ($stmt2->execute()) {
            $deleteCount1++;
        }

        // Suppression dans la table crn2
        $stmt3 = $conn->prepare("DELETE FROM crn2 WHERE user_id = :id");
        $stmt3->bindParam(':id', $player['id']);
        if ($stmt3->execute()) {
            $deleteCount2++;
        }
    }

    // Mise à jour du statut dans la table users
    $updateQuery = "UPDATE users SET status = NULL WHERE is_admin = 0 AND status IN ('Present', 'Absent', 'Late')";
    $stmtUpdate = $conn->prepare($updateQuery);
    $updateResult = $stmtUpdate->execute();
    $updatedCount = $stmtUpdate->rowCount();

    // Validation de la transaction
    $conn->commit();

    $message = "Suppressions : " . $deleteCount1 . " sur " . count($players) . " joueurs de crn1, " . 
               $deleteCount2 . " sur " . count($players) . " joueurs de crn2. " .
               "Statuts mis à jour : " . $updatedCount . " utilisateurs.";

    echo json_encode(['success' => true, 'message' => $message]);

} catch (PDOException $e) {
    // En cas d'erreur, annulation de la transaction
    $conn->rollBack();
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'opération : ' . $e->getMessage()]);
}