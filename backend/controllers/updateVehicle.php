<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT, POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization");

// DB Connection
include "../config/db.php";  // apna db file include

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode(["success" => false, "message" => "Vehicle ID required"]);
    return;
}

$id = $data['id'];
$name = $data['name'];
$type = $data['type'];
$registration = $data['registration'];
$device_id = $data['device_id'];
$location = $data['location'];
$ward = $data['ward'];
$status = $data['status'];

$query = "UPDATE vehicles SET 
    name='$name',
    type='$type',
    registration='$registration',
    device_id='$device_id',
    location='$location',
    ward='$ward',
    status='$status'
    WHERE id='$id'";

if (mysqli_query($conn, $query)) {
    echo json_encode(["success" => true, "message" => "Vehicle updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "DB Error"]);
}
?>
