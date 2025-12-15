<?php
// get_drones.php
error_reporting(0);
ini_set('display_errors', 0);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require "../config/db.php";

$raw = file_get_contents("php://input");
$input = json_decode($raw, true);
$stationFilter = isset($input["station"]) ? $input["station"] : null;

// Base query (table name: drones)
$sql = "SELECT * FROM drones";

if ($stationFilter) {
    $stationFilter = mysqli_real_escape_string($conn, $stationFilter);
    $sql .= " WHERE station = '$stationFilter'";
}

$sql .= " ORDER BY id DESC";

$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "error" => mysqli_error($conn),
        "query" => $sql
    ]);
    exit;
}

$drones = [];

while ($row = mysqli_fetch_assoc($result)) {

    $d = [
        "id" => $row["id"],

        // 🔥 CORRECT MAPPING (MOST IMPORTANT)
        "drone_code" => $row["drone_code"],     // DRN-001
        "name" => $row["drone_name"],         // Falcon X1

        "ward" => $row["ward"],
        "status" => $row["status"],
        "battery" => $row["battery"],
        "flight_hours" => $row["flight_hours"],
        "health_status" => $row["health_status"],
        "firmware_version" => $row["firmware_version"],
        "station" => $row["station"],
        "pilot_name" => $row["pilot_name"],
        "pilot_number" => $row["pilot_number"],
        "is_ready" => ((int)$row["is_ready"] === 1),

        // optional
        "_raw" => $row
    ];

    $drones[] = $d;
}

echo json_encode(["success" => true, "drones" => $drones], JSON_UNESCAPED_UNICODE);
