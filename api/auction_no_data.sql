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

-- Dumping structure for table auction.action_logs
CREATE TABLE IF NOT EXISTS `action_logs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `path` varchar(50) NOT NULL DEFAULT '',
  `matched_route` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `client_ip` varchar(50) NOT NULL DEFAULT '',
  `server_port` varchar(6) DEFAULT NULL,
  `user` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Anonymos',
  `method` varchar(10) NOT NULL DEFAULT '',
  `status` int NOT NULL DEFAULT '200',
  `request` longtext,
  `response` longtext,
  `error` longtext,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_id_action_logs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=660878 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.auction
CREATE TABLE IF NOT EXISTS `auction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` datetime DEFAULT NULL,
  `auction_time` int NOT NULL DEFAULT '13',
  `product_id` int NOT NULL DEFAULT '0',
  `start_price` bigint NOT NULL,
  `sell_price` bigint DEFAULT NULL,
  `seller_id` int unsigned NOT NULL DEFAULT '0',
  `auction_count` int unsigned NOT NULL DEFAULT '0',
  `auctioneer_win` int unsigned DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `is_returned` int NOT NULL DEFAULT '0',
  `is_finished_soon` int NOT NULL DEFAULT '0',
  `seller_confirm_time` datetime DEFAULT NULL,
  `auctioneer_confirm_time` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_id_auction` (`id`),
  KEY `auction_status` (`status`),
  KEY `user_id` (`seller_id`),
  KEY `auction_time` (`auction_time`),
  KEY `FK_auction_product` (`product_id`),
  CONSTRAINT `auction_status` FOREIGN KEY (`status`) REFERENCES `auction_status` (`id`),
  CONSTRAINT `auction_time` FOREIGN KEY (`auction_time`) REFERENCES `auction_time` (`id`),
  CONSTRAINT `FK_auction_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=276125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.auction_history
CREATE TABLE IF NOT EXISTS `auction_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `auction_id` int NOT NULL DEFAULT '0',
  `auctioneer_id` int unsigned NOT NULL DEFAULT '0',
  `bet_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bet_amount` bigint NOT NULL,
  `is_success` tinyint NOT NULL DEFAULT '0',
  `is_blocked` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `aution_id_history` (`auction_id`),
  KEY `user_id_auction_history` (`auctioneer_id`),
  CONSTRAINT `aution_id_history` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`id`),
  CONSTRAINT `user_id_auction_history` FOREIGN KEY (`auctioneer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18938 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.auction_key_word
CREATE TABLE IF NOT EXISTS `auction_key_word` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(50) NOT NULL DEFAULT '0',
  `keyword` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.auction_status
CREATE TABLE IF NOT EXISTS `auction_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.auction_time
CREATE TABLE IF NOT EXISTS `auction_time` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1 Ngày',
  `time` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.banner
CREATE TABLE IF NOT EXISTS `banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(500) NOT NULL DEFAULT '0',
  `created_by` int unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_banner_user` (`created_by`),
  CONSTRAINT `FK_banner_user` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.banner_image
CREATE TABLE IF NOT EXISTS `banner_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `banner_id` int NOT NULL,
  `url` varchar(500) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `FK_banner_image_banner` (`banner_id`),
  CONSTRAINT `FK_banner_image_banner` FOREIGN KEY (`banner_id`) REFERENCES `banner` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.block_type
CREATE TABLE IF NOT EXISTS `block_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'normal_block',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.block_user
CREATE TABLE IF NOT EXISTS `block_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `type` varchar(50) NOT NULL DEFAULT '0',
  `created_by` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_block_user_user` (`user_id`),
  KEY `FK_block_user_block_type` (`type`),
  CONSTRAINT `FK_block_user_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.chat
CREATE TABLE IF NOT EXISTS `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user1` int unsigned NOT NULL,
  `user2` int unsigned NOT NULL,
  `last_msg` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_message_by` text NOT NULL,
  `is_read` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_chat_user` (`user1`),
  CONSTRAINT `FK_chat_user` FOREIGN KEY (`user1`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.chat_history
CREATE TABLE IF NOT EXISTS `chat_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chat_id` int NOT NULL DEFAULT '0',
  `user_id` int unsigned NOT NULL,
  `is_admin` tinyint NOT NULL DEFAULT '0',
  `content` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_chat_history_chat` (`chat_id`),
  KEY `FK_chat_history_user` (`user_id`),
  CONSTRAINT `FK_chat_history_chat` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`),
  CONSTRAINT `FK_chat_history_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=556 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.comment
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `auction_id` int NOT NULL,
  `title` varchar(1000) NOT NULL DEFAULT '',
  `is_image` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_comment_user` (`user_id`),
  KEY `FK_comment_auction` (`auction_id`),
  CONSTRAINT `FK_comment_auction` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`id`),
  CONSTRAINT `FK_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.image
CREATE TABLE IF NOT EXISTS `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `product_id` int NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id_auction_history` (`product_id`),
  CONSTRAINT `product_id_auction_history` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=834326 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.mark_up
CREATE TABLE IF NOT EXISTS `mark_up` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_type` int NOT NULL,
  `value` float NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_mark_up_product_category` (`product_type`),
  CONSTRAINT `FK_mark_up_product_category` FOREIGN KEY (`product_type`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.notification
CREATE TABLE IF NOT EXISTS `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL DEFAULT '0',
  `auction_id` int DEFAULT NULL,
  `action_user_id` int DEFAULT '0',
  `type` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `auction_notif` (`auction_id`),
  KEY `FK_notification_user` (`user_id`),
  KEY `FK_notification_notification_category` (`type`),
  CONSTRAINT `auction_notif` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`id`),
  CONSTRAINT `FK_notification_notification_category` FOREIGN KEY (`type`) REFERENCES `notification_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19509 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.notification_category
CREATE TABLE IF NOT EXISTS `notification_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.payment
CREATE TABLE IF NOT EXISTS `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL DEFAULT '0',
  `description` varchar(5000) NOT NULL DEFAULT '0',
  `branch` varchar(100) DEFAULT NULL,
  `image` varchar(5000) NOT NULL DEFAULT '0',
  `category_id` int NOT NULL DEFAULT '0',
  `title` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `start_price` int NOT NULL DEFAULT '0',
  `key_word` varchar(1000) NOT NULL DEFAULT '0',
  `status` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Còn mới',
  `seller_id` int unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_type` (`category_id`),
  KEY `seller_id_product` (`seller_id`),
  CONSTRAINT `product_type` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`),
  CONSTRAINT `seller_id_product` FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=276214 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.product_branch
CREATE TABLE IF NOT EXISTS `product_branch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.product_category
CREATE TABLE IF NOT EXISTS `product_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '0',
  `key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `bid_increment` int NOT NULL DEFAULT '0',
  `fee` int NOT NULL DEFAULT '0',
  `mark_up` float NOT NULL DEFAULT '0',
  `image` varchar(500) NOT NULL DEFAULT 'https://binhminhdigital.com/StoreData/images/Product/may-anh-canon-eos-m50-kit-1545mm-hang-nhap-khau.jpg',
  `keyword` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.request
CREATE TABLE IF NOT EXISTS `request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `count` int NOT NULL DEFAULT '0',
  `port` int NOT NULL DEFAULT '3030',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24820 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.role
CREATE TABLE IF NOT EXISTS `role` (
  `id` varchar(50) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `admin` tinyint DEFAULT '0',
  `user` tinyint DEFAULT '1',
  `auction` tinyint DEFAULT '0',
  `homepage` tinyint DEFAULT '0',
  `dashboard_auction` tinyint DEFAULT '0',
  `dashboard_user` tinyint DEFAULT '0',
  `dashboard_chat` tinyint DEFAULT '0',
  `dashboard_action_log` tinyint DEFAULT '0',
  `dashboard_config` tinyint DEFAULT '0',
  `dashboard_money` tinyint DEFAULT '0',
  UNIQUE KEY `code` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table auction.search
CREATE TABLE IF NOT EXISTS `search` (
  `id` int NOT NULL,
  `title` varchar(1000) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.spam
CREATE TABLE IF NOT EXISTS `spam` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `accuser` int unsigned NOT NULL,
  `reason` int NOT NULL,
  `desc` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_spam_user` (`user_id`),
  KEY `FK_spam_spam_category` (`reason`),
  KEY `FK_spam_user_2` (`accuser`),
  CONSTRAINT `FK_spam_spam_category` FOREIGN KEY (`reason`) REFERENCES `spam_category` (`id`),
  CONSTRAINT `FK_spam_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_spam_user_2` FOREIGN KEY (`accuser`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.spam_category
CREATE TABLE IF NOT EXISTS `spam_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.system_config
CREATE TABLE IF NOT EXISTS `system_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `version` varchar(50) NOT NULL,
  `value` json NOT NULL,
  `created_by` int unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` date DEFAULT NULL,
  `system_version` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_system_config_user` (`created_by`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.system_version
CREATE TABLE IF NOT EXISTS `system_version` (
  `id` int NOT NULL AUTO_INCREMENT,
  `version` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1.0.0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.theme
CREATE TABLE IF NOT EXISTS `theme` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `theme_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_theme_user` (`user_id`),
  KEY `FK_theme_theme_category` (`theme_id`),
  CONSTRAINT `FK_theme_theme_category` FOREIGN KEY (`theme_id`) REFERENCES `theme_category` (`id`),
  CONSTRAINT `FK_theme_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.theme_category
CREATE TABLE IF NOT EXISTS `theme_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.transaction_history
CREATE TABLE IF NOT EXISTS `transaction_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL DEFAULT '0',
  `amount` float unsigned NOT NULL DEFAULT '0',
  `currency` varchar(50) NOT NULL DEFAULT 'VND',
  `receiver` int unsigned NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_transaction_history_user` (`user_id`),
  KEY `FK_transaction_history_user_2` (`receiver`),
  CONSTRAINT `FK_transaction_history_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_transaction_history_user_2` FOREIGN KEY (`receiver`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

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
  `birthday` date DEFAULT NULL,
  `amount` int NOT NULL,
  `address` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `refresh_token` varchar(50) DEFAULT NULL,
  `prestige` int NOT NULL,
  `is_verified` int NOT NULL,
  `is_blocked` varchar(50) NOT NULL DEFAULT '0',
  `rating` float NOT NULL DEFAULT '0',
  `sell_failed_count_by_seller` int NOT NULL DEFAULT '0',
  `raise_remain` int NOT NULL DEFAULT '10',
  `create_auction_remain` int NOT NULL DEFAULT '5',
  `sell_failed_count_by_auctioneer` int NOT NULL DEFAULT '0',
  `sell_success_count` int NOT NULL DEFAULT '0',
  `buy_cancel_count_by_seller` int NOT NULL DEFAULT '0',
  `buy_cancel_count_by_auctioneer` int NOT NULL DEFAULT '0',
  `buy_success_count` int NOT NULL DEFAULT '0',
  `custom_config` json DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `del_flag` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=338 DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table auction.user_auction
CREATE TABLE IF NOT EXISTS `user_auction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL DEFAULT '0',
  `auction_id` int NOT NULL DEFAULT '0',
  `is_success` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_user_auction_user` (`user_id`),
  KEY `FK_user_auction_auction` (`auction_id`),
  CONSTRAINT `FK_user_auction_auction` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`id`),
  CONSTRAINT `FK_user_auction_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18061 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.user_rating_history
CREATE TABLE IF NOT EXISTS `user_rating_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `rated_by` int unsigned NOT NULL,
  `rating` int NOT NULL,
  `desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` longtext,
  PRIMARY KEY (`id`),
  KEY `FK_user_rating_history_user` (`user_id`),
  KEY `FK_user_rating_history_user_2` (`rated_by`),
  CONSTRAINT `FK_user_rating_history_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_user_rating_history_user_2` FOREIGN KEY (`rated_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table auction.user_seq
CREATE TABLE IF NOT EXISTS `user_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
