<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// ============================
// SHOW PHP ERRORS (DEBUG)
// ============================
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ============================
// DB CONNECTION
// ============================
require_once realpath(
    __DIR__ . "/../../../config/db.php"
);

// ============================
// GET INCIDENT COORDINATES
// ============================
$incidentLat = isset($_GET['lat'])
    ? floatval($_GET['lat'])
    : null;

$incidentLng = isset($_GET['lng'])
    ? floatval($_GET['lng'])
    : null;

// ============================
// GET CURRENT USER STATION
// ============================
$currentStation = isset($_GET['currentStation'])
    ? trim($_GET['currentStation'])
    : "";

// ============================
// VALIDATE INPUT
// ============================
if (!$incidentLat || !$incidentLng) {

    echo json_encode([
        "error" => "Missing incident coordinates"
    ]);

    exit;
}

// ============================
// HAVERSINE DISTANCE FUNCTION
// ============================
function calculateDistance(
    $lat1,
    $lon1,
    $lat2,
    $lon2
) {

    $earthRadius = 6371;

    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);

    $a =
        sin($dLat / 2) *
        sin($dLat / 2) +
        cos(deg2rad($lat1)) *
        cos(deg2rad($lat2)) *
        sin($dLon / 2) *
        sin($dLon / 2);

    $c = 2 * atan2(
        sqrt($a),
        sqrt(1 - $a)
    );

    return $earthRadius * $c;
}

// ============================
// FETCH VEHICLE COUNTS
// ONLY AVAILABLE VEHICLES
// ============================
$vehicleMap = [];

$vehicleSql = "
    SELECT
        station,
        COUNT(*) as vehicles
    FROM vehicles
    WHERE LOWER(status) = 'available'
    GROUP BY station
";

$vehicleResult = $conn->query($vehicleSql);

if ($vehicleResult) {

    while ($vehicleRow = $vehicleResult->fetch_assoc()) {

        $vehicleMap[
            trim($vehicleRow['station'])
        ] = intval($vehicleRow['vehicles']);
    }
}

// ============================
// FETCH DRONE COUNTS
// ONLY ACTIVE DRONES
// ============================
$droneMap = [];

$droneSql = "
    SELECT
        station,
        COUNT(*) as drones
    FROM drones
    WHERE LOWER(status) = 'active'
    GROUP BY station
";

$droneResult = $conn->query($droneSql);

if ($droneResult) {

    while ($droneRow = $droneResult->fetch_assoc()) {

        $droneMap[
            trim($droneRow['station'])
        ] = intval($droneRow['drones']);
    }
}

// ============================
// FETCH FIRE STATIONS
// ============================
$sql = "SELECT * FROM fire_station";

$result = $conn->query($sql);

if (!$result) {

    echo json_encode([
        "error" => $conn->error
    ]);

    exit;
}

// ============================
// BUILD INITIAL STATION LIST
// USING HAVERSINE
// ============================
$stations = [];

while ($row = $result->fetch_assoc()) {

    // ============================
    // SKIP CURRENT USER STATION
    // ============================
    if (
        strtolower(trim($row['station_name'])) ===
        strtolower(trim($currentStation))
    ) {
        continue;
    }

    $stationLat = floatval($row['latitude']);
    $stationLng = floatval($row['longitude']);

    // ============================
    // FAST DISTANCE
    // ============================
    $distance = calculateDistance(
        $incidentLat,
        $incidentLng,
        $stationLat,
        $stationLng
    );

    $stationName = trim(
        $row['station_name']
    );

    $stations[] = [
        "name" => $stationName,

        "lat" => $stationLat,

        "lng" => $stationLng,

        "distance" => $distance,

        "vehicles" =>
            $vehicleMap[$stationName]
            ?? 0,

        "drones" =>
            $droneMap[$stationName]
            ?? 0
    ];
}

// ============================
// SORT BY HAVERSINE DISTANCE
// ============================
usort($stations, function ($a, $b) {

    return $a['distance'] <=> $b['distance'];
});

// ============================
// KEEP TOP 8 FOR OSRM CHECK
// ============================
$stations = array_slice($stations, 0, 8);

// ============================
// GET REAL ROAD DISTANCE
// FOR TOP 8 ONLY
// ============================
foreach ($stations as &$station) {

    $url =
        "https://router.project-osrm.org/route/v1/driving/" .
        "$incidentLng,$incidentLat;" .
        "{$station['lng']},{$station['lat']}" .
        "?overview=false";

    $distance = null;
    $duration = null;

    $response = @file_get_contents($url);

    if ($response !== false) {

        $data = json_decode($response, true);

        if (
            isset($data['routes']) &&
            isset($data['routes'][0])
        ) {

            $distance =
                $data['routes'][0]['distance'] / 1000;

            $duration =
                $data['routes'][0]['duration'] / 60;
        }
    }

    // ============================
    // UPDATE REAL ROAD DISTANCE
    // ============================
    if ($distance !== null) {

        $station['distance'] = round(
            $distance,
            2
        );

        $station['eta'] = round(
            $duration,
            1
        );

    } else {

        $station['distance'] = round(
            $station['distance'],
            2
        );

        $station['eta'] = null;
    }
}

// ============================
// FINAL SORT USING REAL
// ROAD DISTANCE
// ============================
usort($stations, function ($a, $b) {

    return $a['distance'] <=> $b['distance'];
});

// ============================
// FINAL TOP 3
// ============================
$stations = array_slice($stations, 0, 3);

// ============================
// RETURN JSON
// ============================
echo json_encode([
    "stations" => $stations
]);