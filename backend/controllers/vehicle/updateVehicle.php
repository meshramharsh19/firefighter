<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


require "../../config/db.php"; 


$data = json_decode(file_get_contents("php://input"), true);

// 🔒 Validate payload
if (!$data || !isset($data['id'])) {
    echo json_encode([
        "success" => false,
        "message" => "Vehicle ID required"
    ]);
    exit;
}

$id           = (int)$data['id'];
$name         = trim($data['name'] ?? "");
$type         = trim($data['type'] ?? "");
$registration = trim($data['registration'] ?? "");
$device_id    = trim($data['device_id'] ?? "");
$location     = trim($data['location'] ?? "");
$station      = trim($data['station'] ?? "");
$status       = trim($data['status'] ?? "");

// 🔒 Basic required validation
if (!$name || !$type || !$registration || !$device_id || !$station) {
    echo json_encode([
        "success" => false,
        "message" => "Required fields missing"
    ]);
    exit;
}

$sql = "UPDATE vehicles SET
    name='$name',
    type='$type',
    registration='$registration',
    device_id='$device_id',
    location='$location',
    station='$station',
    status='$status'
    WHERE id=$id";

if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "success" => true,
        "message" => "Vehicle updated successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => mysqli_error($conn)
    ]);
}

mysqli_close($conn);
