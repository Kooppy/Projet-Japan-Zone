-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `num_blog` int NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL,
  `tags` varchar(32) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `alt` varchar(255) NOT NULL,
  `description` varchar(128) NOT NULL,
  `contents` longtext NOT NULL,
  `article_date` datetime NOT NULL,
  `author` varchar(128) NOT NULL,
  PRIMARY KEY (`num_blog`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complementAdresse`
--

DROP TABLE IF EXISTS `complementAdresse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complementAdresse` (
  `name` varchar(32) DEFAULT NULL,
  `first_name` varchar(32) DEFAULT NULL,
  `address` varchar(32) DEFAULT NULL,
  `postal_code` varchar(5) DEFAULT NULL,
  `city` varchar(15) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `num_user` int NOT NULL,
  PRIMARY KEY (`num_user`),
  KEY `I_FK_complementAdresse_user` (`num_user`),
  CONSTRAINT `complementAdresse_ibfk_1` FOREIGN KEY (`num_user`) REFERENCES `user` (`num_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complementAdresse`
--

LOCK TABLES `complementAdresse` WRITE;
/*!40000 ALTER TABLE `complementAdresse` DISABLE KEYS */;
/*!40000 ALTER TABLE `complementAdresse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complementProfil`
--

DROP TABLE IF EXISTS `complementProfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complementProfil` (
  `civility` char(1) DEFAULT NULL,
  `profil_info` varchar(255) DEFAULT NULL,
  `profil_activity` varchar(255) DEFAULT NULL,
  `num_user` int NOT NULL,
  PRIMARY KEY (`num_user`),
  KEY `I_FK_complementProfil_user` (`num_user`),
  CONSTRAINT `complementProfil_ibfk_1` FOREIGN KEY (`num_user`) REFERENCES `user` (`num_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complementProfil`
--

LOCK TABLES `complementProfil` WRITE;
/*!40000 ALTER TABLE `complementProfil` DISABLE KEYS */;
/*!40000 ALTER TABLE `complementProfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pictureBanque`
--

DROP TABLE IF EXISTS `pictureBanque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pictureBanque` (
  `num_picture` int NOT NULL AUTO_INCREMENT,
  `link_picture` varchar(255) NOT NULL,
  `title_picture` varchar(32) DEFAULT NULL,
  `description_picture` varchar(128) DEFAULT NULL,
  `data_size` varchar(32) NOT NULL,
  `alt` varchar(255) NOT NULL,
  PRIMARY KEY (`num_picture`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pictureBanque`
--

LOCK TABLES `pictureBanque` WRITE;
/*!40000 ALTER TABLE `pictureBanque` DISABLE KEYS */;
/*!40000 ALTER TABLE `pictureBanque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rang`
--

DROP TABLE IF EXISTS `rang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rang` (
  `isVerify` tinyint DEFAULT NULL,
  `isAdmin` tinyint DEFAULT NULL,
  `session_date` datetime DEFAULT NULL,
  `num_user` int NOT NULL,
  PRIMARY KEY (`num_user`),
  KEY `I_FK_rang_user` (`num_user`),
  CONSTRAINT `rang_ibfk_1` FOREIGN KEY (`num_user`) REFERENCES `user` (`num_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rang`
--

LOCK TABLES `rang` WRITE;
/*!40000 ALTER TABLE `rang` DISABLE KEYS */;
/*!40000 ALTER TABLE `rang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `num_user` int NOT NULL AUTO_INCREMENT,
  `email` varchar(32) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `pseudo` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `confirmation_date` datetime DEFAULT NULL,
  PRIMARY KEY (`num_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-07 16:18:37
