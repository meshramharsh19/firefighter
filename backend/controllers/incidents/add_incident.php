<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

if(!$data || !isset($data['id'])) {
    echo json_encode(["success"=>false, "message"=>"Invalid payload"]);
    exit;
}

$file = "incidents.json";
$incidents = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

// new incident add
$data['isNewAlert'] = true;  // UI highlight + audio
$incidents[] = $data;

file_put_contents($file, json_encode($incidents, JSON_PRETTY_PRINT));

echo json_encode(["success"=>true, "message"=>"Incident added"]);
?>
