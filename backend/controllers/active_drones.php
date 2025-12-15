<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../config/db.php";

$sql = "SELECT 
            drone_code,
            drone_name,
            ward AS location,
            status,
            battery
        FROM drones
        ";

$result = $conn->query($sql);

$data = [];
$response = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
