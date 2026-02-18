<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require "../../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$phone = $data["phone"] ?? "";

$stmt = $conn->prepare("SELECT * FROM users WHERE phone = ?");
$stmt->bind_param("s", $phone);
$stmt->execute();
$result = $stmt->get_result();

$user = $result->fetch_assoc();

if (!$user) {
    echo json_encode(["success" => false]);
    exit;
}

if ($user["status"] == 0) {
    echo json_encode([
        "success" => false,
        "deactivated" => true,
        "reason" => $user["deactivation_reason"]
    ]);
    exit;
}

$_SESSION["user"] = [
    "id" => $user["id"],
    "fullName" => $user["fullName"],
    "role" => $user["role"],
    "station" => $user["station"],
    "designation" => $user["designation"]
];

echo json_encode([
    "success" => true,
    "user" => $user
]);
