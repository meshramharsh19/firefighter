<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

/* OPTIONS preflight */
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require "../../config/db.php";

/* 🔐 AUTH CHECK (OPTIONAL BUT RECOMMENDED) */
if (!isset($_SESSION['user'])) {
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized"
    ]);
    exit;
}

/* 🎯 QUERY PARAMS */
$page      = max(1, intval($_GET['page'] ?? 1));
$limit     = max(10, intval($_GET['limit'] ?? 20));
$search    = trim($_GET['search'] ?? "");
$module    = trim($_GET['module'] ?? "");
$action    = trim($_GET['action'] ?? "");
$offset    = ($page - 1) * $limit;

/* 🔎 BASE QUERY */
$where = "WHERE 1=1";

/* 🔍 SEARCH */
if ($search !== "") {
    $search = mysqli_real_escape_string($conn, $search);
    $where .= " AND (
        user_name LIKE '%$search%' OR
        description LIKE '%$search%' OR
        action LIKE '%$search%'
    )";
}

/* 📦 MODULE FILTER */
if ($module !== "") {
    $module = mysqli_real_escape_string($conn, $module);
    $where .= " AND module = '$module'";
}

/* ⚡ ACTION FILTER */
if ($action !== "") {
    $action = mysqli_real_escape_string($conn, $action);
    $where .= " AND action = '$action'";
}

/* 🔢 TOTAL COUNT */
$countSql = "SELECT COUNT(*) as total FROM activity_logs $where";
$countRes = mysqli_query($conn, $countSql);
$total    = mysqli_fetch_assoc($countRes)['total'] ?? 0;

/* 📄 FETCH LOGS */
$sql = "
    SELECT 
        id,
        user_name,
        role,
        module,
        action,
        description,
        ip_address,
        created_at
    FROM activity_logs
    $where
    ORDER BY created_at DESC
    LIMIT $limit OFFSET $offset
";

$result = mysqli_query($conn, $sql);

$logs = [];
while ($row = mysqli_fetch_assoc($result)) {
    $logs[] = $row;
}

/* ✅ RESPONSE */
echo json_encode([
    "success" => true,
    "page" => $page,
    "limit" => $limit,
    "total" => intval($total),
    "pages" => ceil($total / $limit),
    "logs" => $logs
]);

mysqli_close($conn);
