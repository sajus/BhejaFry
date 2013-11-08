-- phpMyAdmin SQL Dump
-- version 3.4.10.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 08, 2013 at 08:14 AM
-- Server version: 5.5.20
-- PHP Version: 5.3.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `interview_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `interviewer_tbl`
--

CREATE TABLE IF NOT EXISTS `interviewer_tbl` (
  `empid` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`empid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `interviewer_tbl`
--

INSERT INTO `interviewer_tbl` (`empid`, `firstname`, `lastname`, `createdAt`, `updatedAt`) VALUES
(0, ' ', ' ', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(1967, 'Kamlesh', 'Gaikwad', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(2435, 'Vishal', 'Chauhan', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(2762, 'Ashish', 'Chandugade', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(3279, 'Abhijit', 'Sagade', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(3508, 'Awesh', 'Shrivastava', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(3667, 'Sachin', 'Shinde', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(3937, 'Prachi', 'Bhruguwar', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(4003, 'Yogesh', 'Gaikwad', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(4573, 'Rakesh', 'Thakor', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(4593, 'Bhushan', 'Joshi', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(4996, 'Nishant', 'Joshi', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(5042, 'Amarendra', 'Samal', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(5421, 'Ajay', 'Sajwan', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(5426, 'Yogesh', 'Kodarkar', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(5470, 'Dhritee', 'Rathore', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(5689, 'Kumar', 'Kundan', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(5995, 'Satvashil', 'Jagtap', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(6536, 'Jatin', 'Patel', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(6587, 'Omkar', 'Kulkarni', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(6672, 'Jaydeep', 'Tank', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(6735, 'Ram', 'Joshi', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(6815, 'Shruti', 'Kshatriya', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(6817, 'Sudhir', 'Nair', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(6865, 'Mahesh', 'Sapkal', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(6895, 'Basavraj', 'Keshatti', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(7087, 'Pravin', 'Sonawane', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(7559, 'Ajay', 'Pawar', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(7601, 'Saju', 'Sasidharan', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(7736, 'Mayur', 'Thakor', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(7988, 'Gandharva', 'Jadhav', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(8101, 'Shashank', 'Lakhotia', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(8119, 'Navneet', 'Shrivastava', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(8679, 'Manasi', 'Bhagwat', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(8972, 'Snehal', 'Bhapkar', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(9484, 'Ashish Kumar', 'Thawait', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(9554, 'Swapna', 'Purohit', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(9761, 'Hardik', 'Joshi', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(10353, 'Sonam', 'Diwate', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(11509, 'Shravan', 'Khare', '2013-09-10 03:47:28', '2013-09-10 03:47:28');

-- --------------------------------------------------------

--
-- Table structure for table `interviewmode_tbl`
--

CREATE TABLE IF NOT EXISTS `interviewmode_tbl` (
  `mode` varchar(30) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `interviewmode_tbl`
--

INSERT INTO `interviewmode_tbl` (`mode`, `id`, `createdAt`, `updatedAt`) VALUES
('Telephonic', 1, '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
('VC/Skype', 2, '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
('Personal', 3, '2013-09-10 03:47:28', '2013-09-10 03:47:28');

-- --------------------------------------------------------

--
-- Table structure for table `interviewresponse_tbl`
--

CREATE TABLE IF NOT EXISTS `interviewresponse_tbl` (
  `candiateName` varchar(30) NOT NULL,
  `interviewDate` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `deleteFlag` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `interviewer_1_id` int(11) DEFAULT NULL,
  `interviewer_tblId` int(11) DEFAULT NULL,
  `interviewer_2_id` int(11) DEFAULT NULL,
  `mode_id` int(11) DEFAULT NULL,
  `interviewmode_tblId` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `round_id` int(11) DEFAULT NULL,
  `interviewrounds_tblId` int(11) DEFAULT NULL,
  `recruiter_id` int(11) DEFAULT NULL,
  `recruiter_tblId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `interviewer_1_id` (`interviewer_1_id`),
  KEY `interviewer_2_id` (`interviewer_2_id`),
  KEY `mode_id` (`mode_id`),
  KEY `status_id` (`status_id`),
  KEY `round_id` (`round_id`),
  KEY `recruiter_id` (`recruiter_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `interviewresponse_tbl`
--

INSERT INTO `interviewresponse_tbl` (`candiateName`, `interviewDate`, `description`, `deleteFlag`, `id`, `createdAt`, `updatedAt`, `interviewer_1_id`, `interviewer_tblId`, `interviewer_2_id`, `mode_id`, `interviewmode_tblId`, `status_id`, `round_id`, `interviewrounds_tblId`, `recruiter_id`, `recruiter_tblId`) VALUES
('Krishna Reddy', '2013-09-11', 'Does not have proper knowledge', 1, 1, '2013-09-10 03:47:28', '2013-09-10 03:47:28', 5421, NULL, 7601, 1, NULL, 1, 2, NULL, 6523, NULL),
('Krishna Iyer', '2013-09-11', 'Does not have proper knowledge', 0, 2, '2013-09-10 03:47:28', '2013-09-10 03:47:28', 5421, NULL, 7601, 1, NULL, 2, 2, NULL, 6523, NULL),
('Krishna Kumar', '2013-09-11', 'Does not have proper knowledge', 0, 3, '2013-09-10 03:47:28', '2013-09-10 03:47:28', 5421, NULL, 7601, 1, NULL, 3, 2, NULL, 6523, NULL),
('Krishna Desai', '2013-09-11', 'Does not have proper knowledge', 1, 4, '2013-09-10 03:47:28', '2013-09-10 03:47:28', 5421, NULL, 7601, 1, NULL, 4, 2, NULL, 6523, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `interviewrounds_tbl`
--

CREATE TABLE IF NOT EXISTS `interviewrounds_tbl` (
  `round` varchar(30) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `interviewrounds_tbl`
--

INSERT INTO `interviewrounds_tbl` (`round`, `id`, `createdAt`, `updatedAt`) VALUES
('1st Round', 1, '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
('2nd Round', 2, '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
('3rd Round', 3, '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
('Final', 4, '2013-09-10 03:47:28', '2013-09-10 03:47:28');

-- --------------------------------------------------------

--
-- Table structure for table `interviewstatus_tbl`
--

CREATE TABLE IF NOT EXISTS `interviewstatus_tbl` (
  `status` varchar(30) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `interviewstatus_tbl`
--

INSERT INTO `interviewstatus_tbl` (`status`, `id`, `createdAt`, `updatedAt`) VALUES
('Rejected', 1, '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
('Call for F2F round', 2, '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
('OnHold', 3, '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
('Selected', 4, '2013-09-10 03:47:28', '2013-09-10 03:47:28');

-- --------------------------------------------------------

--
-- Table structure for table `recruiter_tbl`
--

CREATE TABLE IF NOT EXISTS `recruiter_tbl` (
  `empid` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`empid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `recruiter_tbl`
--

INSERT INTO `recruiter_tbl` (`empid`, `firstname`, `lastname`, `createdAt`, `updatedAt`) VALUES
(2635, 'Shwetambari', 'Salgar', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(3915, 'Vikram', 'Chopra', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(4118, 'Pooja Walia', 'Garde', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(6201, 'Prakash', 'Vachhani', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(6523, 'Kirti', 'Namjoshi', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(7461, 'Ketan', 'Simant', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(8063, 'Amruta', 'Joshi', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(9495, 'Jitin', 'Naidu', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(9637, 'Deepika', 'Gupta', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(9758, 'Amit', 'Jain', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(9846, 'Abhinav', 'Dingre', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(9989, 'Amruta', 'Devale', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(10035, 'Mavish', 'Ajaney', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(10344, 'Ketaki', 'Hebalkar', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(10772, 'Kina', 'Pandya', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(10859, 'Raj', 'Pillai', '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(11337, 'Parul', 'Shrivastav', '2013-09-10 03:47:28', '2013-09-10 03:47:28');

-- --------------------------------------------------------

--
-- Table structure for table `users_tbl`
--

CREATE TABLE IF NOT EXISTS `users_tbl` (
  `empid` int(11) NOT NULL,
  `email` varchar(40) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `accesstype` tinyint(1) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `empid` (`empid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `users_tbl`
--

INSERT INTO `users_tbl` (`empid`, `email`, `firstname`, `lastname`, `password`, `accesstype`, `id`, `createdAt`, `updatedAt`) VALUES
(7601, 'sajus@cybage.com', 'Saju', 'Sasidharan', 'sajuspass', 1, 1, '2013-09-10 03:47:28', '2013-09-10 03:47:28'),
(10748, 'ashwinh@cybage.com', 'Ashwin', 'Hegde', 'ashwinpass', 0, 2, '2013-09-10 03:47:28', '2013-09-10 03:47:28');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `interviewresponse_tbl`
--
ALTER TABLE `interviewresponse_tbl`
  ADD CONSTRAINT `interviewresponse_tbl_ibfk_1` FOREIGN KEY (`interviewer_1_id`) REFERENCES `interviewer_tbl` (`empid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `interviewresponse_tbl_ibfk_2` FOREIGN KEY (`interviewer_2_id`) REFERENCES `interviewer_tbl` (`empid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `interviewresponse_tbl_ibfk_3` FOREIGN KEY (`mode_id`) REFERENCES `interviewmode_tbl` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `interviewresponse_tbl_ibfk_4` FOREIGN KEY (`status_id`) REFERENCES `interviewstatus_tbl` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `interviewresponse_tbl_ibfk_5` FOREIGN KEY (`round_id`) REFERENCES `interviewrounds_tbl` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `interviewresponse_tbl_ibfk_6` FOREIGN KEY (`recruiter_id`) REFERENCES `recruiter_tbl` (`empid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
