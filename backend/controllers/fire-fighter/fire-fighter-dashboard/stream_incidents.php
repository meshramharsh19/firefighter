<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('X-Accel-Buffering: no');
header('Access-Control-Allow-Origin: *');

if (ob_get_level()) ob_end_clean();

require_once realpath(__DIR__ . "/../../../config/db.php");

$station = $_GET['station'] ?? null;
$lastHash = '';

function sendEvent(string $data): void {
    echo "data: " . $data . "\n\n";
    flush();
}

while (true) {
    if (connection_aborted()) break;

    if ($station) {
        $sql = "SELECT * FROM incidents
                WHERE LOWER(stationName) = LOWER(?)
                  AND status = 'new'
                  AND isNewAlert = 1
                ORDER BY timeReported DESC";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $station);
    } else {
        $sql = "SELECT * FROM incidents
                WHERE status = 'new'
                  AND isNewAlert = 1
                ORDER BY timeReported DESC";
        $stmt = $conn->prepare($sql);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = [
            "id"          => $row["id"],
            "name"        => $row["name"],
            "location"    => $row["location"],
            "status"      => $row["status"],
            "timeReported" => $row["timeReported"],
            "isNewAlert"  => (int)$row["isNewAlert"],
            "coordinates" => [
                "lat"         => (float)$row["latitude"],
                "lng"         => (float)$row["longitude"],
                "stationName" => $row["stationName"]
            ]
        ];
    }

    $stmt->close();

    $hash = md5(serialize($data));
    if ($hash !== $lastHash) {
        sendEvent(json_encode($data));
        $lastHash = $hash;
    }

    // Keep-alive comment so connection doesn't time out
    echo ": ping\n\n";
    flush();

    sleep(2);
}