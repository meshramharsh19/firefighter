<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require "../../config/db.php";
require "../../helpers/logActivity.php";

/* ================= READ INPUT ================= */
$data = $_POST;

if (
    empty($data['drone_code']) ||
    empty($data['drone_name']) ||
    empty($data['status']) ||
    empty($data['station'])
) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

/* ================= CURRENT USER (FOR LOG) ================= */
$logUser = $_SESSION["user"] ?? [
    "id"       => null,
    "fullName" => "SYSTEM",
    "role"     => "SYSTEM"
];

try {
    $conn->begin_transaction();

    /* --------------------------------------------
       STEP 1: INSERT DRONE
    ---------------------------------------------*/
    $sql = "
        INSERT INTO drones 
        (drone_code, drone_name, ward, status, battery, flight_hours, health_status, firmware_version, is_ready, station)
        VALUES (?,?,?,?,?,?,?,?,?,?)
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "ssssddssis",
        $data['drone_code'],
        $data['drone_name'],
        $data['ward'],
        $data['status'],
        $data['battery'],
        $data['flight_hours'],
        $data['health_status'],
        $data['firmware_version'],
        $data['is_ready'],
        $data['station']
    );

    if (!$stmt->execute()) {
        throw new Exception("Insert failed");
    }

    $stmt->close();

    /* --------------------------------------------
       STEP 2: AUDIT LOG
    ---------------------------------------------*/
    logActivity(
        $conn,
        $logUser,
        "ADD_DRONE",
        "DRONE",
        "Added new drone {$data['drone_name']} ({$data['drone_code']}) at station {$data['station']}",
        null
    );

    $conn->commit();

    echo json_encode(["success" => true]);

} catch (Exception $e) {

    $conn->rollback();

    echo json_encode([
        "success" => false,
        "message" => "Failed to add drone"
    ]);
}
