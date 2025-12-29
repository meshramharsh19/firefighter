<?php
session_start();

/* ================= CORS HEADERS ================= */
header("Access-Control-Allow-Origin: http://localhost:5173"); // React origin
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

/* 🔁 OPTIONS PREFLIGHT */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require "../../config/db.php";
require "../../helpers/logActivity.php";

/* ================= READ INPUT ================= */
$data = json_decode(file_get_contents("php://input"), true);

$name     = trim($data["name"] ?? "");
$type     = trim($data["type"] ?? "");
$reg      = trim($data["registrationNumber"] ?? "");
$deviceId = trim($data["deviceId"] ?? "");
$location = trim($data["location"] ?? "");
$station  = trim($data["station"] ?? "");
$status   = $data["status"] ?? "available";

/* ================= VALIDATION ================= */
if (!$name || !$type || !$reg || !$deviceId || !$station) {
    echo json_encode([
        "success" => false,
        "message" => "Required fields missing"
    ]);
    exit;
}

/* ================= INSERT VEHICLE ================= */
$sql = "
    INSERT INTO vehicles
    (name, type, registration, device_id, location, station, status)
    VALUES
    (?, ?, ?, ?, ?, ?, ?)
";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "sssssss",
    $name,
    $type,
    $reg,
    $deviceId,
    $location,
    $station,
    $status
);

if ($stmt->execute()) {

    $vehicleId = $stmt->insert_id;

    /* ================= AUDIT LOG (NO FAIL GUARANTEE) ================= */
    $logUser = $_SESSION['user'] ?? [
        "id"   => null,
        "name" => "SYSTEM",
        "role" => "SYSTEM"
    ];

    if (function_exists('logActivity')) {
        logActivity(
            $conn,
            $logUser,
            "ADD_VEHICLE",
            "VEHICLE",
            "Added vehicle ($reg) at station $station",
            $vehicleId
        );
    }

    echo json_encode([
        "success" => true,
        "message" => "Vehicle Added Successfully"
    ]);

} else {
    echo json_encode([
        "success" => false,
        "message" => "Vehicle insert failed"
    ]);
}

$stmt->close();
mysqli_close($conn);
