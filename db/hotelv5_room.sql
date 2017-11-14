-- MySQL dump 10.13  Distrib 5.7.19, for Linux (x86_64)
--
-- Host: localhost    Database: hotelv5
-- ------------------------------------------------------
-- Server version	5.7.19-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bed` tinyint(4) DEFAULT NULL,
  `fotoAddress` varchar(255) DEFAULT NULL,
  `number` bigint(20) DEFAULT NULL,
  `person` tinyint(4) DEFAULT NULL,
  `price` decimal(19,2) DEFAULT NULL,
  `size` tinyint(4) DEFAULT NULL,
  `id_type` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcq9it6m4f9n0g79xbjcpskusv` (`id_type`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,2,'web/images/room/13232388_4_e (1).jpg',101,2,47.00,12,2),(2,1,'web/images/room/13232388_32_e.jpg',201,2,50.00,12,2),(3,2,'web/images/room/13232388_9_e.jpg',301,3,50.00,12,2),(4,2,'web/images/room/13232388_34_e.jpg',102,3,74.00,26,3),(5,2,'web/images/room/13232388_37_e.jpg',202,3,85.00,34,3),(6,2,'web/images/room/873b77ff_e.jpg',302,2,60.00,25,2),(7,1,'web/images/room/178ede34_e.jpg',103,2,112.00,50,3),(8,1,'web/images/room/f3533307_e.jpg',203,1,29.00,12,2),(9,2,'web/images/room/4254c884_e.jpg',303,2,33.00,24,2),(10,1,'web/images/room/b613f58c_e.jpg',104,1,41.00,24,2),(11,1,'web/images/room/1ce5ac72_e.jpg',204,2,45.00,24,2),(12,3,'web/images/room/53ac7675_e.jpg',304,4,68.00,34,3),(13,1,'web/images/room/e941ea1d_e.jpg',105,2,106.00,68,3),(14,1,'web/images/room/f2a08f15_e.jpg',205,2,120.00,50,3),(15,5,'web/images/room/c451853b_e.jpg',305,6,48.00,29,7),(16,3,'web/images/room/4a6a2877_e.jpg',106,4,168.00,32,3),(17,3,'web/images/room/7527d7ab_e.jpg',206,5,194.00,47,3),(18,2,'web/images/room/d46dc992_e.jpg',306,2,128.00,37,2),(19,1,'web/images/room/3be4f9a0_e.jpg',107,2,123.00,37,2),(20,2,'web/images/room/8ffe4c45_e.jpg',207,3,133.00,40,4),(21,2,'web/images/room/47961e14_e.jpg',307,3,159.00,49,5),(22,2,'web/images/room/71dd3e80_e.jpg',108,3,368.00,80,4),(23,2,'web/images/room/958cc105_e.jpg',208,4,500.00,87,3);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-30 15:48:50
