-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.26 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for auction
CREATE DATABASE IF NOT EXISTS `auction` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `auction`;

-- Dumping structure for table auction.auction
CREATE TABLE IF NOT EXISTS `auction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seller_id` int NOT NULL DEFAULT '0',
  `start_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `auction_time` int NOT NULL DEFAULT '13',
  `product_id` int NOT NULL DEFAULT '0',
  `start_price` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '1',
  `sell_price` int DEFAULT '0',
  `is_returned` int NOT NULL DEFAULT '0',
  `is_finished_soon` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.auction: ~0 rows (approximately)

-- Dumping structure for table auction.auction_history
CREATE TABLE IF NOT EXISTS `auction_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `auction_id` int NOT NULL DEFAULT '0',
  `auctioneer_id` int NOT NULL DEFAULT '0',
  `bet_time` int NOT NULL DEFAULT '0',
  `bet_amount` int NOT NULL DEFAULT '0',
  `is_blocked` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.auction_history: ~0 rows (approximately)

-- Dumping structure for table auction.auction_key_word
CREATE TABLE IF NOT EXISTS `auction_key_word` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.auction_key_word: ~0 rows (approximately)

-- Dumping structure for table auction.auction_status
CREATE TABLE IF NOT EXISTS `auction_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.auction_status: ~0 rows (approximately)
INSERT INTO `auction_status` (`id`, `name`) VALUES
	(1, 'Sắp đấu giá'),
	(2, 'Đang đấu giá'),
	(3, 'Chờ xác nhận'),
	(4, 'Thành công'),
	(5, 'Hủy');

-- Dumping structure for table auction.auction_time
CREATE TABLE IF NOT EXISTS `auction_time` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1 Ngày',
  `time` time NOT NULL DEFAULT '24:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.auction_time: ~0 rows (approximately)
INSERT INTO `auction_time` (`id`, `title`, `time`) VALUES
	(1, '1 Phút', '00:01:00'),
	(2, '3 Ngày', '00:03:00'),
	(3, '5 Phút', '00:05:00'),
	(4, '10 Phút', '00:10:00'),
	(5, '15 Phút', '00:15:00'),
	(6, '20 Phút', '00:20:00'),
	(7, '30 Phút', '00:30:00'),
	(8, '1 Giờ', '01:00:00'),
	(9, '2 Giờ', '02:00:00'),
	(10, '3 Giờ', '03:00:00'),
	(11, '6 Giờ', '06:00:00'),
	(12, '12 Giờ', '12:00:00'),
	(13, '1 Ngày', '24:00:00'),
	(14, '2 Ngày', '48:00:00'),
	(15, '3 Ngày', '72:00:00'),
	(16, '5 Ngày', '120:00:00'),
	(17, '7 Ngày', '168:00:00'),
	(18, '10 Ngày', '240:00:00'),
	(19, '15 Ngày', '360:00:00'),
	(20, '1 Tháng', '720:00:00');

-- Dumping structure for table auction.image
CREATE TABLE IF NOT EXISTS `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.image: ~0 rows (approximately)

-- Dumping structure for table auction.notification
CREATE TABLE IF NOT EXISTS `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL DEFAULT '0',
  `action_user_id` int DEFAULT '0',
  `description` varchar(500) DEFAULT NULL,
  `type` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.notification: ~0 rows (approximately)

-- Dumping structure for table auction.notification_category
CREATE TABLE IF NOT EXISTS `notification_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.notification_category: ~0 rows (approximately)

-- Dumping structure for table auction.payment
CREATE TABLE IF NOT EXISTS `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.payment: ~0 rows (approximately)

-- Dumping structure for table auction.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL DEFAULT '0',
  `description` varchar(5000) NOT NULL DEFAULT '0',
  `branch` varchar(100) DEFAULT NULL,
  `image` varchar(5000) NOT NULL DEFAULT '0',
  `category_id` int NOT NULL DEFAULT '0',
  `title` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `start_price` int NOT NULL DEFAULT '0',
  `key_word` varchar(1000) NOT NULL DEFAULT '0',
  `status` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Còn mới',
  `seller_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.product: ~0 rows (approximately)

