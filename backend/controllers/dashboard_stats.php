<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../config/db.php";

/* ---------------- TOTAL DRONES ---------------- */
$totalSql = "SELECT COUNT(*) AS total FROM drones";
$totalRes = mysqli_query($conn, $totalSql);
$totalRow = mysqli_fetch_assoc($totalRes);

/* ---------------- NOT ACTIVE (OFFLINE) ---------------- */
$inactiveSql = "SELECT COUNT(*) AS cnt FROM drones WHERE status = 'offline'";
$inactiveRes = mysqli_query($conn, $inactiveSql);
$inactiveRow = mysqli_fetch_assoc($inactiveRes);

/* ---------------- READY TO FLY (NOT OFFLINE) ---------------- */
$readySql = "SELECT COUNT(*) AS cnt FROM drones WHERE status != 'offline'";
$readyRes = mysqli_query($conn, $readySql);
$readyRow = mysqli_fetch_assoc($readyRes);

/* ---------------- RESPONSE ---------------- */
echo json_encode([
    "total_drones"      => (int) $totalRow['total'],
    "inactive_drones"   => (int) $inactiveRow['cnt'],
    "ready_drones"      => (int) $readyRow['cnt']
]);
?>
