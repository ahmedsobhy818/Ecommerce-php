-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2020 at 11:40 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) CHARACTER SET latin1 NOT NULL,
  `ArabicName` varchar(100) CHARACTER SET latin1 NOT NULL,
  `Description` varchar(1000) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ID`, `Name`, `ArabicName`, `Description`) VALUES
(1, 'Vegatables', '??????', 'Best Vegatables In Egypt'),
(2, 'Fruits', '?????', 'Best Fruits In Egypt');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Value` int(11) NOT NULL,
  `Comment` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`ID`, `UserID`, `ProductID`, `Value`, `Comment`) VALUES
(1, 1, 1, 5, 'Very Good Product'),
(2, 2, 1, 5, ' Good Product'),
(3, 3, 1, 4, ' Good '),
(4, 1, 30, 5, 'i love it'),
(5, 2, 30, 5, 'excellent'),
(6, 1, 40, 5, 'excellent'),
(7, 2, 40, 5, 'abc'),
(8, 3, 40, 5, 'xyz'),
(9, 24, 40, 3, 'not so good'),
(10, 25, 40, 4, ' so good'),
(11, 25, 40, 4, ' so good'),
(12, 25, 40, 4, ' so good'),
(13, 24, 40, 3, 'qaqa'),
(14, 24, 40, 3, 'qaqa'),
(15, 24, 40, 3, 'qaqa'),
(16, 24, 40, 3, 'qaqa'),
(17, 24, 40, 3, 'qaqa'),
(18, 24, 40, 3, 'qaqa'),
(19, 24, 40, 3, 'qaqa'),
(20, 24, 40, 5, 'it is very good product , i loved it'),
(21, 24, 40, 5, 'i love this fruit'),
(22, 24, 40, 1, 'so bad'),
(23, 24, 1, 4, 'i love gazar'),
(24, 24, 30, 3, 'Good'),
(25, 24, 3, 5, 'i love potatoes'),
(26, 24, 4, 4, 'good !'),
(27, 24, 44, 5, 'i love orange juice'),
(28, 24, 44, 5, 'i like it'),
(29, 24, 41, 5, 'i love banana'),
(30, 24, 9, 4, 'ok'),
(31, 24, 26, 3, 'shabat'),
(32, 24, 28, 4, 'red basl'),
(33, 25, 28, 4, 'good'),
(34, 25, 20, 0, 'mmm'),
(35, 25, 49, 0, ''),
(36, 25, 48, 4, 'apple'),
(37, 25, 3, 4, 'good'),
(38, 25, 53, 5, 'انا احب الفراولة كثيرا'),
(39, 25, 1, 5, 'good'),
(40, 24, 53, 4, 'Good'),
(41, 24, 1, 2, 'aaa'),
(42, 25, 12, 5, 'very good'),
(43, 24, 12, 4, 'i love it'),
(44, 27, 53, 4, 'good'),
(45, 24, 33, 5, 'good'),
(46, 27, 33, 2, 'so bad'),
(47, 24, 52, 5, 'very good'),
(48, 26, 14, 4, 'ما اجمل البردقوش'),
(49, 26, 49, 3, 'ما اجمل الكيوى'),
(50, 26, 50, 5, 'i love mango'),
(51, 27, 44, 4, 'i love orange'),
(52, 26, 44, 4, 'good'),
(53, 26, 51, 4, 'i love shmam'),
(54, 26, 53, 1, 'cc'),
(55, 25, 45, 4, 'good'),
(56, 24, 45, 3, 'not bad'),
(57, 24, 2, 4, 'good'),
(58, 25, 51, 2, 'ok'),
(59, 25, 47, 4, 'good'),
(60, 26, 52, 3, 'aaa'),
(61, 25, 46, 4, 'goooood'),
(62, 26, 30, 4, 'good'),
(63, 28, 53, 2, 'good'),
(64, 28, 9, 5, 'good'),
(65, 28, 19, 4, 'ok'),
(66, 26, 41, 4, 'good product'),
(67, 29, 53, 5, 'good'),
(68, 28, 43, 5, 'good');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Phone` varchar(50) NOT NULL,
  `Price` double NOT NULL,
  `Tax` double NOT NULL,
  `Shipping` double NOT NULL,
  `Total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `orderdata`
--

