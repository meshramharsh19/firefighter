<?php
header("Content-Type: application/json");
require_once realpath(__DIR__ . "/../../config/db.php");

$data = json_decode(file_get_contents('php://input'), true);

$type = $data['type'] ?? null;
$message = $data['message'] ?? null;
$created_by = $data['created_by'] ?? null;
$recipients = isset($data['recipients']) ? json_encode($data['recipients']) : null;
$payload = isset($data['data']) ? $data['data'] : null;

if (!$message) {
    echo json_encode(["success" => false, "error" => "Message required"]);
    exit;
}

// store data as JSON string if it's an array/object
$jsonData = null;
if ($payload !== null) {
    if (is_string($payload)) {
        $jsonData = $payload;
    } else {
        $jsonData = json_encode($payload, JSON_UNESCAPED_UNICODE);
    }
}

// Insert into notifications table
$stmt = $conn->prepare("INSERT INTO notifications (`type`, `message`, `created_by`, `data`, `is_read`) VALUES (?, ?, ?, ?, 1)");
$stmt->bind_param("ssss", $type, $message, $created_by, $jsonData);
$ok = $stmt->execute();

if ($ok) {
    $notification_id = $conn->insert_id;
    
    // Also insert into notification_logs for audit trail
    $stmt_log = $conn->prepare("INSERT INTO notification_logs (`notification_id`, `type`, `message`, `recipients`, `created_by`, `data`) VALUES (?, ?, ?, ?, ?, ?)");
    $recipients_str = $recipients;
    $stmt_log->bind_param("isssss", $notification_id, $type, $message, $recipients_str, $created_by, $jsonData);
    $stmt_log->execute();
    
    echo json_encode(["success" => true, "id" => $notification_id]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

?>