-- Dumping structure for table auction.product_branch
CREATE TABLE IF NOT EXISTS `product_branch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.product_branch: ~0 rows (approximately)

-- Dumping structure for table auction.product_category
CREATE TABLE IF NOT EXISTS `product_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.product_category: ~21 rows (approximately)
INSERT INTO `product_category` (`id`, `name`, `created_at`) VALUES
	(1, 'Đồng hồ & Phụ kiện', '2022-11-23 11:09:40'),
	(2, 'Điện tử văn phòng', '2022-11-23 11:10:32'),
	(3, 'Đồ điện tử, AV & Máy ảnh', '2022-11-23 11:11:07'),
	(4, 'Nhà cửa đời sống', '2022-11-23 11:11:21'),
	(5, 'Thể thao & Giải trí', '2022-11-23 11:11:35'),
	(6, 'Văn hóa phẩm', '2022-11-23 11:11:46'),
	(7, 'Thời trang - Phụ kiện', '2022-11-23 11:12:00'),
	(8, 'Phim, video', '2022-11-23 11:12:10'),
	(9, 'Âm nhạc', '2022-11-23 11:12:18'),
	(10, 'Sức khỏe & Làm đẹp', '2022-11-23 11:12:33'),
	(11, 'Đồ trẻ em', '2022-11-23 11:12:40'),
	(12, 'Sách, VPP, Quà tặng', '2022-11-23 11:12:55'),
	(13, 'Ô tô, Xe máy, Xe đạp', '2022-11-23 11:13:10'),
	(14, 'Sưu tầm đồ cổ', '2022-11-23 11:13:17'),
	(15, 'Đồ chơi, trò chơi', '2022-11-23 11:13:24'),
	(16, 'Thực phẩm & Đồ uống', '2022-11-23 11:13:33'),
	(17, 'Hoa, Trồng trọ', '2022-11-23 11:13:41'),
	(18, 'Sách & Tạp chí', '2022-11-23 11:13:50'),
	(19, 'Truyện tranh, phim hoạt hình', '2022-11-23 11:13:59'),
	(20, 'Sở thích & Văn hóa', '2022-11-23 11:14:19'),
	(21, 'Khác', '2022-11-23 11:14:30');

-- Dumping structure for table auction.product_status
CREATE TABLE IF NOT EXISTS `product_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.product_status: ~4 rows (approximately)
INSERT INTO `product_status` (`id`, `name`) VALUES
	(1, 'Chưa qua sử dụng'),
	(2, 'Mới 99%'),
	(3, 'Mới 80%'),
	(4, 'Mới 50%'),
	(5, 'Không còn dùng được nữa');

-- Dumping structure for table auction.role
CREATE TABLE IF NOT EXISTS `role` (
  `id` varchar(50) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `admin` tinyint unsigned NOT NULL DEFAULT '0',
  `user` tinyint unsigned NOT NULL DEFAULT '0',
  `auction` int DEFAULT '1',
  UNIQUE KEY `code` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table auction.role: ~3 rows (approximately)
INSERT INTO `role` (`id`, `description`, `admin`, `user`, `auction`) VALUES
	('user', 'full flow', 1, 1, 1),
	('admin', 'dashboard', 1, 1, 1),
	('guest', 'guest', 0, 0, 0);

-- Dumping structure for table auction.sale_history
CREATE TABLE IF NOT EXISTS `sale_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `buyer_id` int NOT NULL DEFAULT '0',
  `seller_id` int NOT NULL DEFAULT '0',
  `auction_id` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.sale_history: ~0 rows (approximately)

