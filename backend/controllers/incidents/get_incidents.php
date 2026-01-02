<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$file = "incidents.json";
$incidents = file_exists($file)
    ? json_decode(file_get_contents($file), true)
    : [];

/* 🔥 Get station from query */
$station = $_GET['station'] ?? null;

if ($station) {
    $station = strtolower(trim($station));

    // 🔒 filter incidents by stationName
    $incidents = array_values(array_filter($incidents, function ($inc) use ($station) {
        return isset($inc['coordinates']['stationName']) &&
               strtolower(trim($inc['coordinates']['stationName'])) === $station;
    }));
}

echo json_encode($incidents);
?>
