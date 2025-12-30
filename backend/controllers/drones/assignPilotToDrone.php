<?php
session_start();

/* 🔍 TEMP DEBUG — ADD THIS LINE */
error_log("SESSION USER: " . print_r($_SESSION["user"] ?? 'NO SESSION USER', true));

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../../config/db.php";
require "../../helpers/logActivity.php";

/* ================= READ INPUT ================= */
$drone_code      = $_POST['drone_code'] ?? null;
$new_pilot_id    = $_POST['pilot_id'] ?? null;
$new_pilot_name  = $_POST['pilot_name'] ?? null;
$new_pilot_email = $_POST['pilot_email'] ?? null;
$new_pilot_phone = $_POST['pilot_phone'] ?? null;
$new_pilot_role  = $_POST['pilot_role'] ?? null;
$old_pilot_id    = $_POST['old_pilot_id'] ?? null;

if (!$drone_code || !$new_pilot_id) {
    echo json_encode(["success" => false, "error" => "Missing required fields"]);
    exit;
}

/* ================= CURRENT USER (FOR LOG) ================= */
$logUser = $_SESSION["user"] ?? [
    "id"       => null,
    "fullName" => "SYSTEM",
    "role"     => "SYSTEM"
];

/* 🔍 DEBUG SESSION USER */
error_log("SESSION USER: " . print_r($_SESSION["user"] ?? 'NOT SET', true));

$conn->begin_transaction();

try {

    /* ------------------------------------------------
       STEP 1: Check if pilot already assigned elsewhere
    --------------------------------------------------*/
    $check = $conn->prepare("
        SELECT COUNT(*) AS cnt
        FROM drones
        WHERE pilot_id = ?
          AND pilot_status = 'assigned'
    ");
    $check->bind_param("i", $new_pilot_id);
    $check->execute();
    $res = $check->get_result()->fetch_assoc();

    if ($res['cnt'] > 0) {
        echo json_encode([
            "success" => false,
            "error" => "Pilot already assigned to another drone"
        ]);
        exit;
    }

    /* ------------------------------------------------
       STEP 2: Free old pilot (if any)
    --------------------------------------------------*/
    if (!empty($old_pilot_id)) {
        $stmtOld = $conn->prepare("
            UPDATE drones
            SET pilot_status = 'available'
            WHERE pilot_id = ?
        ");
        $stmtOld->bind_param("i", $old_pilot_id);
        $stmtOld->execute();

        // 🔹 LOG OLD PILOT REMOVAL
        logActivity(
            $conn,
            $logUser,
            "REMOVE_PILOT",
            "DRONE",
            "Removed pilot (ID: $old_pilot_id) from drone $drone_code",
            $old_pilot_id
        );
    }

    /* ------------------------------------------------
       STEP 3: Assign new pilot to drone
    --------------------------------------------------*/
    $stmt = $conn->prepare("
        UPDATE drones SET
            pilot_id = ?,
            pilot_name = ?,
            pilot_email = ?,
            pilot_phone = ?,
            pilot_role = ?,
            pilot_status = 'assigned'
        WHERE drone_code = ?
    ");

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

    /* ------------------------------------------------
       STEP 4: AUDIT LOG (ASSIGN PILOT)
    --------------------------------------------------*/
    logActivity(
        $conn,
        $logUser,
        "ASSIGN_PILOT",
        "DRONE",
        "Assigned pilot ($new_pilot_name) to drone $drone_code",
        $new_pilot_id
    );

    $conn->commit();

    echo json_encode(["success" => true]);

} catch (Exception $e) {

    $conn->rollback();

    echo json_encode([
        "success" => false,
        "error" => "Failed to assign pilot"
    ]);
}
