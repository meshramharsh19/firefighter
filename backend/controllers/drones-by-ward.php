<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../config/db.php";

$ward = $_GET['ward'] ?? '';

$sql = "SELECT id, drone_code, drone_name, status, battery, is_ready FROM drones WHERE ward = '$ward'";
$result = $conn->query($sql);

$drones = [];
while($row = $result->fetch_assoc()){
    $drones[] = $row;
}

echo json_encode($drones);
?>
