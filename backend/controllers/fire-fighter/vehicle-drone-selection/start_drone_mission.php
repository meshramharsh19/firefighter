<?php
header("Content-Type: application/json");
require_once realpath(__DIR__ . "/../../../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$incident_id = $data['incident_id'] ?? null;
$drone_id = $data['drone_id'] ?? null;
$vehicle_id = $data['vehicle_id'] ?? null;

if (!$incident_id || !$drone_id || !$vehicle_id) {
    echo json_encode([
        "success" => false,
        "message" => "Missing data"
    ]);
    exit;
}

$sql = "INSERT INTO drone_missions
        (incident_id, drone_id, vehicle_id, start_time, status)
        VALUES (?, ?, ?, NOW(), 'started')";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sss",
    $incident_id,
    $drone_id,
    $vehicle_id
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "mission_id" => $stmt->insert_id
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>