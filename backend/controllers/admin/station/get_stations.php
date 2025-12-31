<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

require __DIR__ . "/../../../config/db.php";


/*
Assuming table: demo_station
Columns:
- id
- station_name
- location_name
- latitude
- longitude
*/

$sql = "
  SELECT 
    id,
    station_name,
    location_name,
    latitude,
    longitude
  FROM demo_station
  ORDER BY station_name ASC
";

$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

$stations = [];

while ($row = $result->fetch_assoc()) {
  $stations[] = [
    "id" => (int)$row["id"],
    "station_name" => $row["station_name"],
    "location_name" => $row["location_name"],
    "lat" => (float)$row["latitude"],
    "lng" => (float)$row["longitude"]
  ];
}

echo json_encode([
  "success" => true,
  "count" => count($stations),
  "data" => $stations
]);
