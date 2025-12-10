<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../config/db.php";

$station = $_GET['station'] ?? null;

if(!$station){
    echo json_encode(["status"=>false,"message"=>"Station missing"]);
    exit;
}

$station = trim($station);

// 👇 Correct column name
$query = "SELECT * FROM incidents WHERE LOWER(TRIM(stationName)) = LOWER('$station') ORDER BY id DESC";

$result = mysqli_query($conn, $query);

if(!$result){
    echo json_encode(["status"=>false,"message"=>mysqli_error($conn)]);
    exit;
}

$incidents = [];

while ($row = mysqli_fetch_assoc($result)) {
    $incidents[] = [
        "id"         => $row["id"],
        "name"       => $row["name"],
        "location"   => $row["location"],
        "latitude"   => $row["latitude"],
        "longitude"  => $row["longitude"],
        "status"     => $row["status"],
        "time"       => $row["timeReported"],
        "isNewAlert" => $row["isNewAlert"],
        "station"    => $row["stationName"],
        "ackBy"      => $row["acknowledgedBy"]
    ];
}

echo json_encode(["status"=>true,"data"=>$incidents]);
