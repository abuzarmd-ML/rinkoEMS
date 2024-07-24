

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `company_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `phone` int(10) NOT NULL,
  `nie` varchar(30) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `pincode` int(6) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `system_date` date DEFAULT NULL,
  `caducidad` date DEFAULT NULL,
  `country` varchar(10) DEFAULT NULL
) 

Table structure for table `clients`
CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` int(10) NOT NULL,
  `email` varchar(20) DEFAULT NULL,
  `company` varchar(20) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `country` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `nie` varchar(30) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `note` varchar(30) DEFAULT NULL,
   
)


Table structure for table `Obra':

CREATE TABLE `obras`(
  `obra_id` int(11) NOT NULL,
  `obra_name` varchar(255) DEFAULT NULL,
  `phone` int(10) NOT NULL,
  `email` varchar(20) DEFAULT NULL,
  `company_ID` int(11) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `nie` varchar(30) DEFAULT NULL,
  `obra_website` varchar(50) DEFAULT NULL,
  `F_Date` date DEFAULT NULL,
   
)

Table structure for table `Projects':

CREATE TABLE `projects`(
  `project_id` int(11) NOT NULL,
  `comunidad_name` varchar(255) DEFAULT NULL,
  `fact_email` varchar(20) DEFAULT NULL,
  `company` varchar(90) DEFAULT NULL,
  `obra_id` int(10) DEFAULT NULL,
  `nie` varchar(30) DEFAULT NULL,
  `obra_website` varchar(50) DEFAULT NULL,
  `cudad_id` int(10) DEFAULT NULL,
   venc_days date DEAULT NULL,
   
)

----------------------------------
employee_statuses:

CREATE TABLE IF NOT EXISTS employee_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);