<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-cache, must-revalidate");

require "../../../config/db.php";

set_time_limit(0);

$timeout = 15;
$pollInterval = 2;
$startTime = time();

$lastCount = isset($_GET['lastCount']) ? (int)$_GET['lastCount'] : -1;

if (!$station) {
    echo json_encode(["count" => 0]);
    exit;
}

error_log("=== New Poll Request ===");
error_log("Station: " . $station);
error_log("Frontend Last Count: " . $lastCount);

while (true) {

    // 🔥 STATION-WISE COUNT
    $stmt = $conn->prepare("
        SELECT COUNT(*) AS count
        FROM incidents
        WHERE status = 'new'
          AND isNewAlert = 1
          AND LOWER(stationName) = LOWER(?)
    ");

    if (!$stmt) {
        error_log("Prepare failed: " . $conn->error);
        echo json_encode(["error" => "Query prepare failed"]);
        exit;
    }

    $stmt->bind_param("s", $station);
    $stmt->execute();
    $result = $stmt->get_result();

    $row = $result->fetch_assoc();
    $currentCount = (int)$row['count'];

    $stmt->close();

    error_log("LastCount: $lastCount | CurrentCount: $currentCount");

    if ($currentCount !== $lastCount) {
        error_log("Count changed. Returning response.");
        echo json_encode(['count' => $currentCount]);
        exit;
    }

    if ((time() - $startTime) >= $timeout) {
        error_log("Timeout reached. Returning current count.");
        echo json_encode(['count' => $currentCount]);
        exit;
    }

    sleep($pollInterval);
}
