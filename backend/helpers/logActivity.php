<?php

if (!function_exists('logActivity')) {

    function logActivity($conn, $user, $action, $module, $description, $entityId = null) {

        if (!$conn || !$action || !$module || !$description) {
            return;
        }

        if (!is_array($user)) {
            $user = [];
        }

        $userId   = $user['id'] ?? null;

        $userName =
            $user['fullName'] ??
            $user['name'] ??
            $user['email'] ??
            'SYSTEM';

        $role =
            $user['role'] ??
            $user['designation'] ??
            'SYSTEM';

        $ip = $_SERVER['REMOTE_ADDR'] ?? 'N/A';

        $stmt = $conn->prepare("
            INSERT INTO activity_logs
            (user_id, user_name, role, action, module, description, entity_id, ip_address)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");

        if (!$stmt) return;

        $stmt->bind_param(
            "isssssis",
            $userId,
            $userName,
            $role,
            $action,
            $module,
            $description,
            $entityId,
            $ip
        );

        $stmt->execute();
        $stmt->close();
    }
}