CREATE TABLE `orderdata` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Phone` varchar(50) NOT NULL,
  `Price` double NOT NULL,
  `Tax` double NOT NULL,
  `Shipping` double NOT NULL,
  `Total` double NOT NULL,
  `Status` int(11) NOT NULL,
  `OrderTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orderdata`
--

INSERT INTO `orderdata` (`ID`, `UserID`, `Address`, `Phone`, `Price`, `Tax`, `Shipping`, `Total`, `Status`, `OrderTime`) VALUES
(1, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(2, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(3, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(4, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(5, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(6, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(7, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(8, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(9, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(10, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(11, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(12, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(13, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(14, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(15, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(16, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(17, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(18, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(19, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(20, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(21, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(22, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(23, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(24, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(25, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(26, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(27, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(28, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(29, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(30, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(31, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(32, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(33, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(34, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(35, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 38, 1.14, 1.9, 41.04, 0, '0000-00-00 00:00:00'),
(36, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 23, 0.69, 1.15, 24.84, 0, '0000-00-00 00:00:00'),
(37, 24, 'hhhhh', '12344556', 58, 1.74, 2.9, 62.64, 0, '0000-00-00 00:00:00'),
(38, 24, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 58, 1.74, 2.9, 62.64, 0, '0000-00-00 00:00:00'),
(39, 24, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 58, 1.74, 2.9, 62.64, 0, '0000-00-00 00:00:00'),
(40, 24, '19 hekr street', '123456', 76.5, 2.295, 3.825, 82.62, 0, '0000-00-00 00:00:00'),
(41, 24, '19 hekr street', '33434', 13, 0.39, 0.65, 14.04, 0, '0000-00-00 00:00:00'),
(42, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 15, 0.45, 0.75, 16.2, 0, '0000-00-00 00:00:00'),
(43, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 78, 2.34, 3.9, 84.24, 0, '2020-09-03 17:20:18'),
(44, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 98, 2.94, 4.9, 105.84, 0, '2020-09-03 17:36:06'),
(45, 26, 'qqqqq', '1234', 28, 0.84, 1.4, 30.24, 0, '2020-09-03 18:01:54'),
(46, 25, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 11, 0.33, 0.55, 11.88, 0, '2020-09-03 18:54:49'),
(47, 25, 'qwer', '1234', 100, 3, 5, 108, 0, '2020-09-03 18:59:03'),
(48, 25, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 78, 2.34, 3.9, 84.24, 0, '2020-09-03 19:08:20'),
(49, 25, 'abbasia', '43434343', 142, 4.26, 7.1, 153.36, 0, '2020-09-04 17:25:37'),
(50, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 69, 2.07, 3.45, 74.52, 0, '2020-09-08 13:42:02'),
(51, 28, '1 Ibrahim bik , al helmia al gadeda', '22222222', 72, 2.16, 3.6, 77.76, 0, '2020-09-08 14:54:08'),
(52, 26, '1 Ibrahim bik , al helmia al gadeda', '01227126789', 25, 0.75, 1.25, 27, 0, '2020-09-08 15:25:04'),
(53, 26, 'wqwqw', '3234354656', 105, 3.15, 5.25, 113.4, 0, '2020-09-08 15:27:38'),
(54, 26, 'الحلمية', '12343434', 70, 2.1, 3.5, 75.6, 0, '2020-09-08 16:24:31'),
(55, 28, 'yyyy', '123', 81, 2.43, 4.05, 87.48, 0, '2020-09-08 16:34:37');

-- --------------------------------------------------------

--
-- Table structure for table `orderlines`
--

CREATE TABLE `orderlines` (
  `ID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `UnitPrice` double NOT NULL,
  `nItems` int(11) NOT NULL,
  `Tax` double NOT NULL,
  `Shipping` double NOT NULL,
  `Total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orderlines`
--

