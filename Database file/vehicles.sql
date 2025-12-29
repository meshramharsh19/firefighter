-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2025 at 08:12 AM
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
(5, 'Water Bowser Gamma', 'Water Bowser', 'DL-04-CD-9823', 'VTS-WB-003', 'South Sector Yar', 'en-route', '2025-12-06 06:26:46', 'Katraj Fire Station');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
