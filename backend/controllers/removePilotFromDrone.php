<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../config/db.php"; // make sure this sets $conn (mysqli)

$drone_code = $_POST['drone_code'] ?? null;
$pilot_id = $_POST['pilot_id'] ?? null;

if (!$drone_code) {
    echo json_encode(["success" => false, "error" => "Missing drone_code"]);
    exit;
}

// If pilot_id not provided, fetch it from drones table
if (empty($pilot_id)) {
    $q = $conn->prepare("SELECT pilot_id FROM drones WHERE drone_code = ?");
    if (!$q) {
        echo json_encode(["success" => false, "error" => $conn->error]);
        exit;
    }
    $q->bind_param("s", $drone_code);
    $q->execute();
    $q->bind_result($fetchedPilotId);
    $q->fetch();
    $q->close();

    if (empty($fetchedPilotId)) {
        echo json_encode(["success" => false, "error" => "No pilot assigned to this drone"]);
        exit;
    }

    $pilot_id = $fetchedPilotId;
}

try {
    // Start transaction
    $conn->begin_transaction();

    // 1) Update drones table: clear pilot fields and set pilot_status (not main status)
    $stmt = $conn->prepare("
        UPDATE drones SET
            pilot_id = NULL,
            pilot_name = NULL,
            pilot_email = NULL,
            pilot_phone = NULL,
            pilot_role = NULL,
            pilot_status = 'Standby'
        WHERE drone_code = ?
    ");
    if (!$stmt) {
        throw new Exception("Prepare failed (drones update): " . $conn->error);
    }
    $stmt->bind_param("s", $drone_code);
    $stmt->execute();
    $stmt->close();

    // 2) Update users table: set pilot status back to available
    $stmt2 = $conn->prepare("UPDATE users SET status = 'available' WHERE id = ?");
    if (!$stmt2) {
        throw new Exception("Prepare failed (users update): " . $conn->error);
    }
    $stmt2->bind_param("i", $pilot_id);
    $stmt2->execute();
    $stmt2->close();

    // Commit
    $conn->commit();

    echo json_encode(["success" => true]);

} catch (Exception $e) {
    // Rollback on error
    $conn->rollback();
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
    exit;
}
    