INSERT INTO `orderlines` (`ID`, `OrderID`, `ProductID`, `UnitPrice`, `nItems`, `Tax`, `Shipping`, `Total`) VALUES
(1, 34, 30, 15, 2, 0.9, 1.5, 32.4),
(2, 35, 30, 15, 2, 0.9, 1.5, 32.4),
(3, 36, 30, 15, 1, 0.45, 0.75, 16.2),
(4, 36, 1, 4, 2, 0.24, 0.4, 8.64),
(5, 37, 8, 7, 1, 0.21, 0.35, 7.56),
(6, 37, 12, 9, 2, 0.54, 0.9, 19.44),
(7, 37, 13, 11, 3, 0.99, 1.65, 35.64),
(8, 38, 8, 7, 1, 0.21, 0.35, 7.56),
(9, 38, 12, 9, 2, 0.54, 0.9, 19.44),
(10, 38, 13, 11, 3, 0.99, 1.65, 35.64),
(11, 39, 8, 7, 1, 0.21, 0.35, 7.56),
(12, 39, 12, 9, 2, 0.54, 0.9, 19.44),
(13, 39, 13, 11, 3, 0.99, 1.65, 35.64),
(14, 40, 50, 11.5, 1, 0.345, 0.575, 12.42),
(15, 40, 51, 13, 5, 1.95, 3.25, 70.2),
(16, 41, 53, 13, 1, 0.39, 0.65, 14.04),
(17, 42, 44, 15, 1, 0.45, 0.75, 16.2),
(18, 43, 53, 13, 1, 0.39, 0.65, 14.04),
(19, 43, 52, 13, 5, 1.95, 3.25, 70.2),
(20, 44, 51, 13, 5, 1.95, 3.25, 70.2),
(21, 44, 49, 11, 3, 0.99, 1.65, 35.64),
(22, 45, 48, 14, 2, 0.84, 1.4, 30.24),
(23, 46, 49, 11, 1, 0.33, 0.55, 11.88),
(24, 47, 46, 8, 5, 1.2, 2, 43.2),
(25, 47, 44, 15, 4, 1.8, 3, 64.8),
(26, 48, 45, 14, 2, 0.84, 1.4, 30.24),
(27, 48, 29, 5, 10, 1.5, 2.5, 54),
(28, 49, 3, 5, 2, 0.3, 0.5, 10.8),
(29, 49, 49, 11, 2, 0.66, 1.1, 23.76),
(30, 49, 44, 15, 4, 1.8, 3, 64.8),
(31, 49, 10, 5, 10, 1.5, 2.5, 54),
(32, 50, 52, 13, 5, 1.95, 3.25, 70.2),
(33, 50, 1, 4, 1, 0.12, 0.2, 4.32),
(34, 51, 52, 13, 1, 0.39, 0.65, 14.04),
(35, 51, 47, 13, 2, 0.78, 1.3, 28.08),
(36, 51, 49, 11, 3, 0.99, 1.65, 35.64),
(37, 52, 33, 5, 1, 0.15, 0.25, 5.4),
(38, 52, 34, 10, 1, 0.3, 0.5, 10.8),
(39, 52, 41, 10, 1, 0.3, 0.5, 10.8),
(40, 53, 41, 10, 3, 0.9, 1.5, 32.4),
(41, 53, 44, 15, 5, 2.25, 3.75, 81),
(42, 54, 41, 10, 4, 1.2, 2, 43.2),
(43, 54, 44, 15, 2, 0.9, 1.5, 32.4),
(44, 55, 52, 13, 1, 0.39, 0.65, 14.04),
(45, 55, 45, 14, 3, 1.26, 2.1, 45.36),
(46, 55, 35, 13, 2, 0.78, 1.3, 28.08);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `ArabicName` varchar(100) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `OldPrice` double NOT NULL,
  `Price` double NOT NULL,
  `Qty` int(11) NOT NULL,
  `CatID` int(11) NOT NULL,
  `NSold` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ID`, `Name`, `ArabicName`, `Description`, `OldPrice`, `Price`, `Qty`, `CatID`, `NSold`) VALUES
(1, 'Carrot', 'جزر', 'Fresh Carrot', 5, 4, 1, 1, 2003),
(2, 'Cucumber', 'خيار', 'Fresh Cucumber', 10, 8, 1, 1, 1009),
(3, 'Potatos', 'بطاطس تحمير', 'Fresh Potatos', 7, 5, 0, 1, 2002),
(4, 'Golden onion', 'بصل ذهبى', 'Fresh Onion', 10, 9, 200, 1, 4000),
(5, 'Tomatoes', 'طماطم', 'Fresh Tomatoes From Our Farm', 8, 5, 100, 1, 3000),
(6, 'Garlic', 'ثوم بلدى', 'Fresh Garlic From Our Farm', 7, 7, 100, 1, 2000),
(7, 'Aubergine', 'باذنجان', 'Fresh Aubergine From Our Farm', 8, 6, 200, 1, 500),
(8, 'Bell pepper', 'فلفل رومى', 'Fresh Bell pepper From Our Farm', 7.5, 7, 197, 1, 1003),
(9, 'Lemon Grass', 'ليمون جراس', 'Fresh Lemon Grass From Our Farm', 7, 7, 150, 1, 1300),
(10, 'Tomato for sauce', 'طماطم للصلصة', 'Fresh Tomato for sauce From Our Farm', 7, 5, 90, 1, 10010),
(11, 'Small Golden onion', 'بصل ذهبى بيبي', 'Fresh Small Golden onion From Our Farm', 12, 11, 300, 1, 500),
(12, 'Red Colored pepper', 'فلفل احمر الوان', 'Fresh Red Colored pepper From Our Farm', 10, 9, 94, 1, 16),
(13, 'Yellow Colored pepper', 'فلفل الوان اصفر', 'Fresh Yellow Colored pepper From Our Farm', 11, 11, 191, 1, 20),
(14, 'Marjoram', 'بردقوش', 'Fresh Marjoram From Our Farm', 17, 15, 100, 1, 102),
(15, 'Ready garlic', 'ثوم جاهز', 'Fresh Ready garlic From Our Farm', 3, 2.5, 200, 1, 1044),
(16, 'Basil', 'ريحان', 'Fresh Basil From Our Farm', 7, 5, 200, 1, 240),
(17, 'Rosemary', 'روزمارى', 'Fresh Rosemary From Our Farm', 12, 12, 100, 1, 200),
(18, 'Celery', 'كرفس بلدى', 'Fresh Celery From Our Farm', 15, 13, 100, 1, 200),
(19, 'Korrat', 'كرات افرنجى', 'Fresh Korrat From Our Farm', 14, 12, 300, 1, 10),
(20, 'Grid garlic', 'ثوم شبك', 'Fresh Grid garlic From Our Farm', 17, 15, 200, 1, 109),
(21, 'Ginger', 'زنجبيل', 'Fresh Ginger From Our Farm', 6, 5, 200, 1, 1900),
(22, 'Coriander', 'كزبرة', 'Fresh Coriander From Our Farm', 6, 5, 200, 1, 109),
(23, 'White cabbage', 'كرنب ابيض', 'Fresh White cabbage From Our Farm', 6, 6, 200, 1, 2600),
(24, 'Red cabbage', 'كرنب احمر', 'Fresh Red cabbage From Our Farm', 7, 7, 200, 1, 1000),
(25, 'Parsley', 'بقدونس', 'Fresh Parsley From Our Farm', 8, 5, 500, 1, 600),
(26, 'Dill', 'شبت', 'Fresh Dill From Our Farm', 7, 6, 200, 1, 160),
(27, 'Zucchini', 'كوسة', 'Fresh Zucchini From Our Farm', 9, 8, 200, 1, 106),
(28, 'Red onion', 'بصل احمر', 'Fresh Red onion From Our Farm', 6, 5, 200, 1, 1200),
(29, 'White Aubergine', 'باذنجان ابيض', 'Fresh White Aubergine From Our Farm', 5, 5, 290, 1, 160),
(30, 'Molokhia', 'ملوخية', 'Fresh Molokhia From Our Farm', 17, 15, 0, 1, 110),
(31, 'Beet', 'بنجر', 'Fresh Beet From Our Farm', 7, 7, 300, 1, 2000),
(32, 'Potato', 'بطاطا', 'Fresh Potato From Our Farm', 8, 7, 100, 1, 6000),
(33, 'Pumpkin', 'قرع عسل', 'Fresh Pumpkin From Our Farm', 7, 5, 49, 1, 5001),
(34, 'Lemon', 'ليمون بلدى', 'Fresh Lemon From Our Farm', 12, 10, 199, 1, 101),
(35, 'Peache', 'خوخ بلدى', 'Fresh Peache From Our Farm', 15, 13, 198, 2, 152),
(36, 'Plum', 'برقوق', 'Fresh Plum From Our Farm', 11, 10, 20, 2, 10),
(37, 'Grape', 'عنب سوبيريور', 'Fresh Grape From Our Farm', 12, 11, 10, 2, 100),
(38, 'Watermelon', 'بطيخ', 'Fresh Watermelon From Our Farm', 15.5, 15, 50, 2, 14),
(39, 'Red Apple', 'تفاح احمر', 'Fresh Red Apple From Our Farm', 14.5, 13, 250, 2, 1234),
(40, 'Pomegranate', 'رمان', 'Fresh Pomegranate From Our Farm', 15, 12, 300, 2, 10),
(41, 'Banana', 'موز', 'Fresh Banana From Our Farm', 11, 10, 1, 2, 208),
(42, 'Chinese pear', 'كمثرى صينى', 'Fresh Chinese pear From Our Farm', 15, 14, 100, 2, 160),
(43, 'Avocado', 'افوكادو', 'Fresh Avocado From Our Farm', 13, 13, 100, 2, 103),
(44, 'Orange', 'برتقال', 'Fresh Orange From Our Farm', 15, 15, 184, 2, 1019),
(45, 'African pear', 'كمثري افريقي', 'Fresh African pear From Our Farm', 16, 14, 5, 2, 1065),
(46, 'Black Grape', 'عنب اسود', 'Fresh Black Grape From Our Farm', 10, 8, 25, 2, 1305),
(47, 'Red Grape', 'عنب فليم', 'Fresh Red Grape From Our Farm', 13, 13, 198, 2, 702),
(48, 'Green Apple', 'تفاح اخضر', 'Fresh Green Apple From Our Farm', 16, 14, 298, 2, 102),
(49, 'Kiwi', 'كيوى', 'Fresh Kiwi From Our Farm', 11, 11, 191, 2, 159),
(50, 'Mango', 'مانجو', 'Fresh Mango From Our Farm', 12, 11.5, 0, 2, 301),
(51, 'Melon', 'شمام', 'Fresh Melon From Our Farm', 15, 13, 90, 2, 20),
(52, 'Watermelon without seed', 'بطيخ احمر بدون بذر', 'Fresh Watermelon without seed From Our Farm', 14, 13, 188, 2, 1212),
(53, 'Strawberries', 'فراولة', 'Fresh Strawberries From Our Farm', 13, 13, 0, 2, 102);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `ID` int(11) NOT NULL,
  `StoreName` varchar(100) NOT NULL,
  `ShippingPercent` double NOT NULL,
  `TaxPercent` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`ID`, `StoreName`, `ShippingPercent`, `TaxPercent`) VALUES
(1, 'ABC Store', 0.05, 0.03);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `CreationDate` date NOT NULL,
  `Gender` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Name`, `UserName`, `Password`, `CreationDate`, `Gender`) VALUES
