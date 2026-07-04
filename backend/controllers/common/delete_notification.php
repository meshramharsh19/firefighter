<?php
header("Content-Type: application/json");
require_once realpath(__DIR__ . "/../../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? $_POST['id'] ?? $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(["success" => false, "error" => "id required"]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM notifications WHERE id = ?");
$stmt->bind_param("i", $id);
$success = $stmt->execute();

if (!$success) {
    echo json_encode(["success" => false, "error" => $stmt->error]);
    exit;
}

echo json_encode(["success" => true]);
