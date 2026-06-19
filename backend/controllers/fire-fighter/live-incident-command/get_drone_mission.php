<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);
ini_set('display_errors', 1);

/*
 * Adjust path if needed
 */
require_once(__DIR__ . "/../../../config/db.php");

/*
 * Verify connection
 */
if (!isset($conn)) {
    echo json_encode([
        "success" => false,
        "error" => "Database connection not found. Check db.php"
    ]);
    exit;
}

$sql = "
    SELECT
        id,
        drone_id,
        incident_id,
        start_time,
        end_time,
        status,
        path_data,
        created_at,
        vehicle_id
    FROM drone_missions
    ORDER BY created_at DESC
";

$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "error" => mysqli_error($conn)
    ]);
    exit;
}

$missions = [];

while ($row = mysqli_fetch_assoc($result)) {
    $missions[] = $row;
}

echo json_encode([
    "success" => true,
    "count" => count($missions),
    "data" => $missions
]);