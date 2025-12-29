<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require "../../config/db.php";

$data = $_POST;

$sql = "INSERT INTO drones 
(drone_code, drone_name, ward, status, battery, flight_hours, health_status, firmware_version, is_ready, station)
VALUES (?,?,?,?,?,?,?,?,?,?)";

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

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "error" => $conn->error]);
}
