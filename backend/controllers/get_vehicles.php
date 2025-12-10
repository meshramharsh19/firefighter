<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../config/db.php";

$sql = "SELECT * FROM vehicles ORDER BY id DESC";
$result = mysqli_query($conn, $sql);

$vehicles = [];

while($row = mysqli_fetch_assoc($result)){
    $vehicles[] = $row;
}

echo json_encode($vehicles);
?>
