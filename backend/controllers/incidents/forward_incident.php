<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

/* ===============================
   Read JSON input
================================ */
$input = json_decode(file_get_contents("php://input"), true);

$incidentId   = $input['incidentId']   ?? null;
$newStation   = $input['stationName']  ?? null;

if (!$incidentId || !$newStation) {
    echo json_encode([
        "success" => false,
        "message" => "incidentId and stationName required"
    ]);
    exit;
}

$file = "incidents.json";

if (!file_exists($file)) {
    echo json_encode([
        "success" => false,
        "message" => "incidents.json not found"
    ]);
    exit;
}

$incidents = json_decode(file_get_contents($file), true);
$found = false;

/* ===============================
   Update incident station
================================ */
foreach ($incidents as &$incident) {
    if ($incident['id'] === $incidentId) {

        // 🔥 UPDATE STATION NAME
        $incident['coordinates']['stationName'] = $newStation;

        // Optional but recommended
        $incident['status'] = "forwarded";
        $incident['isNewAlert'] = true;

        $found = true;
        break;
    }
}

if (!$found) {
    echo json_encode([
        "success" => false,
        "message" => "Incident not found"
    ]);
    exit;
}

/* ===============================
   Save back to file
================================ */
file_put_contents($file, json_encode($incidents, JSON_PRETTY_PRINT));

echo json_encode([
    "success" => true,
    "message" => "Incident forwarded successfully",
    "incidentId" => $incidentId,
    "newStation" => $newStation
]);
