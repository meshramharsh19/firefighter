<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../../config/db.php";

// Fetch distinct station
$sql = "SELECT DISTINCT station FROM drones ORDER BY station ASC";
$result = mysqli_query($conn, $sql);

$wards = [];
while ($row = mysqli_fetch_assoc($result)) {
    $stations[] = $row['station'];
}

echo json_encode($stations);

mysqli_close($conn);
?>
