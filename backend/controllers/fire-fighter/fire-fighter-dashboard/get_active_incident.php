<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once realpath(__DIR__ . "/../../../config/db.php");

$station = $_GET['station'] ?? null;

if ($station) {

    $sql = "SELECT *
            FROM incidents
            WHERE LOWER(stationName) = LOWER(?)
              AND status = 'active'
            ORDER BY timeReported DESC";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $station);

} else {

    $sql = "SELECT *
            FROM incidents
            WHERE status = 'active'
            ORDER BY timeReported DESC";

    $stmt = $conn->prepare($sql);
}

$stmt->execute();
$result = $stmt->get_result();

$data = [];

while ($row = $result->fetch_assoc()) {

    $data[] = [
        "id" => $row["id"],
        "incidentId" => $row["incidentId"] ?? "",
        "name" => $row["name"],
        "location" => $row["location"],
        "status" => $row["status"],
        "timeReported" => $row["timeReported"],
        "stationName" => $row["stationName"],

        "coordinates" => [
            "lat" => (float)$row["latitude"],
            "lng" => (float)$row["longitude"]
        ]
    ];
}

echo json_encode([
    "success" => true,
    "count" => count($data),
    "incidents" => $data
]);