<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../config/db.php";

$sql = "SELECT DISTINCT ward FROM drones ORDER BY ward ASC";
$result = $conn->query($sql);

$wards = [];
while ($row = $result->fetch_assoc()) {
    $wards[] = $row['ward'];
}

echo json_encode($wards);
?>
