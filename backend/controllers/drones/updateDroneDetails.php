<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../../config/db.php";


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$drone_code      = $_POST['drone_code'] ?? '';
$flight_hours    = $_POST['flight_hours'] ?? '';
$health_status   = $_POST['health_status'] ?? '';
$firmware_version= $_POST['firmware_version'] ?? '';
$status          = $_POST['status'] ?? '';

if (!$drone_code) {
    echo json_encode(["success" => false, "message" => "Drone code missing"]);
    exit;
}

try {
    $stmt = $conn->prepare("
        UPDATE drones 
        SET 
            flight_hours = ?, 
            health_status = ?, 
            firmware_version = ?, 
            status = ?
        WHERE drone_code = ?
    ");

    $stmt->bind_param(
        "dssss",
        $flight_hours,
        $health_status,
        $firmware_version,
        $status,
        $drone_code
    );

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Update failed"
        ]);
    }

    $stmt->close();
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Server error"
    ]);
}

$conn->close();
