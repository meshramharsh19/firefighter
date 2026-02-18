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

error_log("=== New Poll Request ===");
error_log("Frontend Last Count: " . $lastCount);

while (true) {

    $result = mysqli_query($conn, "
        SELECT COUNT(*) AS count
        FROM incidents
        WHERE status = 'new'
        AND isNewAlert = 1
    ");

    if (!$result) {
        error_log("DB ERROR: " . mysqli_error($conn));
        echo json_encode(["error" => "Database error"]);
        exit;
    }

    $row = mysqli_fetch_assoc($result);
    $currentCount = (int)$row['count'];

    mysqli_free_result($result);

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
