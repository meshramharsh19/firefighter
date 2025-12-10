<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

header("Content-Type: application/json");
require_once("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$fullName = $data["fullName"];
$address  = $data["address"];
$email    = $data["email"];
$phone    = $data["phone"];
$designation = $data["designation"];
$role     = $data["role"];
$station  = $data["station"];

$sql = "INSERT INTO users(fullName, address, email, phone, designation, role, station)
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $fullName, $address, $email, $phone, $designation, $role, $station);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "User Registered Successfully"]);
} else {
    echo json_encode(["success" => false, "message" => $conn->error]);
}
