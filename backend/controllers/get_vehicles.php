<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../config/db.php";

// Read JSON input (for station filter)
$raw = file_get_contents("php://input");
$input = json_decode($raw, true);
$stationFilter = isset($input["station"]) ? $input["station"] : null;

// Base query
$sql = "SELECT * FROM vehicles";

if ($stationFilter) {
    $stationFilter = mysqli_real_escape_string($conn, $stationFilter);
    $sql .= " WHERE station = '$stationFilter'";
}

$sql .= " ORDER BY id DESC";

$result = mysqli_query($conn, $sql);

// If SQL failed → return error
if (!$result) {
    echo json_encode([
        "success" => false,
        "error" => mysqli_error($conn),
        "query" => $sql
    ]);
    exit;
}

$vehicles = [];

while ($row = mysqli_fetch_assoc($result)) {

    // FIXED: Correct availability field
    $row["vehicle_status"] = $row["vehicle_availability_status"];

    // Since no driver_id exists in table → return null
    $row["driver_id"] = null;
    $row["driver_name"] = null;
    $row["driver_status"] = null;

    $vehicles[] = $row;
}

echo json_encode($vehicles);
?>
