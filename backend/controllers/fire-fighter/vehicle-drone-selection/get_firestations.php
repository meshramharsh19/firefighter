<?php
// get_firestations.php
error_reporting(0);
ini_set('display_errors', 0);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require "../../../config/db.php";

// We will take distinct station names from vehicles and drones (safe if you don't have a dedicated stations table)
$stations = [];

// From vehicles
$sqlV = "SELECT DISTINCT station FROM vehicles WHERE station IS NOT NULL AND station <> ''";
$resV = mysqli_query($conn, $sqlV);
if ($resV) {
    while ($r = mysqli_fetch_assoc($resV)) {
        $stations[] = $r["station"];
    }
}

// From drones (merge only new ones)
$sqlD = "SELECT DISTINCT station FROM drones WHERE station IS NOT NULL AND station <> ''";
$resD = mysqli_query($conn, $sqlD);
if ($resD) {
    while ($r = mysqli_fetch_assoc($resD)) {
        if (!in_array($r["station"], $stations, true)) {
            $stations[] = $r["station"];
        }
    }
}

// Build structured response
$stationObjs = array_map(function($s, $i) {
    return [
        "id" => $i + 1,
        "name" => $s
    ];
}, $stations, array_keys($stations));

echo json_encode(["success" => true, "stations" => $stationObjs], JSON_UNESCAPED_UNICODE);
