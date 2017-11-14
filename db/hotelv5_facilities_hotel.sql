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
-- Table structure for table `facilities_hotel`
--

DROP TABLE IF EXISTS `facilities_hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facilities_hotel` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `value` varchar(255) DEFAULT NULL,
  `id_hotel` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj6ut51ai0y8xtucenxwnw80gg` (`id_hotel`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facilities_hotel`
--

LOCK TABLES `facilities_hotel` WRITE;
/*!40000 ALTER TABLE `facilities_hotel` DISABLE KEYS */;
INSERT INTO `facilities_hotel` VALUES (1,'facilitiesHotel.airportTransfers',1),(2,'facilitiesHotel.bar',1),(3,'facilitiesHotel.business',1),(4,'facilitiesHotel.childcare',1),(5,'facilitiesHotel.connectingRooms',1),(6,'facilitiesHotel.cribsAvailable',1),(7,'facilitiesHotel.freeBreakfast',1),(8,'facilitiesHotel.freeParking',1),(9,'facilitiesHotel.freeWifi',1),(10,'facilitiesHotel.gym',1),(11,'facilitiesHotel.meeting',1),(12,'facilitiesHotel.parkingAvailable',1),(13,'facilitiesHotel.petFriendly',1),(14,'facilitiesHotel.pool',1),(15,'facilitiesHotel.restaurant',1),(16,'facilitiesHotel.skiShuttle',1),(17,'facilitiesHotel.spa',1),(18,'facilitiesHotel.kitchen',1);
/*!40000 ALTER TABLE `facilities_hotel` ENABLE KEYS */;
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