-- Dumping structure for table auction.sale_status
CREATE TABLE IF NOT EXISTS `sale_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.sale_status: ~4 rows (approximately)
INSERT INTO `sale_status` (`id`, `name`) VALUES
	(1, 'Chờ xác nhận'),
	(2, 'Đã thanh toán'),
	(3, 'Đang giao hàng'),
	(4, 'Thành công'),
	(5, 'Hủy');

-- Dumping structure for table auction.search
CREATE TABLE IF NOT EXISTS `search` (
  `id` int NOT NULL,
  `title` varchar(1000) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auction.search: ~0 rows (approximately)

-- Dumping structure for table auction.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `password_hash` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `role_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'user',
  `avatar` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `birthday` datetime DEFAULT NULL,
  `address` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `refresh_token` varchar(50) DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `is_blocked` tinyint(1) NOT NULL DEFAULT '0',
  `custom_config` json DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `del_flag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=325 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table auction.user: ~145 rows (approximately)
INSERT INTO `user` (`id`, `name`, `username`, `email`, `phone`, `password_hash`, `role_id`, `avatar`, `birthday`, `address`, `refresh_token`, `is_verified`, `is_blocked`, `custom_config`, `created_at`, `updated_at`, `del_flag`) VALUES
	(1, 'DOTW', '', 'dotw@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, '{"a": 1, "b": {"c": 1, "d": 2}}', '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(2, 'HotelInfo', '', 'hotelinfo@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(3, 'HotelBeds', '', 'hotelbeds@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(4, 'GTA', '', 'gta@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(6, 'HMS', '', 'hms@goquo.com', '', '$2a$05$Bl2/HCGde0euRbmcFZ9xxOKhEN0TkxUQq9YFdLYWAL458SwaPQYpW', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(7, 'Miki', '', 'miki@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(9, 'Infotech', '', 'infotech@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(10, 'Travflex', '', 'travflex@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(13, 'TravelMart', '', 'travelmart@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(14, 'Priceline', '', 'priceline@goquo.com', '', '$2a$05$Y2U9Az/d9Kuoc6qP6zB0XO3Gplz.6PZS3I2usuQCwQEKVhFx37fS.', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(16, 'NTA', '', 'nta@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(17, 'CUG', '', 'cug@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(20, 'JTB', '', 'jtb@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(23, 'Quantum', '', 'quantum@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(28, 'Travco', '', 'travco@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(29, 'Adonis', '', 'adonis@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(30, 'Juniper', '', 'juniper@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, '{"sort_price": true}', '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(31, 'JacTravel', '', 'jactravel@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(32, 'APItude', '', 'apitude@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(33, 'TeamAmerica', '', 'teamamerica@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(34, 'HotelsPro', '', 'hotelspro@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(37, 'EAN', '', 'ean@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(40, 'Agoda', '', 'agoda@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(42, 'FIT', '', 'fit@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(44, 'TravelGate', '', 'travelgate@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(46, 'RoomsXML', '', 'roomsxml@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(47, 'DerbySoft', '', 'derbysoft@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(48, 'CNBooking', '', 'cnbooking@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(64, 'Phoenix Rotana ', '', 'rotana@goquo.com', '', '$2a$05$R1eDB2hpdHNb4TO/bGpvouuFNE7QWSA7LSaSIfyQsMBskYibnvm0W', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(100, 'Full Supplier', '', 'tuananh@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(102, 'Miki v7', '', 'mikiv7@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(103, 'Traveloka', '', 'traveloka@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(107, 'MRSP', '', 'mrsp@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(109, 'Admin', '', 'admin@goquo.com', '', '$2a$05$0Gym9OsnxS/E7VDd8AWg3O6706.d0zc0tZEXIuwJW2WQmd33CTDmy', 'admin', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(110, 'DidaTravel', '', 'dida@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(111, 'TBO Holiday', '', 'tbo@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(112, 'Etihad', '', 'etihad@goquo.com', '', '$2a$05$DDzq/g0Z3pFt4DYL5YbtH.xmpvtuKlmdcM9.oDxjp2ZmFJdaFdtRy', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(113, 'Etihad', '', 'etihadstopover@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(114, 'Phuong testing', '', 'phuong@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(115, 'Innstant', '', 'innstant@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(116, '', '', 'demo@goquo.com', '', '$2a$05$KsGw8XD3wMskKIN.0JPefeamjdW6R5wjEtsCVok9p4WGSWgbe6bb2', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(117, 'Travelogixx', '', 'travelogixx@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(119, 'Zumata', '', 'zumata@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(200, 'Upgrade MG V4', '', 'mgv4@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(201, 'Jalan', '', 'jalan@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(203, 'Getaroom', '', 'getaroom@goquo.com', '', '$2a$05$oiJGLljOYrBG.i8e4EpcwOvnb4Ufre8AVukuv9VKbkTGXsmd.3bgS', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(206, 'Expedia EAN Rapid', '', 'eps@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(207, 'EtiHad', '', 'etihadformular1@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(208, 'EtiHad', '', 'etihadaccommodation@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(209, 'EtiHad', '', 'etihadpremiumstopover', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(216, 'Precise Travel', '', 'precise@goquo.com', '', '$2a$05$q8Kg6Hax9.Z9yxADDyUxpeCthZBYcMmLT/d3nzIR/tqoDLg7l1FYG', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(219, 'Hilton', '', 'hilton@goquo.com', '', '$2a$05$.9ECdEQqErhd9CUaMtQyFOQmp9TshL6tMDQ5zEQaiMFmdyzS24PX2', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(222, 'IndoStars', '', 'indostars@goquo.com', '', '$2a$05$SxkhFVEoAGPi2idQVlvDzurpS/R5thbRqLBTQQqeEY/G2gqoQi7pa', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(223, 'Royal Brunei', '', 'rba@goquo.com', '', '$2a$05$JME753H3vlMmROmBLtX7eOzmtWELobTDDVE7fg3wVjGe4o8kNcOx6', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(224, 'bayu', '', 'bayu@goquo.com', '', '$2a$05$AJMZGY4vohyjrObP4LhbF.7Ez1GETFs.mQ4XJ6YupSa0VwNs2OPES', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(225, 'HKE', '', 'hke@goquo.com', '', '$2a$05$t1WmWA9XExv4hwFv5RDvg.R1if7sDWnry3RzbgOZt0dFHK7a87m1y', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(226, 'HKA', '', 'hka@goquo.com', '', '$2a$05$zNXHROJHOyc/cOjcQPEioeba9J.mUJltHJC7SbIwidd.qcgClwpIK', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(227, 'Chat Bot', '', 'chatbot@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(229, 'cheapflightbooking@goquo.com', '', 'cheapflightbooking@goquo.com', '', '$2a$05$mlV7SFQpOoJsE6iJdi7Fy.Dsny5ECGU7MoOl387S7NLpelJ4Yz3s.', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(230, 'Oman', '', 'oman@goquo.com', '', '$2a$05$uybHSzPE8NX8j8xBHrgNY.oGrZz7Hn.1GWqFm72VwBM/SAs7ZVmZq', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(231, 'Omanair', '', 'omanair@goquo.com', '', '$2a$05$1v6AA4xPaKLwzEyPBrVi1eyC2PJcR1Bo3cUk7E344W0esZs7nSghy', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(232, 'BookCabin', '', 'piknik@goquo.com', '', '$2a$05$Wdnon6VscvLcIOyHWOIRcevIrVkAFgQNFtuzKtjwcJmY6UnQaTk3S', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(233, 'vacay', '', 'vacay@goquo.com', '', '$2a$05$KQ6.knUB.SE1hUoM/gmduebHf5U4LFiwA.t6ulrO4dbnm8j6rIcmi', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(234, 'India Team', '', 'india@goquo.com', '', '$2a$05$ZBEnk.eer/tfPfMEIZizgOZzb0OyN3LS0foSiU10iVbbOMM6Sps8C', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(235, 'Marriott', '', 'marriott@goquo.com', '', '$2a$05$dukbRVd8mAc5pdu6hKxIVux72zXxuHDRzrrWbTSIowPMQLkLwltZC', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, '{"availability_restriction": true}', '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(237, 'trongns', '', 'trongns@phoenixsoftgroup.com', '', '$2a$05$3hZs9QoQymLsDq23UuyKXOwoTCrgx/mdWn2kGpcbPjeTFgLufuWG.', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(238, 'phoenix', '', 'phoenix@goquo.com', '', '$2a$05$3hZs9QoQymLsDq23UuyKXOwoTCrgx/mdWn2kGpcbPjeTFgLufuWG.', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(240, 'Accor', '', 'accor@goquo.com', '', '$2a$05$dukbRVd8mAc5pdu6hKxIVux72zXxuHDRzrrWbTSIowPMQLkLwltZC', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(241, 'ulstopover', '', 'ulstopover@goquo.com', '', '$2a$05$/vdZe6gDWMgwLrSFy.iBNuwnswbS1wW.a5wbvC/N7Rt78g9/Dqif2', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(242, 'Gateway', '', 'gw@goquo.com', '', '$2a$05$/vdZe6gDWMgwLrSFy.iBNuwnswbS1wW.a5wbvC/N7Rt78g9/Dqif2', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(243, 'ulstopoverpplp@goquo.com', '', 'ulstopoverpplp@goquo.com', '', '$2a$05$ESXpocMFR0rsYnauUV5Ei.pw82rVNLZgCjemfU4Zhwo9qVffEPD96', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(244, 'GWDEV', '', 'gwdev@goquo.com', '', '$2a$05$3nctDQypopbrdUJVWey8UOonXLeyCSUts1qpit9ohs.xz0GorKvA6', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(245, 'Etihad ehub 1', '', 'etihadehub@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(246, 'Experience Hub', '', 'ehub@goquo.com', '', '$2a$05$dukbRVd8mAc5pdu6hKxIVux72zXxuHDRzrrWbTSIowPMQLkLwltZC', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(248, 'air asia', '', 'airasia-staging@goquo.com', '', '$2a$05$J.M00Tz5NBZrnytEv6KSh.ytWu/9UHflYWgSnMdc2oR6Ue.KjFFKy', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(249, 'Anixe', '', 'anixe@goquo.com', '', '$2a$05$ploOsxGBialV10p7JWaNieMk0i9Wn5NTzS9vxa7GUmFubdMARI65C', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(250, 'travelspeedia', '', 'travelspeedia@goquo.com', '', '$2a$05$RLdxaK4Brpgt/joJ6NkhW.dLl4erg7wdRWDwAAVgjgQO.GUhx4ype', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(251, 'mhhstopover', '', 'mhhstopover@goquo.com', '', '$2a$05$KBKZmJF118NPFcDWn1IDQuICBB2TvqbWaeVL2CWOhge4SKwriGw7.', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(252, 'sandbox', '', 'sandbox@goquo.com', '', '$2a$05$dizBCfkaL4QAcgMEx2JXa.IJhn0kYSwfla8b/hXTJ/NwgAEIONV6G', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(253, 'epseyh@goquo.com', '', 'epseyh@goquo.com', '', '$2a$05$kQcubxHvVVDJlGUxCDD/reyGE56BfdN60E7L60ndGU2DnT7TMjVbm', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(254, 'dat', '', 'datnguyen@goquo.com', '', '$2a$05$fiwhYsf46nSZERyL38qIRumjnFxYCnNOLGYUtkHUMjy2wvwO295h6', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(255, 'vuanhtu', '', 'vuanhtu@goquo.com', '', '$2a$05$0N9Wth.3DhXiIsRKV4NWBOxiq7uKE32htz7wBYl1sdRb5TvzcLaIy', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(256, 'dinhdx@goquo.com', '', 'dinhdx@goquo.com', '', '$2a$05$s9HD4v7CRf2IQKSa7eIYx.nm9e1TuSMvNh18OkAwE/EaBSxSaKYp.', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, '{"extra_cancellation": true}', '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(257, 'dinhdx2@goquo.com', '', 'dinhdx2@goquo.com', '', '$2a$05$IJaTdw.gxSa2RorX8RuZq.VJ4kBLC./hBWh8DMeSXiPJ6pnkE6gWu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(258, 'dinhdx888@goquo.com', '', 'dinhdx888@goquo.com', '', '$2a$05$jjj2ZgNvNDMZ8mCDht3yTem9DagiQ6CX6tWa/zj853.2sqroRh35.', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 1),
	(259, 'asdsad', '', 'ad@fsdf.sd', '', '$2a$05$080w5uhzp9.ax/k4XHbRNeR/OPaU6PuPBv4Sj1T.CFZoyGHcZsf0y', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 1),
	(260, 'testtesttest', '', 'testtesttest@goquo.com', '', '$2a$05$4KHneLa6xIVy/6KWnIYZM.EPIk3DaZ13YBw9xD2ObMO0JafEr8QkK', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 1),
	(261, 'RBAStopover', '', 'rbastopover@goquo.com', '', '$2a$05$BLCvk4MexmVLCLcgVq6F5.HBHAjz1VxNkea.4qjb0oQ0km2747X3e', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(262, 'qr@goquo.com', '', 'qr@goquo.com', '', '$2a$05$qcgU9NO9TYoZ5hm6Z59A6uHmB/4MzPtp4YVYYrz6tb8anxhc.qbRC', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, '{"sort_price": true}', '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(263, 'TripBundleStopOver', '', 'TripBundleStopOver@goquo.com', '', '$2a$05$.bG6Wr7HM1wZ1nMjYbGuYu2s8d7H8Hp.lY3Ls2VbX4dYJbgxcepiO', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(264, 'RMS', '', 'rms@goquo.com', '', '$2a$05$dxrKM5llmE8dxao8wc7A3uHW0woZYLz3xOctHPbvf1sXzb0Yt2pd6', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(265, 'BambooAirways', '', 'BambooAirways@goquo.com', '', '$2a$05$mSv0QlN/jq4Te5oS5LmswOQTaiKnENKEb8SfDgV3BSoFfUmv19mxC', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, '{"extra_cancellation": true}', '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(266, 'QRH Stopover', '', 'stopover@qrh.com', '', '$2a$05$VSPD6DEXYM9NLydQMvvq4OzRNtkLDw2I.ERguWuyS7.uIEGWm1bCG', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(267, 'dhoof@easygds.com', '', 'dhoof@easygds.com', '', '$2a$05$LElZP1lar4RIe62JeusZPOldSLdoEOUsj5BEr11VSlX4VZdl8YS5e', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(268, 'qtechholiday@goquo.com', '', 'qtechholiday@goquo.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(269, 'aoteam@goquo.com', '', 'aoteam@goquo.com', '', '$2a$05$8bqJwk8OkNpStSri3ybqo.Ngb1gcQgiSC1RZy2FboPmjC1SkQu.z6', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(270, 'MGJarvis', '', 'mgjarvis@goquo.com', '', '$2a$05$da8QkVxOsDIKc5xN6Nbx..pfvx1WTEz60bwsA0lUQZCl/RKTsrraS', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(271, 'tuiao@goquo.com', '', 'tuiao@goquo.com', '', '$2a$05$0Tv/VuqRgjLEct1WlH/HsuVBAz44fotx80vghDCkfBKlDyPHVLYpq', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(272, 'hoanganh', '', 'luonghoanganh2711@gmail.com', '', '$2a$05$w2bfj9d.D1apxXfTnsB3L.tOHcW53ief.cEGtwT4sRVLHOV4Jy5xi', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(273, 'Etihad EPS PKG', '', 'etihad_eps_pkg@goquo.com', '', '$2a$05$NVdoVLYbYXnIsuLTiqE/CejJ5N9JQbtFgEL07Kn6SeKJ6ZwNNU4Ga', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(274, 'Etihad EPS SA', '', 'etihad_eps_sa@goquo.com', '', '$2a$05$RHANoS.AxOXBlp99Yw.JmeT8C900SWtgTIvxgK3vtg.U5XL9ObHZS', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(275, 'andres@turismocity.com', '', 'andres@turismocity.com', '', '$2a$05$VT838CDSK6mZhLurjl98Zeq8JLXuzmGvwsrPXp3EhH99Tq79qXKCW', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(276, 'hoangnd', '', 'hoangnd@goquo.com', '', '$2a$05$s9HD4v7CRf2IQKSa7eIYx.nm9e1TuSMvNh18OkAwE/EaBSxSaKYp.', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(277, 'hotelInfoMapping', '', 'hotelInfoMapping@goquo.com', '', '$2a$05$U/tmnwTwgzqbwMZyQdWD5uyQnBtVjCcwIfwhd7gytW.Z3UWIOEfj2', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 1),
	(278, 'test', '', 'test@gmail.com', '', '$2a$05$HJDMdMXGGj6/vTmi6Yv.UeC72R/kGnYZM0G1LAHtUGaniuy5dRkS.', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(279, 'tuimy@goquo.com', '', 'tuimy@goquo.com', '', '$2a$05$47P7pOlQC/cXOAJ5Kyc9yeslZYgvE.8GC0wLjDOr9Pj.v07S5DLzK', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(280, 'vinpearltest', '', 'vinpearltest@gmail.com', '', '$2a$05$Q4gHqmAO7R0hloROrtczNOYrzcB9C46At5BN5mVq4s1G9TAxaVkmm', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(281, 'tuiao_jp@goquo.io', '', 'tuiao_jp@goquo.io', '', '$2a$05$eMKBfox9r0zbLJx/AgK3Wueco0vXS4JC3SugU/ISXrQXXElnwB7gC', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(282, 'QA team', '', 'qateam@goquo.com', '', '$2a$05$u1cRrbKfGGLcTEMIV3nphenvzW8JWxeEb8uTd5stS9eMfyckey7HO', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 1),
	(283, 'tourtest', '', 'tourtest@gmail.com', '', '$2a$05$wpFNCn.CyInSrf0n8g4Sie1NOeDMbkvmCHMa3s/xjS32YxH8h4hYm', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(284, 'UNIT TEST EPS', '', 'unittest_eps@goquo.com', '', '$2a$05$R0wkM9WHYLRQXW7XgPZga.XrLeH7uBX9gc2UFWqTvD9rfNH1WEgyK', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(285, 'UNIT TEST JUNIPER', '', 'unittest_juniper@goquo.com', '', '$2a$05$MrxNpbCZqfGIdMo7KWdkMOx3HHalQc2jppWlwbOG0RN9I3AIdZpPu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(286, 'UNIT TEST TBO', '', 'unittest_tbo@goquo.com', '', '$2a$05$KER0klHn1ItPme/9tmnPeO8m2ZC.UyZym313mhQinEwfxe1a/Ash6', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(287, 'UNIT TEST HMS', '', 'unittest_hms@goquo.com', '', '$2a$05$CEiIA7oQyACs4PQBVf47meoCN4oipSh4y4ZVB.l87LKpmqbzrh5dC', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(288, 'formula1', '', 'formula1@gmail.com', '', '$2a$05$ARUDLD5iLMeVuBB8EG/BoOzpSPd0Foqxl61bUUZd7CWpJcSzJNS5m', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(289, 'UNIT TEST SEERA', '', 'unittest_seera@goquo.com', '', '$2a$05$FWesLELlHRgOsuX9tvCDAuOHYzmsCU78OTIMDfeKpFFLoH.ExMb8m', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(290, 'hmsstagingfull', '', 'hmsstagingfull@goquo.io', '', '$2a$05$mC7IGM0w.a3LzNdgAJQ9DuB2rmJOiW8tihxNUSuyijCuWdXezmGge', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(291, 'mgjarvistest', '', 'mgjarvis@gmail.com', '', '$2a$05$uSRh2ex7LIOo/wHjnCLmkuoJJ8FgSw8PquteCN1vTxH6J4/lCfd.q', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(292, 'test', '', 'test29-10@gmail.com', '', '$2a$05$TIZ6yKb5V.Uzz4XMtLFuX.V0TUW.rsCeOrLs1RglC7/.4QKg5I4gS', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(293, 'test1', '', 'test29-10-1@gmail.com', '', '$2a$05$bxh2I12pXNWEUm0ntjV0J.P6p8vTmX3FOEFSFdc17euKCwaTkp6nu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 1),
	(294, 'tui_travi@goquo.com', '', 'tui_travi@goquo.com', '', '$2a$05$AWMNnDUHvO7l34KbnrzqEurY3bggvzN2E78fPXbKNoA1uEUuTMUBO', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(295, 'airasia staging1', '', 'airasia.staging@goquo.com', '', '$2a$05$aUaqM1vfM7RpstJnTPkaiuZWWSU2e15OgJBB7cxIJFV4/xNTvRxkK', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(296, 'EPS EasyGDS Live', '', 'eps@easyGDS.com', '', '$2a$05$MEdMn3mc2a2WUafdXRM8vOGeORumXeoTNaZ34F6Ca7ZsuAMStX4pW', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 1),
	(297, 'super_app@airasia.com', '', 'super_app@airasia.com', '', '$2a$05$w8QaRV22NLEVUYtkE6wUAOEZDKKd6S5VQUJF0GQxzGSpKsy4gDWCi', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(298, 'Infinite@gmail.com', '', 'Infinite@gmail.com', '', '$2a$05$2YmG9IzQYa6c12RmoNNfC.Ta94FU3Ol7pAYXQ3oCFn/nPOX0HSFpG', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(299, 'Vibe staging', '', 'vibestaging@goquo.com', '', '$2a$05$zNfoHRptF549.fM9YtzFc.HsslvApYDpuAc.mI9jicaiAIL3DlcTC', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 1),
	(300, 'danghaiv.18@gmail.com', '', 'dangvh@tuivietnam.com', '', '$2a$05$WXHt2Nqv.xMreRruGvdqnOn2/jgiTonVZT/A62aY9PCXgww5Ncs72', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, '{"extra_cancellation": true}', '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(301, 'staging.rotana@goquo.com', '', 'staging.rotana@goquo.com', '', '$2a$05$yEcGs5xE5yfSVB42Noqshe6Mxe2oJ7A81IojtQEYhbw27KYexlo8q', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(302, 'fastpayhotelsStaging@goquo.com', '', 'fastpayhotelsstaging@goquo.com', '', '$2a$05$7JllePHLGchnQoxJP1ab2.7C8ymx9R4/AFxVaqTOWRXcEIf2pBsKu', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(303, 'itsvietnam', '', 'itsvietnam@goquo.com', '', '$2a$05$tqGe6oFqqBls3U6FP2adD.ezdAYeZy/IDKxk7NsJj0cj5.C6A5zEy', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(304, 'restel@goquo.com', '', 'restel@goquo.com', '', '$2a$05$wRI/q2qKcBLoh7mP7GdN1up5RNNCQjdT1CpUc.Q8DF8M9mGTnEqQm', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(305, 'sa@tui.co.uk', '', 'sa@tui.co.uk', '', '$2a$05$Ega1DthI/JZoCTW/vL6E7eMI8wn0Kuu4Ylgb/EPjJcARjzd5NmWWy', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(306, 'Vibe stopover staging', '', 'vibe.stopover.staging@goquo.com', '', '$2a$05$ssu81a6ZMEQNrAfiPoS4xubkwPD9Kn0yOLcSpC/HMO3LHlaD2UrOC', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(307, 'Luu Minh Sam (TLP)', '', 'sam.luuminh@tui.com', '', '$2a$05$38zxZ1F6b2BTiFXC9EM97uql9FvPAjcmu4UqluCkha20DV3obU8qO', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(308, 'HotelInfo AO', '', 'hotelinfo-ao@goquo.com', '', '$2a$05$0nc.eAucu1QdwrGA.KGyketsPdnTPmTywfAAyKCPG.aWrFpQ78px.', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(309, 'Vibe FIFA staging', '', 'vibe.fifa.staging@goquo.com', '', '$2a$05$YtRMhwLiMKvE8zedT8OzR.hlVkKoooMfAoCoxugobZlfPHI3QkMCm', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(310, 'Vibe', '', 'vibe.staging@goquo.com', '', '$2a$05$civ9WsEfHwzPbct19RdBoeZB9O6p.DuXjM5VPBGwYeWMczYHhjcCO', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(311, 'Juniper Gulf Air', '', 'juniper_gulfair_prod@tui.com', '', '$2a$05$89d7OriJw7YAb3oBeOUVWuYrBjuW.5ZtFtTuIyOMPPpm3DakM36ti', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, '{"sort_price": true}', '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(313, 'mhhHMS', '', 'mhh_hms@tui.com', '', '$2a$05$iuN8WxkciU.LCHdO/PJVY.lQx/mJtQSQ5gFAlTvB6k/rYUo/2E1C6', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(314, 'Hotel Info', '', 'hotelinfo@aa.com', '', '$2a$05$BADCwsyFDCmTeUymyW3MNuonSQdM4YGliQ4W/pfPY3M2Zdg5QPagu', 'admin', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(315, 'Gulf Air', '', 'gulfair@tui.com', '', '$2a$05$Z0oWAyi1H/euwpC0v2PHv.qhUNpVtYZqsXFqbLwyujgyQXP4tvUDC', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, '{"sort_price": true}', '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(316, 'Thai Vietjet Air', '', 'thai_vietjet_air@vietjet.com', '', '$2a$05$P48oRCdMvXMiRhdMv9evK.tp/RzHkT1zl5vrDa1UpxSkgTqA5h8VO', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 1),
	(317, 'kiennt', '', 'kiennt@tuivietnam.com', '', '$2a$05$NIXkS1pQPRcqhveXwpK0KupKtNpA15H9TJoOovM5VFfkPArrU3QPq', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(318, 'lynt', '', 'lynt@tuivietnam.com', '', '$2a$05$rqfECH2w72wTCPUoBmO3Z.rtyhqE0OL0we.A0la55lQXu/DKW.Yga', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', NULL, NULL, NULL, 0, 0, NULL, '2022-11-18 23:59:46', '2022-11-27 22:16:46', 0),
	(319, 'Nguyễn Trung Kiên', 'trungkien2022001', 'trungkien07yd@gmail.com', '0989983025', '$2a$05$/xnY4j7Phy7Ub6ui57VTUOThRAsi.8DnWQcMnCMtMV.RBvm.wC.v.', 'admin', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', '2001-02-20 00:00:00', '136 Nguyễn An Ninh, Hoàng Mai, Hà Nội', NULL, 1, 0, NULL, '2022-11-19 08:59:39', '2022-11-27 22:18:16', 0),
	(320, 'test', 'test1', 'test1@gmail.com', '0123456789', '$2a$05$6Jao61/auEywfpvqOwVtFObKijpMGda1iAKSu5U2OjYZ0URxUfof6', 'user', 'http://res.cloudinary.com/trungkien2022001/image/upload/v1669566266/upload/z2uaaplapbaf4h8ckmdj.jpg', '2003-02-04 00:00:00', NULL, NULL, 0, 0, NULL, '2022-11-27 23:38:52', '2022-11-27 23:40:21', 0),
	(321, 'test', 'test4', 'test2@gmail.com', '0123456788', '$2a$05$T.2DJ4DwT13Ls..mTq.lT.HstiMOaunbg7zsS7Lrkq4Ur8GVshBlm', 'user', 'http://res.cloudinary.com/trungkien2022001/image/upload/v1669566266/upload/z2uaaplapbaf4h8ckmdj.jpg', '2003-02-04 00:00:00', 'Yên Đồng, Yen MO, Ninh Binh', NULL, 0, 0, NULL, '2022-11-27 23:45:41', '2022-11-28 00:03:29', 0),
	(322, 'test', 'test2', 'test3@gmail.com', '0123456787', '$2a$05$ntYpcDhJtlwm7Yy8KzX/geQI5vc51ASVFZNRfLsXEsioiRMDNd6PS', 'user', 'http://res.cloudinary.com/trungkien2022001/image/upload/v1669566266/upload/z2uaaplapbaf4h8ckmdj.jpg', '2003-02-04 00:00:00', 'Yên Đồng, Yen MO, Ninh Binh', NULL, 0, 0, NULL, '2022-11-27 23:46:18', '2022-11-28 00:03:26', 0),
	(323, 'Kien', 'test3', 'tesh@gmail.com', '0111111111', '$2a$05$Ew6eDUQDG348i9uLmVwb8exf3hnU2Go0PyUP5hPoFzfCFJbUs3bPW', 'user', 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg', '2001-01-09 00:00:00', 'ewigerogerger', NULL, 0, 0, NULL, '2022-11-28 00:02:56', '2022-11-28 00:03:23', 0),
	(324, 'Đỗ Thị Nhung', 'nhungdo1010', 'dothinhung10102001@gmail.com', '0967775328', '$2a$05$Ml9fnvJjmrOM28U3MAXBheOFe3YRngp8ON8z9RGVUaSpmeMa5V7Ra', 'user', 'http://res.cloudinary.com/trungkien2022001/image/upload/v1669568892/upload/nbo9dpvsptdmtn8ngqsl.jpg', '2001-10-28 00:00:00', 'Yên Phong, Yên Mô, Ninh Bình', NULL, 0, 0, NULL, '2022-11-28 00:08:21', '2022-11-28 00:08:21', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
