<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];

$sql = "UPDATE users SET
  fullName = ?,
  address = ?,
  email = ?,
  phone = ?,
  designation = ?,
  role = ?,
  station = ?
WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
  "sssssssi",
  $data["fullName"],
  $data["address"],
  $data["email"],
  $data["phone"],
  $data["designation"],
  $data["role"],
  $data["station"],
  $id
);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "message" => $conn->error]);
}
