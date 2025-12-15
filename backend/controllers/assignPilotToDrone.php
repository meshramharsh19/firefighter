<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../config/db.php";

$drone_code = $_POST['drone_code'] ?? null;
$new_pilot_id = $_POST['pilot_id'] ?? null;
$new_pilot_name = $_POST['pilot_name'] ?? null;
$new_pilot_email = $_POST['pilot_email'] ?? null;
$new_pilot_phone = $_POST['pilot_phone'] ?? null;
$new_pilot_role = $_POST['pilot_role'] ?? null;

$old_pilot_id = $_POST['old_pilot_id'] ?? null;

if (!$drone_code || !$new_pilot_id) {
    echo json_encode(["success" => false, "error" => "Missing required fields"]);
    exit;
}

/* --------------------------------------------
   STEP 1: If drone already had pilot assigned,
           make that old pilot AVAILABLE again
-----------------------------------------------*/

if (!empty($old_pilot_id)) {

    $stmtOld = $conn->prepare("UPDATE users SET status='available' WHERE id=?");

    if (!$stmtOld) {
        echo json_encode([
            "success" => false,
            "error" => $conn->error
        ]);
        exit;
    }

    $stmtOld->bind_param("i", $old_pilot_id);
    $stmtOld->execute();
}

/* --------------------------------------------
   STEP 2: Assign NEW pilot to drone
-----------------------------------------------*/

$stmt = $conn->prepare("
    UPDATE drones SET
        pilot_id = ?,
        pilot_name = ?,
        pilot_email = ?,
        pilot_phone = ?,
        pilot_role = ?,
        pilot_status = 'Active'
    WHERE drone_code = ?
");

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "error" => $conn->error,
    ]);
    exit;
}

$stmt->bind_param(
    "isssss",
    $new_pilot_id,
    $new_pilot_name,
    $new_pilot_email,
    $new_pilot_phone,
    $new_pilot_role,
    $drone_code
);

$stmt->execute();

/* --------------------------------------------
   STEP 3: Update NEW pilot status to assigned
-----------------------------------------------*/

$stmt2 = $conn->prepare("UPDATE users SET status='assigned' WHERE id=?");

$stmt2->bind_param("i", $new_pilot_id);
$stmt2->execute();

/* Success */
echo json_encode(["success" => true]);
