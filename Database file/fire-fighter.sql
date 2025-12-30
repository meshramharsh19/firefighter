-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2025 at 05:11 AM
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
  `pilot_status` varchar(50) DEFAULT 'Standby'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drones`
--

INSERT INTO `drones` (`id`, `drone_code`, `drone_name`, `ward`, `status`, `battery`, `flight_hours`, `health_status`, `firmware_version`, `is_ready`, `station`, `pilot_id`, `pilot_name`, `pilot_email`, `pilot_phone`, `pilot_role`, `pilot_status`) VALUES
(1, 'DRN-001', 'Falcon X1', 'Ward 1', 'patrolling', 85, 45.5, 'Optimal', 'v1.0.0', 1, 'Kothrud Fire Station', NULL, NULL, NULL, NULL, NULL, 'Standby'),
(2, 'DRN-002', 'SkyWatch Pro', 'Ward 2', 'standby', 62, 28, 'Degraded', 'v2.1.1', 1, 'Station 2', 9, 'Nilesh Khare', 'nilesh.khare@example.com', '9876501106', 'pilot', 'Active'),
(3, 'DRN-003', 'AeroGuard S3', 'Ward 3', 'active_mission', 95, 18, 'Optimal', 'v4.0.0', 1, 'Station 1', NULL, NULL, NULL, NULL, NULL, 'Standby'),
(4, 'DRN-004', 'FireScout', 'Ward 2', 'standby', 0, 37, 'Optimal', 'v3.6.1', 0, 'Katraj Fire Station', 11, 'Swapnil Ghorpade', 'swapnil.ghorpade@example.com', '9876501108', 'pilot', 'Active');

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
(1, 'Harsh Meshram', 'Plot No. 1 Indra Nagar,', 'meshram.harsh05@gmail.com', '7499288828', 'pilot', 'Admin', 'Katraj Fire Station', '2025-12-06 05:04:12', 1, NULL),
(3, 'HARSH BANDU MESHRAM', 'PLOT NO. 1 INDRA NAGAR, DIGHORI', 'ketkibutale753@gmail.com', '9130259099', 'pilot', 'Pilot', 'Station 1', '2025-12-06 05:20:41', 1, NULL),
(4, 'Aditya Tagde', 'Nandanvan,Nagpur', 'firefighter@gmail.com', '9359863143', 'Fire-Fighter', 'Fire Station Command Control', 'Station 2', '2025-12-08 06:56:01', 1, NULL),
(5, 'Mahesh', 'Cojag Smart tech', 'mahesh@gmai.com', '9370594161', 'Vehicle Driver ', 'Vehicle Driver', 'Station 2', '2025-12-10 07:10:42', 1, NULL);

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
  `ward` varchar(50) DEFAULT NULL,
  `vehicle_availability_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `station` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `name`, `type`, `registration`, `device_id`, `location`, `ward`, `vehicle_availability_status`, `created_at`, `station`) VALUES
(1, 'Fire Tender Alpha', 'Fire Tender', 'DL-01-AB-1234', 'VTS-FT-001', 'Central Fire Station', 'Ward 1', 'available', '2025-12-05 09:47:34', 'Station 1'),
(2, 'Rescue Van Bravo', 'Rescue Van', 'DL-09-XY-5678', 'VTS-RV-002', 'North Zone Depot', 'Ward 3', 'maintenance', '2025-12-05 09:47:34', 'Station 1'),
(3, 'Water Bowser Gamma', 'Water Bowser', 'DL-04-CD-9823', 'VTS-WB-003', 'South Sector Yard', 'Ward 2', 'busy', '2025-12-05 09:47:34', 'Station 2'),
(5, 'Water Bowser Gamma', 'Water Bowser', 'DL-04-CD-9823', 'VTS-WB-003', 'South Sector Yar', 'Ward 2', 'route', '2025-12-06 06:26:46', 'Station 2');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `drones`
--
ALTER TABLE `drones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `drone_gps_logs`
--
ALTER TABLE `drone_gps_logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
