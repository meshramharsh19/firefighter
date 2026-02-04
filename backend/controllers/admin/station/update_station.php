<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require "../../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? 0;
$name = $data['stationName'] ?? '';
$code = $data['code'] ?? '';
$lat = $data['lat'] ?? '';
$lng = $data['lng'] ?? '';

if (!$id || !$name || !$code || !$lat || !$lng) {
    echo json_encode(["status" => false, "message" => "Missing fields"]);
    exit;
}

$stmt = $conn->prepare("UPDATE fire_station SET station_name=?, latitude=?, longitude=? WHERE id=?");
$stmt->bind_param("sddi", $name, $lat, $lng, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => true]);
} else {
    echo json_encode(["status" => false, "message" => "Update failed"]);
}

$stmt->close();
$conn->close();
?>
