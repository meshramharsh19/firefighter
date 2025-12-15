<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../config/db.php";

if(!isset($_GET["station"])) {
  echo json_encode(["status" => false, "error" => "Station not provided"]);
  exit;
}

$station = $_GET["station"];

$sql = "SELECT id, fullName, email, phone, designation, status 
        FROM users 
        WHERE role='pilot' AND station='$station'";

$result = mysqli_query($conn, $sql);
$pilots = [];

while($row = mysqli_fetch_assoc($result)){
  $pilots[] = $row;
}

echo json_encode($pilots);
mysqli_close($conn);
?>
