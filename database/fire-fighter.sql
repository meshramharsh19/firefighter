-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2026 at 11:26 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fire-fighter`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `action` varchar(100) DEFAULT NULL,
  `module` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `entity_id` int(11) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `user_id`, `user_name`, `role`, `action`, `module`, `description`, `entity_id`, `ip_address`, `created_at`) VALUES
(6, 1, 'Harsh Meshram', 'Admin', 'ADD_VEHICLE', 'VEHICLE', 'Added vehicle (DL-04-CD-982) at station Katraj Fire Station', 34, '::1', '2025-12-23 10:15:07'),
(7, 1, 'Harsh Meshram', 'Admin', 'ADD_USER', 'USER', 'Created new user (Akash Masram) with role Fire Station Command Control at station Station 1', 7, '::1', '2025-12-26 07:19:48'),
(8, 1, 'Harsh Meshram', 'Admin', 'ADD_VEHICLE', 'VEHICLE', 'Added vehicle (DL-04-CD-9825) at station Katraj Fire Station', 35, '::1', '2025-12-26 12:27:50'),
(9, 1, 'Harsh Meshram', 'Admin', 'ADD_USER', 'USER', 'Created new user (Darshana Bhagyesh Chimote) with role Fire Station Command Control at station Station 1', 21, '::1', '2025-12-29 09:40:09'),
(10, 1, 'Harsh Meshram', 'Admin', 'ADD_USER', 'USER', 'Created new user (Dikshita Jay Pille ) with role Fire Station Command Control at station Katraj Fire Station', 22, '::1', '2025-12-29 09:55:06'),
(11, 1, 'Harsh Meshram', 'Admin', 'ASSIGN_PILOT', 'DRONE', 'Assigned pilot (Aditya Tagde) to drone DRN-002', 4, '::1', '2026-01-02 07:59:10'),
(12, 1, 'Harsh Meshram', 'Admin', 'REMOVE_PILOT', 'DRONE', 'Removed pilot (Aditya Tagde) from drone DRN-002', 4, '::1', '2026-01-02 07:59:32'),
(13, 1, 'Harsh Meshram', 'Admin', 'UPDATE_DRONE', 'DRONE', 'Updated drone DRN-002 (flight_hours: 78 → 90)', NULL, '::1', '2026-01-02 07:59:54'),
(14, 1, 'Harsh Meshram', 'Admin', 'ADD_USER', 'USER', 'Created new user (Harsh Meshram) with role Fire Station Command Control at station Kothrud Fire Station', 24, '::1', '2026-01-02 12:33:03');

-- --------------------------------------------------------

--
-- Table structure for table `demo_station`
--

CREATE TABLE `demo_station` (
  `id` int(11) NOT NULL,
  `station_name` varchar(150) NOT NULL,
  `location_name` varchar(255) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `demo_station`
--

INSERT INTO `demo_station` (`id`, `station_name`, `location_name`, `latitude`, `longitude`, `created_at`) VALUES
(1, 'Katraj Fire Station', 'Katraj, Pune, Maharashtra', 18.445089, 73.868980, '2025-12-30 07:01:16'),
(2, 'Kothrud Fire Station', 'Kothrud, Pune, Maharashtra', 18.509890, 73.807182, '2025-12-30 07:01:16'),
(3, 'Hadapsar Fire Station', 'Hadapsar, Pune, Maharashtra', 18.508650, 73.925200, '2025-12-30 07:01:16'),
(4, 'Shivajinagar Fire Station', 'Shivajinagar, Pune, Maharashtra', 18.530823, 73.847465, '2025-12-30 07:01:16'),
(5, 'Yerwada Fire Station', 'Yerwada, Pune, Maharashtra', 18.560230, 73.889450, '2025-12-30 07:01:16'),
(6, 'Pimpri Fire Station', 'Pimpri-Chinchwad, Pune, Maharashtra', 18.622440, 73.806950, '2025-12-30 07:01:16');

-- --------------------------------------------------------

--
-- Table structure for table `drones`
--

CREATE TABLE `drones` (
  `id` int(10) UNSIGNED NOT NULL,
  `drone_code` varchar(50) NOT NULL,
  `drone_name` varchar(150) NOT NULL,
  `ward` varchar(50) NOT NULL,
  `status` enum('patrolling','active_mission','standby','offline') NOT NULL,
  `battery` int(11) NOT NULL,
  `flight_hours` float DEFAULT 0,
  `health_status` varchar(50) DEFAULT 'Optimal',
  `firmware_version` varchar(20) DEFAULT 'v1.0.0',
  `is_ready` tinyint(1) NOT NULL DEFAULT 0,
  `station` varchar(50) NOT NULL,
  `pilot_id` int(11) DEFAULT NULL,
  `pilot_name` varchar(100) DEFAULT NULL,
  `pilot_email` varchar(150) DEFAULT NULL,
  `pilot_phone` varchar(20) DEFAULT NULL,
  `pilot_role` varchar(100) DEFAULT NULL,
  `pilot_status` enum('available','assigned') DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drones`
