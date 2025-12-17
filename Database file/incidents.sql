-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2025 at 12:54 PM
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `incidents`
--
ALTER TABLE `incidents`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
