<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$file = "incidents.json";
$incidents = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

echo json_encode($incidents);
?>
