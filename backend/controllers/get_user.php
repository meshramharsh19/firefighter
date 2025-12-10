<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");
require_once("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);
$phone = $data["phone"];

$sql = "SELECT id, fullName, address, email, phone, designation, role, station, status, deactivation_reason, created_at 
        FROM users 
        WHERE phone = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $phone);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $user["id"],
            "fullName" => $user["fullName"],
            "address" => $user["address"],
            "email" => $user["email"],
            "phone" => $user["phone"],
            "designation" => $user["designation"],
            "role" => $user["role"],
            "station" => $user["station"],
            "status" => (int)$user["status"],                         // ACTIVE / INACTIVE
            "deactivation_reason" => $user["deactivation_reason"],  // REASON
            "created_at" => $user["created_at"]
        ]
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "User not found"
    ]);
}
?>
