<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/* ================= HEADERS ================= */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require "../../../config/db.php";
require "../../../helpers/logActivity.php";

/* ================= READ INPUT ================= */
$data = $_POST;

/* ================= BASIC VALIDATION ================= */
if (
    empty($data['drone_code']) ||
    empty($data['drone_name']) ||
    empty($data['status']) ||
    empty($data['station']) ||
    !isset($data['flight_hours']) ||
    empty($data['health_status']) ||
    empty($data['firmware_version']) ||
    !isset($data['is_ready'])
) {
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields"
    ]);
    exit;
}

/* ================= VALIDATE FLIGHT HOURS ================= */
$flight_hours = floatval($data['flight_hours']);
if ($flight_hours < 0) {
    echo json_encode([
        "success" => false,
        "message" => "Flight hours cannot be negative"
    ]);
    exit;
}

/* ================= NORMALIZE IS_READY ================= */
$is_ready = ($data['is_ready'] == 1 || $data['is_ready'] === "1") ? 1 : 0;

/* ================= CURRENT USER (FOR LOG) ================= */
$logUser = $_SESSION["user"] ?? [
    "id"       => null,
    "fullName" => "SYSTEM",
    "role"     => "SYSTEM"
];

try {
    $conn->begin_transaction();

    /* ================= DUPLICATE DRONE CODE CHECK ================= */
    $checkSql = "SELECT id FROM drones WHERE drone_code = ? LIMIT 1";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $data['drone_code']);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        echo json_encode([
            "success" => false,
            "message" => "Drone code already exists"
        ]);
        exit;
    }
    $checkStmt->close();

    /* ================= INSERT DRONE ================= */
    $sql = "
        INSERT INTO drones 
        (
            drone_code,
            drone_name,
            status,
            flight_hours,
            health_status,
            firmware_version,
            is_ready,
            station
        )
        VALUES (?,?,?,?,?,?,?,?)
    ";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception("Prepare failed");
    }

    $stmt->bind_param(
        "sssdssss",
        $data['drone_code'],
        $data['drone_name'],
        $data['status'],
        $flight_hours,
        $data['health_status'],
        $data['firmware_version'],
        $is_ready,
        $data['station']
    );

    if (!$stmt->execute()) {
        throw new Exception("Insert failed");
    }

    $stmt->close();

    /* ================= AUDIT LOG ================= */
    logActivity(
        $conn,
        $logUser,
        "ADD_DRONE",
        "DRONE",
        "Added new drone {$data['drone_name']} ({$data['drone_code']}) at station {$data['station']}",
        null
    );

    $conn->commit();

    echo json_encode([
        "success" => true,
        "message" => "Drone added successfully"
    ]);

} catch (Exception $e) {

    $conn->rollback();

    echo json_encode([
        "success" => false,
        "message" => "Failed to add drone"
    ]);
}
