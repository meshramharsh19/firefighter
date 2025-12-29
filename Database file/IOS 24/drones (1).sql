-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2025 at 06:42 AM
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
  `pilot_status` enum('available','assigned') DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drones`
--

INSERT INTO `drones` (`id`, `drone_code`, `drone_name`, `ward`, `status`, `battery`, `flight_hours`, `health_status`, `firmware_version`, `is_ready`, `station`, `pilot_id`, `pilot_name`, `pilot_email`, `pilot_phone`, `pilot_role`, `pilot_status`) VALUES
(1, 'DRN-001', 'Falcon X1', 'Ward 1', 'patrolling', 85, 75.5, 'Degraded', 'v1.0.0', 1, 'Kothrud Fire Station', NULL, NULL, NULL, NULL, NULL, 'available'),
(2, 'DRN-002', 'SkyWatch Pro', 'Ward 2', 'standby', 62, 78, 'Requires Service', 'v2.1.4', 1, 'Katraj Fire Station', 3, 'HARSH BANDU MESHRAM', 'ketkibutale753@gmail.com', '9130259099', 'pilot', 'assigned'),
(3, 'DRN-003', 'AeroGuard S3', 'Ward 3', 'active_mission', 95, 19, 'Optimal', 'v4.0.0', 1, 'Katraj Fire Station', NULL, NULL, NULL, NULL, NULL, 'available'),
(4, 'DRN-004', 'FireScout', 'Ward 2', 'offline', 0, 37, 'Optimal', 'v3.6.1', 1, 'Katraj Fire Station', NULL, NULL, NULL, NULL, NULL, 'available'),
(8, 'DRN-005', 'Falcon X2', 'Ward 2', 'standby', 100, 0, 'Optimal', 'v4.2.3', 1, 'Katraj Fire Station', NULL, NULL, NULL, NULL, NULL, 'available');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `drones`
--
ALTER TABLE `drones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
