-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 21, 2013 at 07:04 AM
-- Server version: 5.1.53
-- PHP Version: 5.3.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


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
  PRIMARY KEY (`empid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `interviewer_tbl`
--

INSERT INTO `interviewer_tbl` (`empid`, `firstname`, `lastname`) VALUES
(1967, 'Kamlesh', 'Gaikwad'),
(2435, 'Vishal', 'Chauhan'),
(2762, 'Ashish', 'Chandugade'),
(3279, 'Abhijit', 'Sagade'),
(3508, 'Awesh', 'Shrivastava'),
(3667, 'Sachin', 'Shinde'),
(3937, 'Prachi', 'Bhruguwar'),
(4003, 'Yogesh', 'Gaikwad'),
(4573, 'Rakesh', 'Thakor'),
(4593, 'Bhushan', 'Joshi'),
(4996, 'Nishant', 'Joshi'),
(5042, 'Amarendra', 'Samal'),
(5421, 'Ajay', 'Sajwan'),
(5426, 'Yogesh', 'Kodarkar'),
(5470, 'Dhritee', 'Rathore'),
(5689, 'Kumar', 'Kundan'),
(5995, 'Satvashil', 'Jagtap'),
(6536, 'Jatin', 'Patel'),
(6587, 'Omkar', 'Kulkarni'),
(6672, 'Jaydeep', 'Tank'),
(6735, 'Ram', 'Joshi'),
(6815, 'Shruti', 'Kshatriya'),
(6817, 'Sudhir', 'Nair'),
(6865, 'Mahesh', 'Sapkal'),
(6895, 'Basavraj', 'Keshatti'),
(7087, 'Pravin', 'Sonawane'),
(7559, 'Ajay', 'Pawar'),
(7601, 'Saju', 'Sasidharan'),
(7736, 'Mayur', 'Thakor'),
(7988, 'Gandharva', 'Jadhav'),
(8101, 'Shashank', 'Lakhotia'),
(8119, 'Navneet', 'Shrivastava'),
(8679, 'Manasi', 'Bhagwat'),
(8972, 'Snehal', 'Bhapkar'),
(9484, 'Ashish Kumar', 'Thawait'),
(9554, 'Swapna', 'Purohit'),
(9761, 'Hardik', 'Joshi'),
(10353, 'Sonam', 'Diwate'),
(11509, 'Shravan', 'Khare');

-- --------------------------------------------------------

--
-- Table structure for table `interviewmode_tbl`
--

CREATE TABLE IF NOT EXISTS `interviewmode_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mode` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `interviewmode_tbl`
--

INSERT INTO `interviewmode_tbl` (`id`, `mode`) VALUES
(1, 'Telephonic'),
(2, 'VC/Skype'),
(3, 'Personal');

-- --------------------------------------------------------

--
-- Table structure for table `interviewresponse_tbl`
--

CREATE TABLE IF NOT EXISTS `interviewresponse_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `candiateName` varchar(50) NOT NULL,
  `interviewer_1_id` int(11) NOT NULL,
  `interviewer_2_id` int(11) DEFAULT NULL,
  `recruiter_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `round_id` int(11) NOT NULL,
  `mode_id` int(11) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_IR_interviewer_1` (`interviewer_1_id`),
  KEY `fk_IR_interviewer_2` (`interviewer_2_id`),
  KEY `fk_IR_recruiter` (`recruiter_id`),
  KEY `fk_IR_status` (`status_id`),
  KEY `fk_IR_round` (`round_id`),
  KEY `fk_IR_mode` (`mode_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `interviewresponse_tbl`
--
INSERT INTO `interviewresponse_tbl`(`candiateName`, `interviewer_1_id`, `interviewer_2_id`, `recruiter_id`, `status_id`, `round_id`, `mode_id`, `description`) VALUES 
('Krishna Reddy',5421,7601,6523,1,2,1,'Does not have proper knowledge');

-- --------------------------------------------------------

--
-- Table structure for table `interviewrounds_tbl`
--

CREATE TABLE IF NOT EXISTS `interviewrounds_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `round` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `interviewrounds_tbl`
--

INSERT INTO `interviewrounds_tbl` (`id`, `round`) VALUES
(1, '1'),
(2, '2'),
(3, '3'),
(4, 'Final');

-- --------------------------------------------------------

--
-- Table structure for table `interviewstatus_tbl`
--

CREATE TABLE IF NOT EXISTS `interviewstatus_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `interviewstatus_tbl`
--

INSERT INTO `interviewstatus_tbl` (`id`, `status`) VALUES
(1, 'Rejected'),
(2, 'Call for F2F round'),
(3, 'OnHold'),
(4, 'Selected');

-- --------------------------------------------------------

--
-- Table structure for table `recruiter_tbl`
--

CREATE TABLE IF NOT EXISTS `recruiter_tbl` (
  `empid` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  PRIMARY KEY (`empid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recruiter_tbl`
--

INSERT INTO `recruiter_tbl` (`empid`, `firstname`, `lastname`) VALUES
(2635, 'Shwetambari', 'Salgar'),
(3915, 'Vikram', 'Chopra'),
(4118, 'Pooja Walia', 'Garde'),
(6201, 'Prakash', 'Vachhani'),
(6523, 'Kirti', 'Namjoshi'),
(7461, 'Ketan', 'Simant'),
(8063, 'Amruta', 'Joshi'),
(9495, 'Jitin', 'Naidu'),
(9637, 'Deepika', 'Gupta'),
(9758, 'Amit', 'Jain'),
(9846, 'Abhinav', 'Dingre'),
(9989, 'Amruta', 'Devale'),
(10035, 'Mavish', ' Ajaney'),
(10344, 'Ketaki', 'Hebalkar'),
(10772, 'Kina', 'Pandya'),
(10859, 'Raj', 'Pillai'),
(11337, 'Parul', 'Shrivastav');

-- --------------------------------------------------------

--
-- Table structure for table `users_tbl`
--

CREATE TABLE IF NOT EXISTS `users_tbl` (
  `empid` int(11) NOT NULL,
  `email` varchar(40) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`empid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_tbl`
--

INSERT INTO `users_tbl` (`empid`, `email`, `firstname`, `lastname`, `password`) VALUES
(7601, 'sajus@cybage.com', 'Saju', 'Sasidharan', 'sajus'),
(10748, 'ashwinh@cybage.com', 'Ashwin', 'Hegde', 'ashwinh');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `interviewresponse_tbl`
--
ALTER TABLE `interviewresponse_tbl`
  ADD CONSTRAINT `fk_IR_mode` FOREIGN KEY (`mode_id`) REFERENCES `interviewmode_tbl` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_IR_interviewer_1` FOREIGN KEY (`interviewer_1_id`) REFERENCES `interviewer_tbl` (`empid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_IR_interviewer_2` FOREIGN KEY (`interviewer_2_id`) REFERENCES `interviewer_tbl` (`empid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_IR_recruiter` FOREIGN KEY (`recruiter_id`) REFERENCES `recruiter_tbl` (`empid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_IR_round` FOREIGN KEY (`round_id`) REFERENCES `interviewrounds_tbl` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_IR_status` FOREIGN KEY (`status_id`) REFERENCES `interviewstatus_tbl` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
