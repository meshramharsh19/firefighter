<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require "../../config/db.php";

$sql = "SELECT DISTINCT station FROM drones
        WHERE station IS NOT NULL AND station != ''
        ORDER BY station ASC";

$result = mysqli_query($conn, $sql);

$stations = [];
while ($row = mysqli_fetch_assoc($result)) {
    $stations[] = $row["station"];
}

echo json_encode($stations);
mysqli_close($conn);