--

INSERT INTO `drones` (`id`, `drone_code`, `drone_name`, `ward`, `status`, `battery`, `flight_hours`, `health_status`, `firmware_version`, `is_ready`, `station`, `pilot_id`, `pilot_name`, `pilot_email`, `pilot_phone`, `pilot_role`, `pilot_status`) VALUES
(1, 'DRN-001', 'Falcon X1', 'Ward 1', 'patrolling', 85, 75.5, 'Degraded', 'v1.0.0', 1, 'Kothrud Fire Station', NULL, NULL, NULL, NULL, NULL, 'available'),
(2, 'DRN-002', 'SkyWatch Pro', 'Ward 2', 'standby', 62, 90, 'Requires Service', 'v2.1.4', 1, 'Katraj Fire Station', NULL, NULL, NULL, NULL, NULL, 'available'),
(3, 'DRN-003', 'AeroGuard S3', 'Ward 3', 'active_mission', 95, 19, 'Optimal', 'v4.0.0', 1, 'Katraj Fire Station', NULL, NULL, NULL, NULL, NULL, 'available'),
(4, 'DRN-004', 'FireScout', 'Ward 2', 'offline', 0, 37, 'Optimal', 'v3.6.1', 1, 'Katraj Fire Station', NULL, NULL, NULL, NULL, NULL, 'available'),
(8, 'DRN-005', 'Falcon X2', 'Ward 2', 'standby', 100, 0, 'Optimal', 'v4.2.3', 1, 'Katraj Fire Station', NULL, NULL, NULL, NULL, NULL, 'available'),
(9, 'DRN-006', 'Falcon-X', 'Ward 1', 'standby', 100, 0, 'Optimal', 'V.2.1.1', 1, 'Katraj Fire Station', NULL, NULL, NULL, NULL, NULL, 'available');

-- --------------------------------------------------------

--
-- Table structure for table `drone_gps_logs`
--

CREATE TABLE `drone_gps_logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `drone_code` varchar(50) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `speed` double NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drone_gps_logs`
--

INSERT INTO `drone_gps_logs` (`id`, `drone_code`, `latitude`, `longitude`, `speed`, `timestamp`) VALUES
(1, 'DRN-001', 18.528893, 73.854666, 42, '2025-12-02 07:10:03'),
(2, 'DRN-002', 18.452918, 73.8349311, 38, '2025-12-02 07:10:03'),
(3, 'DRN-003', 18.525693, 73.851766, 27, '2025-12-02 07:10:03'),
(4, 'DRN-004', 18.526293, 73.854366, 35, '2025-12-02 07:10:03');

-- --------------------------------------------------------

--
-- Table structure for table `incidents`
--

