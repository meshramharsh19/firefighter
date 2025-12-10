<?php
$host = "localhost";
$user = "root";
$pass = "";  // XAMPP default
$db   = "fire-fighter";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Database connection failed"]));
}
?>