(1, 'Ahmed', 'Ahmed0@gmail.com', '818', '2020-08-01', 'M'),
(2, 'Mohamed', 'Mohamed@yahoo.com', '715', '2020-08-03', 'M'),
(3, 'Marwa', 'Marwa@hotmail.com', '333', '2020-08-11', 'F'),
(4, 'Magdy', 'Magdy@gmail.com', '3333', '2020-08-01', 'M'),
(5, 'Ahmed sobhy', 'Ahmed2@gmail.com', '$2y$10$TIYJei.bYCO0j3K3.JB.SegtNMKHz55Z9njKO1l9ECn', '2020-08-27', 'M'),
(6, 'qqq', 'q@f.z', '$2y$10$zzcGQRoCGZCC8Vj0BHidPu/lYtd/phFAYzYcTr/EdBy', '2020-08-27', 'F'),
(7, 'Abeer', 'abber@yahoo', '$2y$10$zrWZA4Ai25mtgsbNfSmAxOaSeLmYMQ1FIT4rT.U7zhw', '2020-08-27', 'F'),
(8, 'soad', 'soad@aa.ss', '$2y$10$uiSbXCnEZ3/92TruIwKpxOry7cn/J3fjbLOum9Vhoqp', '2020-08-27', 'F'),
(9, 'soad', 'soad@aa.ss', '$2y$10$mD6JGRQhZ6hypTm4VWHCbu80RIZG8WMboPLcNZF02uF', '2020-08-27', 'F'),
(10, 'soad', 'soad@aa.ss', '$2y$10$V8WgGweuvNAnqZjacv7hkO67WVZtSVowki0QypvBNKv', '2020-08-27', 'F'),
(11, 'Ibrahim', 'hima@gg.d', '$2y$10$XFG8otGiieHB68z8MN99kuh5HTozwo0F83cerKcMkHI', '2020-08-27', 'M'),
(12, 'Maged', 'mg@rr.w', '$2y$10$53Y0EpSa5DShYPElGrlqAOw4V8xzvpaiTU97ha6HeYU', '2020-08-27', 'M'),
(13, 'Amira', 'amira@gmail.com', '$2y$10$PQoAe/r6hegaQPZIDCb8vuZMFE.lsZDtVsOOHhttONB', '2020-08-27', 'F'),
(14, 'Aly', 'Aly@Gmail.com', '$2y$10$tndvoRNnCuMv0ktevc0ugOADgeEfGRJ7wk/Ds8WKNuF', '2020-08-27', 'M'),
(15, 'Alia', 'Alya@gmail.com', '$2y$10$t0S8.cG0BUq0fnIWpDy6QeuyJ25.g6k9uhulSrGD5o0', '2020-08-27', 'F'),
(16, 'Shadia', 'sh@ww.w', '$2y$10$n6YohqKCt0.4cub.KP3f7ebUNsZn6w4VQCH9Cq/8i0V', '2020-08-27', 'F'),
(17, 'Wael', 'wael@q.q', '$2y$10$5qcViP6U1nQEXNaV6TiPq.os7WSBMRSqFv1sdWsBrbf', '2020-08-27', 'M'),
(18, 'Zakaria', 'zico@q.w', '$2y$10$u4zyJjn3AwwW76ZTN3BEvurmSSvN9ur9i0RdMSDfpiK', '2020-08-27', 'M'),
(19, 'Abeer', 'abber@yahoo', '$2y$10$mlGI7psrTU5g1/7faWnh0Ooc2V7NWOJ9Uy6iDXMD1Pd', '2020-08-27', 'F'),
(20, 'Adham', 'adham@gmail.com', '$2y$10$NpAzLi3Onv/U5QeR0opQa.sqpLTe6Qb8HrXoc3/7qOA', '2020-08-27', 'M'),
(21, 'Sayed', 'sayed@gmail.com', '$2y$10$gjjI5On4.lJLFrQkHnkWEupcRiUqJzNro8zB2f23I3d', '2020-08-28', 'M'),
(22, 'Amr', 'Amr@gmail.com', '$2y$10$QxEnAbvh0Tej24Gi/ieGy.jHvj5VcMk/4zRDmAjPEMn', '2020-08-28', 'M'),
(23, 'Amr Abdelsalam', 'Amr@gmail.com', '$2y$10$.RfEgP3f962NparwQREwxOAzrsXlWdVS9BMuQYhfAfSbkQjemjnvW', '2020-08-28', 'M'),
(24, 'Omar', 'Omar@gmail.com', '$2y$10$4ZxAzF9tr6y1qKt8sHBb.e3akiXg3N3aiRojRcguDkhol4iz8djNu', '2020-08-28', 'M'),
(25, 'Bakr', 'Bakr@gmail.com', '$2y$10$r9Y3/CXGDLPLA.GLk8jBBOfjcrm6LFcEb.aRs9UPzuZU/ciwiQtcC', '2020-08-28', 'M'),
(26, 'Ahmed Sobhy', 'ahmed@gmail.com', '$2y$10$.tZd7PWN9CRO.dDa74xB8OZ7IVda60v2XYbzDrUQydwfWHgum0kPG', '2020-08-28', 'M'),
(27, 'Hagar', 'hagar@hotmail.com', '$2y$10$2e5W6sEH.UDSxCvra./EGO6E78vL.yIX2b7H80huwaUcJj7ygHEO.', '2020-08-28', 'F'),
(28, 'Fatma', 'fatma@gmail.com', '$2y$10$HqYbry50Zuwl8148eDwz5u7T.C1Ae7JCzwZkJugqsfb6PCzv9iD6q', '2020-09-08', 'F'),
(29, 'Ibrahim', 'ibrahim@gmail.com', '$2y$10$9rQiAwsVvKWJnoZhRWK.ZOgQBDi/JspdNsXvXcDA4f7cCPexhQyIe', '2020-09-08', 'M');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `orderdata`
--
ALTER TABLE `orderdata`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `orderlines`
--
ALTER TABLE `orderlines`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderdata`
--
ALTER TABLE `orderdata`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `orderlines`
--
ALTER TABLE `orderlines`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