CREATE TABLE `incidents` (
  `id` varchar(30) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `stationName` varchar(100) DEFAULT NULL,
  `timeReported` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `isNewAlert` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `incidents`
--

INSERT INTO `incidents` (`id`, `name`, `location`, `latitude`, `longitude`, `stationName`, `timeReported`, `status`, `isNewAlert`) VALUES
('INC-20251120-003', 'Major Structural Fire - Downtown', 'False Street A-123, Commercial District', 34.0531, -118.245, 'Katraj Fire Station', '2025-11-20 10:35:00', 'New', 1),
('INC-20251122-001', 'Warehouse Fire - Industrial Zone', 'Plot No. 45, Industrial Area, Katraj', 18.4445, 73.8521, 'Katraj Fire Station', '2025-11-22 14:10:00', 'Active', 1),
('INC-20251122-002', 'Vehicle Accident & Fire', 'Paud Road, Near Signal, Kothrud', 18.5074, 73.8077, 'Kothrud Fire Station', '2025-11-22 15:25:00', 'Responding', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(120) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `station` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `deactivation_reason` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `address`, `email`, `phone`, `designation`, `role`, `station`, `created_at`, `status`, `deactivation_reason`) VALUES
(1, 'Harsh Meshram', 'Plot No. 1 Indra Nagar,', 'meshram.harsh05@gmail.com', '7499288828', 'pilot', 'Admin', 'Station 1', '2025-12-06 05:04:12', 1, NULL),
(3, 'HARSH BANDU MESHRAM', 'PLOT NO. 1 INDRA NAGAR, DIGHORI', 'ketkibutale753@gmail.com', '9130259099', 'pilot', 'Pilot', 'Station 1', '2025-12-06 05:20:41', 0, 'l'),
(4, 'Aditya Tagde', 'Nandanvan,Nagpur', 'firefighter@gmail.com', '9359863143', 'pilol', 'Pilot', 'Katraj Fire Station', '2025-12-08 06:56:01', 1, NULL),
(21, 'Darshana Bhagyesh Chimote', 'Cojag smart tech', 'dursedekhokhushraho@gmail.com', '1010101010', 'rider', 'Fire Station Command Control', 'Katraj Fire Station', '2025-12-29 09:40:09', 1, NULL),
(22, 'Dikshita Jay Pille ', 'New smart tech cojag', 'dikshu@jaypille.com', '1234567899', 'try data', 'Fire Station Command Control', 'Katraj Fire Station', '2025-12-29 09:55:05', 1, NULL),
(24, 'Harsh Meshram', 'Plot No. 1 Indra Nagar,', 'meshram.harsh01@gmail.com', '7499288829', 'hhhhh', 'Fire Station Command Control', 'Kothrud Fire Station', '2026-01-02 12:33:03', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `registration` varchar(50) DEFAULT NULL,
  `device_id` varchar(50) DEFAULT NULL,
  `location` varchar(150) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `station` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `name`, `type`, `registration`, `device_id`, `location`, `status`, `created_at`, `station`) VALUES
(1, 'Fire Tender Alpha', 'Fire Tender', 'DL-01-AB-1234', 'VTS-FT-001', 'Katraj Fire Station', 'available', '2025-12-05 09:47:34', 'Katraj Fire Station'),
(2, 'Rescue Van Bravo', 'Rescue Van', 'DL-09-XY-5678', 'VTS-RV-002', 'North Zone Depot', 'maintenance', '2025-12-05 09:47:34', 'Station 1'),
(3, 'Water Bowser Gamma1', 'Water Bowser', 'DL-04-CD-9823', 'VTS-WB-003', 'South Sector Yard', 'busy', '2025-12-05 09:47:34', 'Katraj Fire Station'),
(5, 'Water Bowser Gamma', 'Water Bowser', 'DL-04-CD-9823', 'VTS-WB-003', 'South Sector Yar', 'route', '2025-12-06 06:26:46', 'Katraj Fire Station');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `demo_station`
--
ALTER TABLE `demo_station`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drones`
--
ALTER TABLE `drones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `drone_code` (`drone_code`);

--
-- Indexes for table `drone_gps_logs`
--
ALTER TABLE `drone_gps_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `drone_code` (`drone_code`);

--
-- Indexes for table `incidents`
--
ALTER TABLE `incidents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `demo_station`
--
ALTER TABLE `demo_station`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `drones`
--
ALTER TABLE `drones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `drone_gps_logs`
--
ALTER TABLE `drone_gps_logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
