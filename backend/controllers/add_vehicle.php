<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$name     = $data["name"];
$type     = $data["type"];
$reg      = $data["registrationNumber"];
$deviceId = $data["deviceId"];
$location = $data["location"];
$ward     = $data["ward"];
$status   = $data["status"];

$sql = "INSERT INTO vehicles (name,type,registration,device_id,location,ward,status) 
        VALUES ('$name','$type','$reg','$deviceId','$location','$ward','$status')";

if(mysqli_query($conn, $sql)){
    echo json_encode(["success"=>true,"message"=>"Vehicle Added Successfully"]);
}else{
    echo json_encode(["success"=>false,"message"=>"Failed to Add Vehicle"]);
}
?>
