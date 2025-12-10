<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
require "../config/db.php";

// total drones
$totalSql = "SELECT COUNT(*) as total FROM drones";
$totalRes = $conn->query($totalSql);
$totalRow = $totalRes->fetch_assoc();

// not active (offline)
$inactiveSql = "SELECT COUNT(*) as cnt FROM drones WHERE status = 'offline'";
$inactiveRes = $conn->query($inactiveSql);
$inactiveRow = $inactiveRes->fetch_assoc();

// ready to fly
$readySql = "SELECT COUNT(*) as cnt FROM drones WHERE is_ready = 1";
$readyRes = $conn->query($readySql);
$readyRow = $readyRes->fetch_assoc();

echo json_encode([
    "total_drones"    => (int)$totalRow['total'],
    "inactive_drones" => (int)$inactiveRow['cnt'],
    "ready_drones"    => (int)$readyRow['cnt']
]);
?>
