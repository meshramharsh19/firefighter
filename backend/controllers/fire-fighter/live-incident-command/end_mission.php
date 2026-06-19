<?php
header('Content-Type: application/json');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once realpath(__DIR__ . "/../../../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$incidentId = $data['incidentId'] ?? null;

if (!$incidentId) {
    echo json_encode([
        "success" => false,
        "error" => "incidentId required"
    ]);
    exit;
}

$conn->begin_transaction();

try {

    /*
    1️⃣ GET LATEST MISSION (DRONE + VEHICLE SOURCE)
    */
    $droneId = null;
    $vehicleId = null;

    $stmtInfo = $conn->prepare("
        SELECT drone_id, vehicle_id
        FROM drone_missions
        WHERE incident_id = ?
        ORDER BY id DESC
        LIMIT 1
    ");

    if (!$stmtInfo) {
        throw new Exception($conn->error);
    }

    $stmtInfo->bind_param("s", $incidentId);
    $stmtInfo->execute();
    $stmtInfo->bind_result($droneId, $vehicleId);
    $stmtInfo->fetch();
    $stmtInfo->close();


    /*
    2️⃣ END DRONE MISSION
    */
    $stmt1 = $conn->prepare("
        UPDATE drone_missions 
        SET end_time = NOW(),
            status = 'completed'
        WHERE incident_id = ? AND status = 'started'
    ");
    $stmt1->bind_param("s", $incidentId);
    $stmt1->execute();


    /*
    3️⃣ GET DRONE CODE
    */
    $droneCode = null;

    if (!empty($droneId)) {
        $stmtGet = $conn->prepare("
            SELECT drone_code
            FROM drones
            WHERE drone_code = ?
            LIMIT 1
        ");
        $stmtGet->bind_param("s", $droneId);
        $stmtGet->execute();
        $stmtGet->bind_result($droneCode);
        $stmtGet->fetch();
        $stmtGet->close();
    }


    /*
    4️⃣ UPDATE INCIDENT
    */
    $stmt2 = $conn->prepare("
        UPDATE incidents
        SET status = 'completed'
        WHERE id = ?
    ");
    $stmt2->bind_param("s", $incidentId);
    $stmt2->execute();


    /*
    5️⃣ UPDATE DRONE STATUS
    */
    if (!empty($droneId)) {
        $stmt3 = $conn->prepare("
            UPDATE drones
            SET status = 'Active',
                is_ready = 1,
                pilot_status = 'available'
            WHERE drone_code = ?
        ");
        $stmt3->bind_param("i", $droneId);
        $stmt3->execute();
    }


    /*
    6️⃣ UPDATE VEHICLE STATUS
    */
    if (!empty($vehicleId)) {
        $stmt4 = $conn->prepare("
            UPDATE vehicles
            SET status = 'Available'
            WHERE device_id = ?
        ");
        $stmt4->bind_param("i", $vehicleId);
        $stmt4->execute();
    }


    $conn->commit();

    echo json_encode([
        "success" => true,
        "message" => "Mission ended successfully",
        "drone_id" => $droneId,
        "vehicle_id" => $vehicleId
    ]);

} catch (Exception $e) {

    $conn->rollback();

    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>