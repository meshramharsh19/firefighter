-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2026 at 08:42 AM
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
(1, 1, 'Rahul Sharma', 'Admin', 'ASSIGN_PILOT', 'DRONE', 'Assigned pilot (Amit Verma) to drone DRN-002', 2, '::1', '2026-02-28 05:20:13'),
(3, 2, 'Amit Verma', 'Pilot', 'ASSIGN_PILOT', 'DRONE', 'Assigned pilot (Amit Verma) to drone DRN-002', 2, '::1', '2026-02-28 05:28:36'),
(4, 1, 'Rahul Sharma', 'Admin', 'ADD_DRONE', 'DRONE', 'Added new drone PhantomX (DRN-010) at station Katraj Fire Station', NULL, '::1', '2026-03-04 08:53:02'),
(5, 1, 'Rahul Sharma', 'Admin', 'UPDATE_DRONE', 'DRONE', 'Updated drone DRN-001 (flight_hours: 20 → 21, health_status: Optimal → Requires Service, firmware_version: v1.0.0 → V3.4.6, status: Maintenance → active_mission)', NULL, '::1', '2026-03-04 08:54:02'),
(21, 1, 'Rahul Sharma', 'Admin', 'UPDATE_VEHICLE', 'VEHICLE', 'Updated vehicle (MH-12-YD-7783): name: \'Quick Response Vehicle\' → \'Quick Response Vehicles\'', 12, '::1', '2026-03-31 07:06:49'),
(26, 2, 'Amit Verma', 'Pilot', 'SCHEDULE_MAINTENANCE', 'MAINTENANCE', 'Scheduled maintenance for drone SkyGuard-01 (DRN-001) at station Katraj Fire Station on 2026-04-04. Issue: battery replacement', NULL, '::1', '2026-04-04 05:58:14'),
(28, 1, 'Rahul Sharma', 'Admin', 'DELETE_VEHICLE', 'VEHICLE', 'Deleted vehicle Rescue Van (MH-14-WJ-4511) from station Warje Fire Station', NULL, '::1', '2026-04-04 10:42:40'),
(31, 1, 'Rahul Sharma', 'Admin', 'DELETE_STATION', 'STATION', 'Deleted station Kasba Peth Fire Station (STN-007)', NULL, '::1', '2026-04-04 13:04:51'),
(33, 1, 'Rahul Sharma', 'Admin', 'DELETE_VEHICLE', 'VEHICLE', 'Deleted vehicle Rescue Van (MH-12-YD-7781) from station Yerwada Fire Station', NULL, '::1', '2026-04-04 13:08:50'),
(34, 1, 'Rahul Sharma', 'Admin', 'ASSIGN_PILOT', 'DRONE', 'Assigned pilot (Amit Verma) to drone DRN-001', 2, '::1', '2026-04-08 17:37:38'),
(35, 2, 'Amit Verma', 'Pilot', 'SCHEDULE_MAINTENANCE', 'MAINTENANCE', 'Scheduled maintenance for drone SkyGuard-02 (DRN-002) at station Katraj Fire Station. Issue: battery replacement. Scheduled date: 2026-04-10', 0, '::1', '2026-04-10 12:44:06'),
(38, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-18 09:22:42'),
(39, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-04-18 09:22:46'),
(40, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-04-18 09:52:41'),
(41, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-18 11:07:13'),
(42, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-04-18 11:07:27'),
(43, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-04-18 12:38:05'),
(44, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGOUT', 'AUTH', 'User logged out successfully', NULL, '::1', '2026-04-18 12:41:29'),
(45, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-18 12:44:38'),
(46, 4, 'Suresh Yadav', 'Fire Station Command Control', 'VIEW', 'INCIDENT', 'Viewed Incident ID: INC-20260115-003', NULL, '::1', '2026-04-18 12:45:05'),
(47, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-04-18 12:45:12'),
(48, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-04-18 12:46:30'),
(49, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGOUT', 'AUTH', 'User logged out successfully', NULL, '::1', '2026-04-18 12:50:32'),
(50, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-18 12:50:41'),
(51, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-04-18 12:51:12'),
(52, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-18 13:30:21'),
(53, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-04-18 13:31:27'),
(54, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-04-18 13:32:28'),
(55, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-20 12:35:25'),
(56, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-04-20 12:35:56'),
(57, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-01', NULL, '::1', '2026-04-20 12:36:33'),
(58, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-04-20 12:37:19'),
(59, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGOUT', 'AUTH', 'User logged out successfully', NULL, '::1', '2026-04-20 12:37:39'),
(60, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-23 11:57:15'),
(61, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGOUT', 'AUTH', 'User logged out successfully', NULL, '::1', '2026-04-23 11:58:46'),
(62, NULL, NULL, NULL, 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-23 11:58:55'),
(63, NULL, NULL, NULL, 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-23 11:58:57'),
(64, 1, 'Rahul Sharma', 'Admin', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-23 11:59:02'),
(65, NULL, NULL, NULL, 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-24 04:56:39'),
(66, NULL, NULL, NULL, 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-24 04:56:42'),
(67, 1, 'Rahul Sharma', 'Admin', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-24 04:56:51'),
(68, 1, 'Rahul Sharma', 'Admin', 'ADD_VEHICLE', 'VEHICLE', 'Added vehicle Quick Response Vehicle (MH31BG0001) at Aundh Fire Station', 387, '::1', '2026-04-24 04:58:59'),
(69, NULL, 'SYSTEM', 'SYSTEM', 'UPDATE_VEHICLE', 'VEHICLE', 'Updated vehicle Quick Response Vehicle (MH31BG0001): \nstation: Aundh Fire Station → Central Fire Brigade (Lohiya Nagar)', 387, '::1', '2026-04-24 04:59:36'),
(70, 1, 'Rahul Sharma', 'Admin', 'DELETE_VEHICLE', 'VEHICLE', 'Deleted vehicle Quick Response Vehicle (MH31BG0001) from station Central Fire Brigade (Lohiya Nagar)', NULL, '::1', '2026-04-24 04:59:41'),
(71, 1, 'Rahul Sharma', 'Admin', 'ADD_DRONE', 'DRONE', 'Added drone SkyGuard-17 (DRN-012) at Aundh Fire Station .', NULL, '::1', '2026-04-24 05:03:42'),
(72, 1, 'Rahul Sharma', 'Admin', 'UPDATE_DRONE', 'DRONE', 'Updated drone SkyGuard-17 (DRN-012):\nflight_hours: 3 → 7', NULL, '::1', '2026-04-24 05:04:02'),
(73, 1, 'Rahul Sharma', 'Admin', 'DELETE_DRONE', 'DRONE', 'Deleted drone (SkyGuard-17) with code DRN-012', NULL, '::1', '2026-04-24 05:04:05'),
(74, NULL, 'SYSTEM', 'SYSTEM', 'ADD_STATION', 'STATION', 'Added new station Kothrud (STN-123)', NULL, '::1', '2026-04-24 05:04:46'),
(75, NULL, 'SYSTEM', 'SYSTEM', 'UPDATE_STATION', 'STATION', 'Updated Kothrud (STN-123):\nname: Kothrud → Fire station\nlatitude: 18.499063 → 18.560692\nlongitude: 73.813491 → 73.814279', 13, '::1', '2026-04-24 05:05:36'),
(76, 1, 'Rahul Sharma', 'Admin', 'DELETE_STATION', 'STATION', 'Deleted station Fire station (STN-123)', NULL, '::1', '2026-04-24 05:05:40'),
(77, 1, 'Rahul Sharma', 'Admin', 'ADD_USER', 'USER', 'Added user HARSH BANDU MESHRAM (1234567890):\nrole: Fire Station Command Control\nstation: Aundh Fire Station', 28, '::1', '2026-04-24 05:07:21'),
(78, 1, 'Rahul Sharma', 'Admin', 'UPDATE_USER', 'USER', 'Updated user HARSH BANDU MESHRAM (1234567891):\nphone: 1234567890 → 1234567891', 28, '::1', '2026-04-24 05:07:33'),
(79, 1, 'Rahul Sharma', 'Admin', 'UPDATE_USER', 'USER', 'Updated user HARSH BANDU MESHRAM (1234567891):\nrole: Fire Station Command Control → Pilot', 28, '::1', '2026-04-24 05:07:48'),
(80, NULL, 'SYSTEM', 'SYSTEM', 'DELETE_USER', 'USER', 'Deleted user HARSH BANDU MESHRAM (Role: Pilot) from station Aundh Fire Station', NULL, '::1', '2026-04-24 05:07:52'),
(81, 1, 'Rahul Sharma', 'Admin', 'REMOVE_PILOT', 'DRONE', 'Removed pilot (Amit Verma) from drone DRN-001', 1, '::1', '2026-04-24 08:25:11'),
(82, 1, 'Rahul Sharma', 'Admin', 'ASSIGN_PILOT', 'DRONE', 'Assigned pilot (Amit Verma) to drone DRN-001', 2, '::1', '2026-04-24 08:25:14'),
(83, 1, 'Rahul Sharma', 'Admin', 'LOGOUT', 'AUTH', 'User logged out successfully', NULL, '::1', '2026-04-24 08:36:15'),
(84, 7, 'Arjun Singh', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-24 08:36:29'),
(85, 7, 'Arjun Singh', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20251122-001 acknowledged', NULL, '::1', '2026-04-24 08:36:32'),
(86, 7, 'Arjun Singh', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20251122-001 acknowledged', NULL, '::1', '2026-04-24 08:38:59'),
(87, 7, 'Arjun Singh', 'Fire Station Command Control', 'CONFIRM_FORWARD', 'INCIDENT', 'Confirmed and shared incident to Kothrud Fire Station', NULL, '::1', '2026-04-24 08:39:06'),
(88, 7, 'Arjun Singh', 'Fire Station Command Control', 'LOGOUT', 'AUTH', 'User logged out successfully', NULL, '::1', '2026-04-24 08:40:42'),
(89, 1, 'Rahul Sharma', 'Admin', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-24 08:40:56'),
(90, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-24 12:04:44'),
(91, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-04-24 12:04:48'),
(92, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-01', NULL, '::1', '2026-04-24 12:05:02'),
(93, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-01', NULL, '::1', '2026-04-24 12:07:48'),
(94, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGOUT', 'AUTH', 'User logged out successfully', NULL, '::1', '2026-04-24 12:09:15'),
(95, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-24 12:09:23'),
(96, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-04-24 12:10:20'),
(97, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-01', NULL, '::1', '2026-04-24 12:10:36'),
(98, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGOUT', 'AUTH', 'User logged out successfully', NULL, '::1', '2026-04-24 12:19:58'),
(99, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-24 12:20:05'),
(100, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-04-24 12:20:08'),
(101, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-01', NULL, '::1', '2026-04-24 12:20:21'),
(102, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-04-27 10:12:16'),
(103, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-04-27 10:12:19'),
(104, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-01', NULL, '::1', '2026-04-27 10:13:45'),
(105, 4, 'Suresh Yadav', 'Fire Station Command Control', 'END_MISSION', 'INCIDENT', 'Mission ended for Incident INC-20260115-003', NULL, '::1', '2026-04-27 10:13:56'),
(106, 4, 'Suresh Yadav', 'Fire Station Command Control', 'EXPORT_REPORT', 'INCIDENT', 'Exported report for Incident INC-20260115-003', NULL, '::1', '2026-04-27 10:13:58'),
(107, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-05-07 09:28:32'),
(108, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-05-07 09:29:35'),
(109, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-05-07 09:31:32'),
(110, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-05-08 10:28:18'),
(111, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-05-08 10:28:54'),
(112, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-05-12 10:21:10'),
(113, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-05-12 10:21:50'),
(114, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-05-29 05:18:18'),
(115, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-05-29 05:20:09'),
(116, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGOUT', 'AUTH', 'User logged out successfully', NULL, '::1', '2026-05-29 05:26:24'),
(117, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-05-29 05:26:54'),
(118, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20251122-002 acknowledged', NULL, '::1', '2026-05-29 05:27:41'),
(119, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-05-29 05:29:16'),
(120, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20251122-002 acknowledged', NULL, '::1', '2026-05-29 05:30:00'),
(121, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-05-29 06:09:36'),
(122, 4, 'Suresh Yadav', 'Fire Station Command Control', 'END_MISSION', 'INCIDENT', 'Mission ended for Incident INC-20251122-002', NULL, '::1', '2026-05-29 06:10:06'),
(123, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20251122-002 acknowledged', NULL, '::1', '2026-05-29 07:24:16'),
(124, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-05-29 07:25:51'),
(125, NULL, NULL, NULL, 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-06-01 05:04:01'),
(126, NULL, NULL, NULL, 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-06-01 05:04:14'),
(127, NULL, NULL, NULL, 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-06-01 05:05:14'),
(128, NULL, NULL, NULL, 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-06-01 05:06:10'),
(129, NULL, NULL, NULL, 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-06-01 05:06:22'),
(130, NULL, NULL, NULL, 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-06-01 05:06:27'),
(131, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-06-01 05:07:22'),
(132, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGOUT', 'AUTH', 'User logged out successfully', NULL, '::1', '2026-06-01 05:07:26'),
(133, 1, 'Rahul Sharma', 'Admin', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-06-01 05:07:41'),
(134, 1, 'Rahul Sharma', 'Admin', 'LOGOUT', 'AUTH', 'User logged out successfully', NULL, '::1', '2026-06-01 06:19:05'),
(135, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-06-01 06:30:18'),
(136, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-06-01 08:50:44'),
(137, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-06-01 08:57:05'),
(138, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-06-02 01:36:41'),
(139, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20251122-002 acknowledged', NULL, '::1', '2026-06-02 01:39:59'),
(140, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-06-02 02:11:12'),
(141, 4, 'Suresh Yadav', 'Fire Station Command Control', 'END_MISSION', 'INCIDENT', 'Mission ended for Incident INC-20251122-002', NULL, '::1', '2026-06-02 03:06:23'),
(142, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-06-02 03:13:58'),
(143, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-01', NULL, '::1', '2026-06-02 03:14:55'),
(144, 4, 'Suresh Yadav', 'Fire Station Command Control', 'END_MISSION', 'INCIDENT', 'Mission ended for Incident INC-20260115-003', NULL, '::1', '2026-06-02 03:17:07'),
(145, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-06-02 03:19:07'),
(146, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-06-02 03:19:35'),
(147, 4, 'Suresh Yadav', 'Fire Station Command Control', 'END_MISSION', 'INCIDENT', 'Mission ended for Incident INC-20260115-003', NULL, '::1', '2026-06-02 03:20:05'),
(148, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-06-02 05:27:15'),
(149, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-06-02 05:28:01'),
(150, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-06-02 05:28:39'),
(151, 4, 'Suresh Yadav', 'Fire Station Command Control', 'END_MISSION', 'INCIDENT', 'Mission ended for Incident INC-20260115-003', NULL, '::1', '2026-06-02 05:42:50'),
(152, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-06-02 05:47:32'),
(153, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-06-02 05:48:05'),
(154, 4, 'Suresh Yadav', 'Fire Station Command Control', 'END_MISSION', 'INCIDENT', 'Mission ended for Incident INC-20260115-003', NULL, '::1', '2026-06-02 06:01:19'),
(155, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-06-02 06:04:28'),
(156, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-06-02 06:04:42'),
(157, 4, 'Suresh Yadav', 'Fire Station Command Control', 'END_MISSION', 'INCIDENT', 'Mission ended for Incident INC-20260115-003', NULL, '::1', '2026-06-02 06:05:18'),
(158, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-06-02 06:08:17'),
(159, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-06-02 06:08:28'),
(160, 4, 'Suresh Yadav', 'Fire Station Command Control', 'END_MISSION', 'INCIDENT', 'Mission ended for Incident INC-20260115-003', NULL, '::1', '2026-06-02 06:09:22'),
(161, 4, 'Suresh Yadav', 'Fire Station Command Control', 'LOGIN', 'AUTH', 'User logged in successfully', NULL, '::1', '2026-06-04 05:37:29'),
(162, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-06-04 05:42:07'),
(163, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-01', NULL, '::1', '2026-06-04 05:42:28'),
(164, 4, 'Suresh Yadav', 'Fire Station Command Control', 'EXPORT_REPORT', 'INCIDENT', 'Exported report for Incident INC-20260115-003', NULL, '::1', '2026-06-04 05:42:33'),
(165, 4, 'Suresh Yadav', 'Fire Station Command Control', 'END_MISSION', 'INCIDENT', 'Mission ended for Incident INC-20260115-003', NULL, '::1', '2026-06-04 05:42:44'),
(166, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-06-04 05:43:55'),
(167, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-06-04 05:46:49'),
(168, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-06-04 05:47:10'),
(169, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-06-04 05:49:40'),
(170, 4, 'Suresh Yadav', 'Fire Station Command Control', 'END_MISSION', 'INCIDENT', 'Mission ended for Incident INC-20260115-003', NULL, '::1', '2026-06-04 05:50:51'),
(171, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-06-04 05:51:14'),
(172, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-06-04 05:51:26'),
(173, 4, 'Suresh Yadav', 'Fire Station Command Control', 'END_MISSION', 'INCIDENT', 'Mission ended for Incident INC-20260115-003', NULL, '::1', '2026-06-04 05:52:20'),
(174, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20251122-002 acknowledged', NULL, '::1', '2026-06-04 05:52:28'),
(175, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-06-04 05:52:37'),
(176, 4, 'Suresh Yadav', 'Fire Station Command Control', 'END_MISSION', 'INCIDENT', 'Mission ended for Incident INC-20251122-002', NULL, '::1', '2026-06-04 05:54:12'),
(177, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACKNOWLEDGE', 'INCIDENT', 'Incident ID: INC-20260115-003 acknowledged', NULL, '::1', '2026-06-04 05:54:29'),
(178, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-06-04 05:54:38'),
(179, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-02', NULL, '::1', '2026-06-04 06:06:57'),
(180, 4, 'Suresh Yadav', 'Fire Station Command Control', 'ACTIVATE_DRONE_MISSION', 'INCIDENT', 'Activated with Vehicles: Quick Response Vehicle | Drones: SkyGuard-01', NULL, '::1', '2026-06-04 06:10:51');

-- --------------------------------------------------------

--
-- Table structure for table `drones`
--

CREATE TABLE `drones` (
  `id` int(10) UNSIGNED NOT NULL,
  `drone_code` varchar(50) NOT NULL,
  `drone_name` varchar(150) NOT NULL,
  `ward` varchar(50) DEFAULT NULL,
  `status` enum('Active','StandBy','Maintenance','On-Mission') NOT NULL,
  `battery` int(11) DEFAULT NULL,
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
(1, 'DRN-001', 'SkyGuard-01', NULL, 'On-Mission', 100, 20, 'Optimal', 'V3.4.5', 1, 'Katraj Fire Station', 2, 'Amit Verma', 'amit.verma@example.com', '9876501234', 'Pilot', 'available'),
(2, 'DRN-002', 'SkyGuard-02', NULL, 'On-Mission', 100, 13, 'Optimal', 'v1.0.0', 1, 'Katraj Fire Station', NULL, NULL, NULL, NULL, NULL, 'available'),
(3, 'DRN-003', 'SkyGuard-03', NULL, 'Maintenance', 0, 37, 'Optimal', 'v3.6.3', 1, 'Central Fire Brigade (Lohiya Nagar)', NULL, NULL, NULL, NULL, NULL, 'available'),
(4, 'DRN-004', 'SkyGuard-04', NULL, 'Maintenance', 100, 10, 'Optimal', 'v4.2.3', 1, 'Central Fire Brigade (Lohiya Nagar)', NULL, NULL, NULL, NULL, NULL, 'available'),
(7, 'DRN-007', 'SkyGuard-07', NULL, 'Active', 100, 2, 'Optimal', 'V.1.2.6', 1, 'Kothrud Fire Station', NULL, NULL, NULL, NULL, NULL, 'available'),
(8, 'DRN-008', 'SkyGuard-08', NULL, 'StandBy', 100, 18, 'Optimal', 'V.1.2.6', 1, 'Kothrud Fire Station', NULL, NULL, NULL, NULL, NULL, 'available'),
(15, 'DRN-015', 'SkyGuard-15', NULL, 'Active', 100, 0, 'Optimal', 'v1.0.0', 1, 'Dandekar Pool Fire Station', NULL, NULL, NULL, NULL, NULL, 'available'),
(16, 'DRN-016', 'SkyGuard-16', NULL, 'StandBy', 100, 0, 'Optimal', 'v1.0.0', 1, 'Dandekar Pool Fire Station', NULL, NULL, NULL, NULL, NULL, 'available'),
(19, 'DRN-019', 'SkyGuard-19', NULL, 'Active', 100, 0, 'Optimal', 'v1.0.0', 1, 'Sinhgad Road Fire Station', NULL, NULL, NULL, NULL, NULL, 'available'),
(20, 'DRN-020', 'SkyGuard-20', NULL, 'StandBy', 100, 0, 'Optimal', 'v1.0.0', 1, 'Sinhgad Road Fire Station', NULL, NULL, NULL, NULL, NULL, 'available');

-- --------------------------------------------------------

--
-- Table structure for table `drone_action_logs`
--

CREATE TABLE `drone_action_logs` (
  `id` int(11) NOT NULL,
  `timestamp` varchar(50) DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  `incident_id` varchar(50) DEFAULT NULL,
  `action` text DEFAULT NULL,
  `response` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drone_action_logs`
--

INSERT INTO `drone_action_logs` (`id`, `timestamp`, `ip`, `incident_id`, `action`, `response`, `created_at`) VALUES
(1, '2026-04-16 13:01:13 IST', '152.58.31.143', 'INC-20260115-003', 'Command: /land', 'Connection error: HTTPConnectionPool(host=\'100.64.14.44\', port=5000): Max retries exceeded with url: /land (Caused by ConnectTimeoutError)', '2026-04-16 09:41:02'),
(2, '2026-04-24 15:01:36 IST', '117.222.126.169', 'INC-20260115-003', 'Command: /land', 'Connection error: HTTPConnectionPool(host:\'100.109.223.45\', port=5000): Max retries exceeded with url: /land (Caused by ConnectTimeoutError)', '2026-04-24 04:01:36'),
(3, '2026-04-24 15:01:42 IST', '117.222.126.169', 'INC-20260115-003', 'Command: /loiter', 'Connection error: HTTPConnectionPool(host:\'100.109.223.45\', port=5000): Max retries exceeded with url: /loiter (Caused by ConnectTimeoutError)', '2026-04-24 04:01:42'),
(4, '2026-04-24 15:01:47 IST', '117.222.126.169', 'INC-20260115-003', 'Command: /land', 'Connection error: HTTPConnectionPool(host:\'100.109.223.45\', port=5000): Max retries exceeded with url: /land (Caused by ConnectTimeoutError)', '2026-04-24 04:01:47'),
(5, '2026-04-24 15:01:49 IST', '117.222.126.169', 'INC-20260115-003', 'Command: /loiter', 'Connection error: HTTPConnectionPool(host:\'100.109.223.45\', port=5000): Max retries exceeded with url: /loiter (Caused by ConnectTimeoutError)', '2026-04-24 04:01:49'),
(6, '2026-04-24 15:01:56 IST', '117.222.126.169', 'INC-20260115-003', 'Command: /rtl', 'Connection error: HTTPConnectionPool(host:\'100.109.223.45\', port=5000): Max retries exceeded with url: /rtl (Caused by ConnectTimeoutError)', '2026-04-24 04:01:56'),
(7, '2026-04-24 15:02:00 IST', '117.222.126.169', 'INC-20260115-003', 'Command: /land', 'Connection error: HTTPConnectionPool(host:\'100.109.223.45\', port=5000): Max retries exceeded with url: /land (Caused by ConnectTimeoutError)', '2026-04-24 04:02:00'),
(8, '2026-04-16 13:01:13 IST', '152.58.31.143', 'INC-20260115-003', 'Command: /land', 'Connection error: HTTPConnectionPool(host:\'100.64.14.44\', port=5000): Max retries exceeded with url: /land (Caused by ConnectTimeoutError)', '2026-04-16 04:11:02');

-- --------------------------------------------------------

--
-- Table structure for table `drone_gps_logs`
--

CREATE TABLE `drone_gps_logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `drone_code` varchar(50) NOT NULL,
  `incident_id` varchar(50) DEFAULT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `speed` double NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drone_gps_logs`
--

INSERT INTO `drone_gps_logs` (`id`, `drone_code`, `incident_id`, `latitude`, `longitude`, `speed`, `timestamp`) VALUES
(1, 'DRN-001', NULL, 18.454593, 73.855582, 42, '2025-12-02 07:10:03'),
(2, 'DRN-002', NULL, 18.493859, 73.835045, 45.5, '2026-02-18 06:59:57'),
(3, 'DRN-005', NULL, 18.4545, 73.8603, 52.3, '2026-02-18 06:59:57'),
(4, 'DRN-007', NULL, 18.4501, 73.851, 38.9, '2026-02-18 06:59:57'),
(13, 'DRN-001', 'INC-20260115-003', 18.5204, 73.8567, 45.5, '2026-04-09 10:36:52'),
(14, 'DRN-001', 'INC-20260115-003', 18.5204, 73.8567, 45.5, '2026-04-09 10:36:52'),
(15, 'DRN-001', 'INC-20260115-003', 18.521, 73.857, 46, '2026-04-09 10:37:10'),
(16, 'DRN-001', 'INC-20260115-003', 18.522, 73.8585, 44.8, '2026-04-09 10:37:30'),
(17, 'DRN-001', 'INC-20260115-003', 18.5235, 73.86, 45.2, '2026-04-09 10:37:50'),
(18, 'DRN-001', 'INC-20260115-003', 18.525, 73.8615, 45, '2026-04-09 10:38:10'),
(19, 'DRN-001', 'INC-20260115-003', 18.526, 73.8625, 45.3, '2026-04-09 10:38:30');

-- --------------------------------------------------------

--
-- Table structure for table `drone_missions`
--

CREATE TABLE `drone_missions` (
  `id` int(11) NOT NULL,
  `drone_id` int(10) UNSIGNED NOT NULL,
  `incident_id` varchar(30) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT 'started',
  `path_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`path_data`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `vehicle_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drone_missions`
--

INSERT INTO `drone_missions` (`id`, `drone_id`, `incident_id`, `start_time`, `end_time`, `status`, `path_data`, `created_at`, `vehicle_id`) VALUES
(15, 2, 'INC-20251122-002', '2026-05-29 11:39:36', '2026-05-29 11:40:06', 'completed', NULL, '2026-05-29 06:09:36', NULL),
(21, 2, 'INC-20260115-003', '2026-06-02 11:38:28', '2026-06-02 11:39:22', 'completed', NULL, '2026-06-02 06:08:28', 3),
(22, 1, 'INC-20260115-003', '2026-06-04 11:12:28', '2026-06-04 11:12:44', 'completed', NULL, '2026-06-04 05:42:28', 3),
(23, 2, 'INC-20260115-003', '2026-06-04 11:17:10', '2026-06-04 11:20:51', 'completed', NULL, '2026-06-04 05:47:10', 3),
(24, 2, 'INC-20260115-003', '2026-06-04 11:19:40', '2026-06-04 11:20:51', 'completed', NULL, '2026-06-04 05:49:40', 3),
(25, 2, 'INC-20260115-003', '2026-06-04 11:21:26', '2026-06-04 11:22:20', 'completed', NULL, '2026-06-04 05:51:26', 3),
(26, 2, 'INC-20251122-002', '2026-06-04 11:22:37', '2026-06-04 11:24:12', 'completed', NULL, '2026-06-04 05:52:37', 3),
(27, 2, 'INC-20260115-003', '2026-06-04 11:24:38', NULL, 'started', NULL, '2026-06-04 05:54:38', 3),
(28, 2, 'INC-20260115-003', '2026-06-04 11:36:57', NULL, 'started', NULL, '2026-06-04 06:06:57', 3),
(29, 1, 'INC-20260115-003', '2026-06-04 11:40:50', NULL, 'started', NULL, '2026-06-04 06:10:50', 3);

-- --------------------------------------------------------

--
-- Table structure for table `fire_detections`
--

CREATE TABLE `fire_detections` (
  `id` int(11) NOT NULL,
  `drone_id` varchar(50) DEFAULT NULL,
  `event_timestamp` bigint(20) DEFAULT NULL,
  `alert_type` varchar(50) DEFAULT NULL,
  `confidence` float DEFAULT NULL,
  `fire_count` int(11) DEFAULT NULL,
  `intensity_score` float DEFAULT NULL,
  `intensity_level` varchar(50) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fire_images`
--

CREATE TABLE `fire_images` (
  `id` int(11) NOT NULL,
  `incident_id` varchar(100) DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `confidence` float DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fire_images`
--

INSERT INTO `fire_images` (`id`, `incident_id`, `image_url`, `confidence`, `timestamp`) VALUES
(1, 'INC-20260115-003', 'http://65.2.23.154/fire_captures/INC-20260115-003/fire_1_89.jpg', 0.898296, 1777029059699),
(2, 'INC-20260115-003', 'http://65.2.23.154/fire_captures/INC-20260115-003/fire_2_84.jpg', 0.845515, 1777029059710),
(3, 'INC-20260115-003', 'http://65.2.23.154/fire_captures/INC-20260115-003/fire_3_84.jpg', 0.843289, 1777029059720),
(4, 'INC-20260115-003', 'http://65.2.23.154/fire_captures/INC-20260115-003/fire_4_82.jpg', 0.824084, 1777029059729),
(5, 'INC-20260115-002', 'http://65.2.23.154/fire_captures/INC-20260115-003/fire_5_81.jpg', 0.817819, 1777029059738);

-- --------------------------------------------------------

--
-- Table structure for table `fire_station`
--

CREATE TABLE `fire_station` (
  `id` int(11) NOT NULL,
  `station_name` varchar(150) NOT NULL,
  `station_code` varchar(50) NOT NULL,
  `latitude` decimal(10,7) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fire_station`
--

INSERT INTO `fire_station` (`id`, `station_name`, `station_code`, `latitude`, `longitude`, `created_at`) VALUES
(1, 'Central Fire Brigade (Lohiya Nagar)', 'STN-001', 18.5065396, 73.8656903, '2026-04-04 10:53:28'),
(2, 'Aundh Fire Station', 'STN-002', 18.5606921, 73.8142792, '2026-04-04 10:53:28'),
(3, 'Kothrud Fire Station', 'STN-003', 18.4990632, 73.8134913, '2026-04-04 10:53:28'),
(4, 'Yerwada Fire Station', 'STN-004', 18.5502944, 73.8791084, '2026-04-04 10:53:28'),
(5, 'Kasba Fire Station', 'STN-005', 18.5216312, 73.8569992, '2026-04-13 09:42:03'),
(6, 'Dayaram Rajguru Fire Station', 'STN-006', 18.5299150, 73.8706020, '2026-04-04 10:53:28'),
(7, 'Dandekar Pool Fire Station', 'STN-008', 18.4996141, 73.8478724, '2026-04-04 10:53:28'),
(8, 'Pashan Fire Station', 'STN-009', 18.5403089, 73.8027597, '2026-04-04 10:53:28'),
(9, 'Sinhgad Road Fire Station', 'STN-010', 18.4755075, 73.8156184, '2026-04-04 10:53:28'),
(10, 'Katraj Fire Station', 'STN-011', 18.4549341, 73.8570094, '2026-04-04 10:53:28'),
(11, 'Amanora Fire Station (Hadapsar)', 'STN-012', 18.5147822, 73.9453898, '2026-04-04 10:53:28'),
(12, 'Nanded City Fire Station', 'STN-013', 18.4602641, 73.7966310, '2026-04-04 10:53:28');

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
('INC-20251122-002', 'Warehouse Fire - Industrial Zone', 'Plot No. 45, Industrial Area, Katraj', 18.4445, 73.8521, 'Katraj Fire Station', '2026-06-01 14:10:00', 'completed', 0),
('INC-20260115-003', 'Residential Building Fire', 'Near Katraj Bus Depot, Pune', 18.454224, 73.858513, 'Katraj Fire Station', '2026-06-02 18:40:00', 'Active', 0);

-- --------------------------------------------------------

--
-- Table structure for table `maintenance_requests`
--

CREATE TABLE `maintenance_requests` (
  `id` int(11) NOT NULL,
  `drone_code` varchar(50) NOT NULL,
  `drone_name` varchar(150) NOT NULL,
  `station` varchar(150) NOT NULL,
  `issue_description` text NOT NULL,
  `scheduled_date` date NOT NULL,
  `reported_by` varchar(150) NOT NULL,
  `status` varchar(50) DEFAULT 'scheduled',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `scheduled_by` enum('Admin','Pilot') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `maintenance_requests`
--

INSERT INTO `maintenance_requests` (`id`, `drone_code`, `drone_name`, `station`, `issue_description`, `scheduled_date`, `reported_by`, `status`, `created_at`, `scheduled_by`) VALUES
(0, 'DRN-005', 'air2s', 'Yerwada Fire Station', 'Battery Issue', '2026-05-08', 'Rakesh Malhotra', 'completed', '2026-04-09 12:00:19', 'Pilot'),
(0, 'DRN-001', 'DJI Mini 2', 'Katraj Fire Station', 'asdfghjkl;', '2026-04-17', 'Amit Verma', 'scheduled', '2026-04-10 12:38:18', 'Pilot'),
(0, 'DRN-002', 'SkyGuard-02', 'Katraj Fire Station', 'battery replacement', '2026-04-10', 'Amit Verma', 'completed', '2026-04-10 12:44:06', 'Pilot');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `type`, `message`, `created_by`, `is_read`, `created_at`, `data`) VALUES
(17, 'maintenance', 'Maintenance scheduled for SkyGuard-02 (DRN-002) at Katraj Fire Station', 'Amit Verma', 1, '2026-04-10 12:44:06', '{\"drone_code\":\"DRN-002\",\"drone_name\":\"SkyGuard-02\",\"station\":\"Katraj Fire Station\",\"issue_description\":\"battery replacement\",\"reported_by\":\"Amit Verma\",\"scheduled_date\":\"2026-04-10\",\"status\":\"scheduled\",\"scheduled_by\":\"Pilot\"}'),
(18, 'maintenance', 'Maintenance completed for SkyGuard-02 (DRN-002) at Katraj Fire Station', 'Amit Verma', 1, '2026-04-10 12:47:27', '{\"drone_code\":\"DRN-002\",\"drone_name\":\"SkyGuard-02\",\"station\":\"Katraj Fire Station\",\"reported_by\":\"Amit Verma\",\"issue_description\":\"battery replacement\",\"scheduled_date\":\"2026-04-10\",\"status\":\"completed\"}');

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
(1, 'Rahul Sharma', 'Delhi, India', 'rahul.sharma@example.com', '9876543210', 'Admin', 'Admin', '-', '2025-12-06 05:04:12', 1, NULL),
(2, 'Amit Verma', 'Mumbai, Maharashtra', 'amit.verma@example.com', '9876501234', 'Pilot', 'Pilot', 'Katraj Fire Station', '2025-12-06 05:20:41', 1, NULL),
(3, 'Rohit Kumar', 'Patna, Bihar', 'rohit.kumar@example.com', '9988776655', 'Vehicle Driver ', 'Vehicle Driver', 'Katraj Fire Station', '2025-12-08 06:56:01', 1, NULL),
(4, 'Suresh Yadav', 'Jaipur, Rajasthan', 'suresh.yadav@example.com', '9090909090', 'Fire Station Command Control', 'Fire Station Command Control', 'Katraj Fire Station', '2025-12-10 07:10:42', 1, NULL),
(5, 'Vikas Gupta', 'Chandigarh', 'vikas.gupta@example.com', '7766554433', 'Pilot', 'Pilot', 'Sinhgad Road Fire Station', '2025-12-16 09:01:03', 1, NULL),
(7, 'Arjun Singh', 'Kanpur, UP', 'arjun.singh@example.com', '9191919191', 'Fire Station Command Control', 'Fire Station Command Control', 'Sinhgad Road Fire Station', '2025-12-16 12:07:07', 1, NULL),
(8, 'Deepak Mishra', 'Prayagraj, UP', 'deepak.mishra@example.com', '9345612789', 'Pilot', 'Pilot', 'Dandekar Pool Fire Station', '2025-12-17 05:47:12', 1, NULL),
(10, 'Sanjay Patel', 'Vadodara, Gujarat', 'sanjay.patel@example.com', '9292929292', 'Fire Station Command Control', 'Fire Station Command Control', 'Dandekar Pool Fire Station', '2025-12-17 11:41:31', 1, NULL),
(11, 'Rakesh Malhotra', 'Gurgaon, Haryana', 'rakesh.malhotra@example.com', '9811122233', 'Pilot', 'Pilot', 'Yerwada Fire Station', '2026-02-18 06:46:24', 1, NULL),
(13, 'Ashok Choudhary', 'Bikaner, Rajasthan', 'ashok.choudhary@example.com', '9798989898', 'Fire Station Command Control', 'Fire Station Command Control', 'Yerwada Fire Station', '2026-02-18 06:46:24', 1, NULL);

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
(3, 'Quick Response Vehicle', 'Fire QRV', 'MH-12-KJ-1003', '0453aa40-80a0-11f0-902d-59ff54eea995', 'Katraj Fire Station', 'On-Mission', '2025-12-05 09:47:34', 'Katraj Fire Station'),
(374, 'Quick Response Vehicle', 'Fire QRV', 'MH-12-CF-1001', 'VTS-QRV-104', 'Central Fire Brigade (Lohiya Nagar)', 'available', '2026-04-13 10:27:06', 'Central Fire Brigade (Lohiya Nagar)'),
(382, 'Quick Response Vehicle', 'Fire QRV', 'MH-12-DP-1104', 'VTS-QRV-112', 'Dandekar Pool Fire Station', 'maintenance', '2026-04-13 10:27:06', 'Dandekar Pool Fire Station'),
(384, 'Quick Response Vehicle', 'Fire QRV', 'MH-12-SR-1106', 'VTS-QRV-114', 'Sinhgad Road Fire Station', 'available', '2026-04-13 10:27:06', 'Sinhgad Road Fire Station');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drones`
--
ALTER TABLE `drones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `drone_code` (`drone_code`);

--
-- Indexes for table `drone_action_logs`
--
ALTER TABLE `drone_action_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drone_gps_logs`
--
ALTER TABLE `drone_gps_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `drone_code` (`drone_code`);

--
-- Indexes for table `drone_missions`
--
ALTER TABLE `drone_missions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `drone_id` (`drone_id`),
  ADD KEY `incident_id` (`incident_id`);

--
-- Indexes for table `fire_detections`
--
ALTER TABLE `fire_detections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fire_images`
--
ALTER TABLE `fire_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fire_station`
--
ALTER TABLE `fire_station`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_station_code` (`station_code`);

--
-- Indexes for table `incidents`
--
ALTER TABLE `incidents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `drones`
--
ALTER TABLE `drones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `drone_action_logs`
--
ALTER TABLE `drone_action_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `drone_gps_logs`
--
ALTER TABLE `drone_gps_logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `drone_missions`
--
ALTER TABLE `drone_missions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `fire_detections`
--
ALTER TABLE `fire_detections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `fire_images`
--
ALTER TABLE `fire_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `fire_station`
--
ALTER TABLE `fire_station`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=388;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `drone_missions`
--
ALTER TABLE `drone_missions`
  ADD CONSTRAINT `drone_missions_ibfk_1` FOREIGN KEY (`drone_id`) REFERENCES `drones` (`id`),
  ADD CONSTRAINT `drone_missions_ibfk_2` FOREIGN KEY (`incident_id`) REFERENCES `incidents` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
