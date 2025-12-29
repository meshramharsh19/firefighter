<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../../config/db.php";

$drone_code = $_POST['drone_code'] ?? null;

if (!$drone_code) {
    echo json_encode(["success" => false, "error" => "Missing drone_code"]);
    exit;
}

try {
    $conn->begin_transaction();

    /* --------------------------------------------
       STEP 1: Remove pilot from drone
    ---------------------------------------------*/
    $stmt = $conn->prepare("
        UPDATE drones SET
            pilot_id = NULL,
            pilot_name = NULL,
            pilot_email = NULL,
            pilot_phone = NULL,
            pilot_role = NULL,
            pilot_status = 'available'
        WHERE drone_code = ?
    ");
    $stmt->bind_param("s", $drone_code);
    $stmt->execute();
    $stmt->close();

    $conn->commit();

    echo json_encode(["success" => true]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
