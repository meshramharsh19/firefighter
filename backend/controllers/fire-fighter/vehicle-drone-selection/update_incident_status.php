<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

require_once realpath(__DIR__ . "/../../../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$incidentId      = $data['incidentId'] ?? '';
$droneId         = $data['droneId'] ?? '';
$vehicleDeviceId = $data['vehicleDeviceId'] ?? '';

if (empty($incidentId)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid incidentId"
    ]);
    exit;
}

$conn->begin_transaction();

try {

    // 1. Update Incident
    $incidentSql = "UPDATE incidents
                    SET status = 'Active',
                        isNewAlert = 0
                    WHERE id = ?
                    LIMIT 1";

    $incidentStmt = $conn->prepare($incidentSql);
    $incidentStmt->bind_param("s", $incidentId);
    $incidentStmt->execute();

    // 2. Update Drone Status
    if (!empty($droneId)) {
        $droneSql = "UPDATE drones
                     SET status = 'On-Mission'
                     WHERE drone_code = ?";

        $droneStmt = $conn->prepare($droneSql);
        $droneStmt->bind_param("s", $droneId);
        $droneStmt->execute();
    }

    // 3. Update Vehicle Status
    if (!empty($vehicleDeviceId)) {
        $vehicleSql = "UPDATE vehicles
                       SET status = 'On-Mission'
                       WHERE device_id = ?";

        $vehicleStmt = $conn->prepare($vehicleSql);
        $vehicleStmt->bind_param("s", $vehicleDeviceId);
        $vehicleStmt->execute();
    }

    $conn->commit();

    echo json_encode([
        "success" => true,
        "message" => "Incident, drone and vehicle updated successfully"
    ]);

} catch (Exception $e) {

    $conn->rollback();

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}