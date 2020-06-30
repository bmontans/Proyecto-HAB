-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: market
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `pk_id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(18,2) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `modification_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`pk_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (2,2,'Playstation 4','Consoles','Por este precio me compraba 9 FIFAs',450.00,'2020-05-22','2020-06-25 16:05:25'),(3,2,'XBOX ONE','Consoles','Viva Bill Gates',500.00,'2020-05-22','2020-05-22 17:09:27'),(4,5,'iPad Pro 9','Test','Puedes ver Netflix a top de calidad',300.00,'2020-06-22','2020-06-25 17:51:21'),(7,7,'Corsair Lux 90','Keyboard','Tiene lucecitas de colores',90.99,'2020-06-23','2020-06-28 13:36:24'),(8,5,'Logitech 890','Mices','Cambia de colorines, super guay, comprámelo ya que me lo quitan de las manos.',100.00,'2020-06-25','2020-06-29 13:49:49'),(9,5,'iPad','Phone','Unopened, full warrant included.',900.00,'2020-06-29','2020-06-29 15:04:38');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ratings` (
  `pk_id` int(11) NOT NULL AUTO_INCREMENT,
  `rating` int(11) DEFAULT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `id_transaction` int(11) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `modification_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_id`),
  KEY `id_product` (`id_product`),
  KEY `id_transaction` (`id_transaction`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`pk_id`),
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`id_transaction`) REFERENCES `transactions` (`pk_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,5,'Recomiendo su compra, un muy buen teclado',7,1,'2020-06-28','2020-06-28 11:09:38'),(2,5,'Recomiendo su compra, un muy buen teclado',7,2,'2020-06-28','2020-06-28 11:11:31'),(3,4,'dadas',8,12,'2020-06-28','2020-06-28 14:04:57'),(4,4,'test',2,10,'2020-06-28','2020-06-28 14:31:46'),(5,5,'Can recommend this product',8,13,'2020-06-29','2020-06-29 15:05:56'),(6,4,'Muy chulo',3,14,'2020-06-29','2020-06-29 16:07:33');
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `pk_id` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `purchase_date` date DEFAULT NULL,
  `modification_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_id`),
  KEY `id_product` (`id_product`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`pk_id`),
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`pk_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,7,10,NULL,'rio','2020-06-27','2020-06-27 17:39:14'),(2,7,10,NULL,'rio','2020-06-27','2020-06-27 17:43:00'),(3,7,10,NULL,'rio','2020-06-27','2020-06-27 17:52:30'),(4,7,10,500,'rio','2020-06-27','2020-06-27 17:58:21'),(5,7,10,500,'rio','2020-06-27','2020-06-27 18:23:49'),(6,2,5,300,'Galicia','2020-06-28','2020-06-28 12:10:42'),(7,2,5,300,'Galicia','2020-06-28','2020-06-28 12:19:39'),(8,2,5,300,'Galicia','2020-06-28','2020-06-28 12:21:39'),(9,2,5,300,'Galicia','2020-06-28','2020-06-28 12:22:46'),(10,2,5,450,'Galicia','2020-06-28','2020-06-28 12:33:21'),(11,7,7,90.97,'admin','2020-06-28','2020-06-28 12:34:22'),(12,8,7,60,'admin','2020-06-28','2020-06-28 12:45:49'),(13,8,5,100,'Galicia','2020-06-29','2020-06-29 15:05:22'),(14,3,13,500,'Barcelona','2020-06-29','2020-06-29 16:07:13');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `pk_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `birthdate` datetime NOT NULL,
  `password` varchar(255) NOT NULL,
  `creation_date` date DEFAULT NULL,
  `modification_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_last_update` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `profile_picture` varchar(255) DEFAULT NULL,
  `role` enum('normal','admin') NOT NULL DEFAULT 'normal',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `registrationcode` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`pk_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'Berry','LaCoruNeno','delisick+berry@gmail.com','1940-07-12 00:00:00','$2b$10$tS9wZCflHzzNYce3d8vjk.n5PrkD0VNp3uO9A65qh7s3NJ0GJ56Q.','2020-05-22','2020-05-22 16:56:16','2020-05-22 18:56:16',NULL,'normal',1,NULL),(5,'Francisco','Galicia','delisick+bbb@gmail.com','1993-02-03 00:00:00','$2b$10$gadg0veWFZLGt4ainU7GBuqlI/2QRpND6AFZVuPldaBNGmwUKszmS','2020-06-19','2020-06-28 14:32:54','2020-06-28 16:32:54','40efeca0-b94c-11ea-960a-47a42e4e9d18.jpg','normal',1,NULL),(7,'Admin','admin','delisick@gmail.com','1990-06-06 00:00:00','$2b$10$v01JKLNfcIqAP0WV.ucRwOm07AG7K6rzgflwH0bOTKvzwHt2dfRjG','2020-06-22','2020-06-26 18:29:03','2020-06-26 20:29:03','e9675bc0-b7da-11ea-b97c-3516e8ffb46d.jpg','admin',1,NULL),(9,'Paquito','Murcia','delisick+sdsa@gmail.com','1978-12-30 00:00:00','$2b$10$tTtnCg2tvhBqIhKaBX/dAeBYRIkLci/j05iuOIoBcvlNXu7ecXaZS','2020-06-25','2020-06-25 19:13:25','2020-06-25 21:13:25',NULL,'normal',1,NULL),(10,'Pablo','LaCoruNeno','delisick+fresh@gmail.com','1995-12-05 00:00:00','$2b$10$77WHvL1kMiMRAdGBOo5aMeZzOui21EWkMHc6./LaRcPwINScbNTr6','2020-06-25','2020-06-30 16:05:44','2020-06-30 18:05:44','8dd26c00-baeb-11ea-adec-3f68559223c0.jpg','normal',1,NULL),(11,'Brais','Lugo','delisick+asa@gmail.com','1991-07-12 00:00:00','$2b$10$a7acxU0FO8UxQJNxX06jiuWHjprmIueuJMehsmDU/L/gFWEUxUYb.','2020-06-28','2020-06-28 15:38:41','2020-06-28 17:38:41','71bb23f0-b955-11ea-9053-5763c89e3395.jpg','normal',1,NULL),(12,'Jose','Cambre','delisick+aasa@gmail.com','1994-03-11 00:00:00','$2b$10$LrHMeAtIDWaQarCNldBbi.R2Qh85jOnm8vFN04ogIPF1rFLIvUJoK','2020-06-29','2020-06-29 15:36:09','2020-06-29 17:36:09',NULL,'normal',1,NULL),(13,'Fresh','Barcelona','delisick+fsh@gmail.com','1987-03-04 00:00:00','$2b$10$h.MdvRofIXcz.7Iy5wZwV.pmd.4CAP5q5g2eoGP/d7LCYn6eJnddm','2020-06-29','2020-06-29 16:02:25','2020-06-29 18:02:25','ec7f8a50-ba21-11ea-91da-6771dc5907be.jpg','normal',1,NULL);
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

-- Dump completed on 2020-06-30 18:46:27
