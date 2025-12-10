<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../config/db.php";

$sql = "
    SELECT 
        d.drone_code,
        d.drone_name,
        d.ward,
        d.status,
        d.battery,
        g.latitude,
        g.longitude,
        g.timestamp
    FROM drones d
    LEFT JOIN (
        SELECT drone_code, latitude, longitude, timestamp
        FROM drone_gps_logs
        ORDER BY timestamp DESC
    ) g ON d.drone_code = g.drone_code
";

$result = $conn->query($sql);
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
