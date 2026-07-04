<?php
header("Content-Type: application/json");
require_once realpath(__DIR__ . "/../../config/db.php");

// Get query parameters
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 50;
$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
$type = isset($_GET['type']) ? $_GET['type'] : null;
$search = isset($_GET['search']) ? $_GET['search'] : null;

// Base query
$query = "SELECT * FROM notification_logs WHERE is_read = 1";
$params = [];
$types = "";

// Filter by type if provided
if ($type) {
    $query .= " AND type = ?";
    $params[] = $type;
    $types .= "s";
}

// Filter by search term in message if provided
if ($search) {
    $query .= " AND message LIKE ?";
    $params[] = "%" . $search . "%";
    $types .= "s";
}

// Get total count
$count_query = "SELECT COUNT(*) as total FROM notification_logs WHERE is_read = 1";
if ($type) {
    $count_query .= " AND type = ?";
}
if ($search) {
    $count_query .= " AND message LIKE ?";
}

$count_stmt = $conn->prepare($count_query);
if (!empty($params)) {
    $count_stmt->bind_param($types, ...$params);
}
$count_stmt->execute();
$count_result = $count_stmt->get_result();
$total = $count_result->fetch_assoc()['total'];

// Order and paginate
$query .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
$params[] = $limit;
$params[] = $offset;
$types .= "ii";

$stmt = $conn->prepare($query);
if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$result = $stmt->get_result();

$logs = [];
while ($row = $result->fetch_assoc()) {
    // Parse JSON data if present
    if ($row['data']) {
        $row['data'] = json_decode($row['data'], true);
    }
    if ($row['recipients']) {
        $row['recipients'] = json_decode($row['recipients'], true);
    }
    $logs[] = $row;
}

echo json_encode([
    "success" => true,
    "data" => $logs,
    "total" => $total,
    "limit" => $limit,
    "offset" => $offset
]);
?>
