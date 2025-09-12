-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Хост: mysql:3306
-- Время создания: Сен 12 2025 г., 13:50
-- Версия сервера: 8.0.42
-- Версия PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `game`
--
CREATE DATABASE IF NOT EXISTS `game` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `game`;

-- --------------------------------------------------------

--
-- Структура таблицы `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE `games` (
                         `id` int UNSIGNED NOT NULL,
                         `type` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                         `contractAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `ownerAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `finished_at` timestamp NULL DEFAULT NULL,
                         `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                         `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `games`
--

INSERT INTO `games` (`id`, `type`, `contractAddress`, `ownerAddress`, `finished_at`, `created_at`, `updated_at`) VALUES
                                                                                                                     (75, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-14 14:00:58', '2025-09-11 08:31:01'),
                                                                                                                     (76, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-14 14:01:01', '2025-09-02 10:25:01'),
                                                                                                                     (77, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-14 14:01:24', '2025-09-04 07:48:14'),
                                                                                                                     (78, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-14 14:09:16', '2025-09-11 09:52:14'),
                                                                                                                     (79, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-14 14:18:31', '2025-08-21 06:39:57'),
                                                                                                                     (94, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-31 06:26:20', '2025-09-04 07:48:14'),
                                                                                                                     (95, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-31 06:28:03', '2025-09-11 09:52:14'),
                                                                                                                     (96, 'dice', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-31 06:28:11', '2025-09-12 13:12:26'),
                                                                                                                     (97, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-31 06:30:07', '2025-09-11 09:52:14'),
                                                                                                                     (98, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-31 06:30:51', '2025-08-27 09:31:48'),
                                                                                                                     (99, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-31 06:31:43', '2025-08-27 09:31:26'),
                                                                                                                     (100, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-31 07:06:48', '2025-08-27 09:31:26'),
                                                                                                                     (101, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-14 06:14:04', '2025-09-06 09:41:31'),
                                                                                                                     (102, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-15 08:47:15', '2025-09-06 09:41:31'),
                                                                                                                     (103, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-15 09:36:54', '2025-09-06 09:41:31'),
                                                                                                                     (104, 'dice', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-15 09:39:50', '2025-09-12 13:12:26'),
                                                                                                                     (105, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-15 13:36:35', '2025-08-27 09:31:48'),
                                                                                                                     (106, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-15 13:39:21', '2025-09-06 09:41:31'),
                                                                                                                     (107, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-15 13:40:02', '2025-09-06 09:41:31'),
                                                                                                                     (108, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-15 13:40:37', '2025-09-06 09:41:31'),
                                                                                                                     (109, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-15 14:09:51', '2025-09-10 08:04:30'),
                                                                                                                     (110, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-18 07:00:04', '2025-09-10 08:04:30'),
                                                                                                                     (111, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-19 12:12:53', '2025-09-06 09:41:31'),
                                                                                                                     (112, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-19 12:13:40', '2025-09-12 13:12:26'),
                                                                                                                     (113, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-25 06:18:36', '2025-09-04 07:48:14'),
                                                                                                                     (114, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-25 08:25:08', '2025-08-25 08:25:08'),
                                                                                                                     (115, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-25 08:25:36', '2025-09-10 08:04:30'),
                                                                                                                     (116, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-25 14:04:58', '2025-09-06 09:41:31'),
                                                                                                                     (117, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-25 14:05:49', '2025-09-02 10:25:01'),
                                                                                                                     (118, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-29 07:58:58', '2025-08-30 08:10:45'),
                                                                                                                     (119, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-08-30 07:17:01', '2025-09-02 11:17:42'),
                                                                                                                     (120, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-02 10:43:46', '2025-09-02 11:17:42'),
                                                                                                                     (121, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-02 10:47:33', '2025-09-08 11:10:44'),
                                                                                                                     (122, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-02 10:57:48', '2025-09-08 11:10:44'),
                                                                                                                     (123, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-02 10:58:41', '2025-09-08 11:10:44'),
                                                                                                                     (124, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-02 11:02:28', '2025-09-08 11:10:44'),
                                                                                                                     (125, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-02 11:03:02', '2025-09-09 06:31:05'),
                                                                                                                     (126, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-02 11:03:10', '2025-09-09 06:31:05'),
                                                                                                                     (127, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-02 11:03:26', '2025-09-11 14:09:47'),
                                                                                                                     (128, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-02 11:04:08', '2025-09-09 06:31:05'),
                                                                                                                     (129, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-02 11:05:25', '2025-09-09 06:31:05'),
                                                                                                                     (130, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-02 11:05:41', '2025-09-09 06:31:05'),
                                                                                                                     (131, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-02 11:11:24', '2025-09-09 06:31:05'),
                                                                                                                     (132, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-02 11:12:07', '2025-09-12 13:12:26'),
                                                                                                                     (133, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-02 11:15:22', '2025-09-11 12:22:16'),
                                                                                                                     (134, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-03 13:25:52', '2025-09-06 09:41:31'),
                                                                                                                     (135, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-04 06:49:17', '2025-09-06 09:41:31'),
                                                                                                                     (136, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-04 08:02:08', '2025-09-06 09:41:31'),
                                                                                                                     (137, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-04 08:48:36', '2025-09-06 09:41:31'),
                                                                                                                     (138, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-04 08:50:10', '2025-09-06 09:41:31'),
                                                                                                                     (139, 'rock-paper-scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-04 09:05:50', '2025-09-09 06:31:05'),
                                                                                                                     (140, 'dice', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-09 14:05:23', '2025-09-11 14:09:47'),
                                                                                                                     (141, 'dice', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-09 14:05:34', '2025-09-12 13:12:26'),
                                                                                                                     (142, 'dice', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-09 14:54:43', '2025-09-12 13:12:26'),
                                                                                                                     (143, 'dice', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-09 21:48:34', '2025-09-12 13:12:26'),
                                                                                                                     (144, 'dice', '0x54B0A167A01DC71C7F152CA0a5539DB2561060DA', '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', '2025-09-12 13:46:52', '2025-09-09 22:16:50', '2025-09-12 13:46:52'),
                                                                                                                     (145, 'dice', '0x1d92327248fAF24d1573587C9f0514202c657672', '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', '2025-09-12 13:46:20', '2025-09-10 07:37:50', '2025-09-12 13:46:20'),
                                                                                                                     (146, 'dice', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-10 07:42:47', '2025-09-12 13:12:26'),
                                                                                                                     (147, 'dice', '0x4f5d532dBb7a649f01b03c0793cBCF2d6c7a67Ba', '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', '2025-09-12 13:39:26', '2025-09-11 07:20:44', '2025-09-12 13:39:26'),
                                                                                                                     (148, 'dice', '0x91f84af62A262F8EF69EBdb33588b7DF04f63484', '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', '2025-09-12 13:34:45', '2025-09-11 08:30:24', '2025-09-12 13:34:45'),
                                                                                                                     (149, 'dice', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-09-11 12:42:29', '2025-09-12 13:12:26'),
                                                                                                                     (150, 'dice', '0x5919101f5097EAba36DB3A11572237ec281B4a6C', '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', '2025-09-12 13:27:35', '2025-09-11 13:40:55', '2025-09-12 13:27:35'),
                                                                                                                     (151, 'dice', '0xCE1B72Ea715635813db4ad0445902BC31E3b4247', '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', '2025-09-12 13:12:53', '2025-09-11 14:08:30', '2025-09-12 13:12:53'),
                                                                                                                     (152, 'dice', '0xb821d5C04B9BEFa1855a1638c11cB53d70B72411', '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', '2025-09-12 13:28:52', '2025-09-12 12:32:38', '2025-09-12 13:28:52'),
                                                                                                                     (153, 'dice', '0x3e8Bfcbd9E4FBCDA66e21801B08719BB4BA9Cc08', '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', '2025-09-12 13:45:46', '2025-09-12 12:38:11', '2025-09-12 13:45:46');

-- --------------------------------------------------------

--
-- Структура таблицы `game_data`
--

DROP TABLE IF EXISTS `game_data`;
CREATE TABLE `game_data` (
                             `id` int NOT NULL,
                             `game_id` int UNSIGNED NOT NULL,
                             `bet` int NOT NULL,
                             `players_number` int NOT NULL,
                             `player_number_set` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `game_data`
--

INSERT INTO `game_data` (`id`, `game_id`, `bet`, `players_number`, `player_number_set`) VALUES
                                                                                            (45, 75, 45, 1, 0),
                                                                                            (46, 76, 46, 2, 0),
                                                                                            (47, 77, 47, 3, 0),
                                                                                            (48, 78, 48, 1, 0),
                                                                                            (49, 79, 49, 2, 0),
                                                                                            (50, 94, 50, 3, 0),
                                                                                            (51, 95, 13, 1, 0),
                                                                                            (52, 96, 14, 1, 0),
                                                                                            (53, 97, 15, 1, 0),
                                                                                            (54, 98, 16, 1, 0),
                                                                                            (55, 99, 17, 1, 0),
                                                                                            (56, 100, 18, 1, 0),
                                                                                            (57, 101, 100, 1, 0),
                                                                                            (58, 102, 100, 1, 0),
                                                                                            (59, 103, 100, 1, 0),
                                                                                            (60, 104, 100, 1, 0),
                                                                                            (61, 105, 100, 1, 0),
                                                                                            (62, 106, 100, 1, 0),
                                                                                            (63, 107, 100, 1, 0),
                                                                                            (64, 108, 100, 1, 0),
                                                                                            (65, 109, 100, 1, 0),
                                                                                            (66, 110, 1001, 1, 0),
                                                                                            (67, 111, 100, 1, 0),
                                                                                            (68, 112, 100, 1, 0),
                                                                                            (69, 113, 123123, 3, 0),
                                                                                            (70, 115, 100000, 1, 0),
                                                                                            (71, 116, 99999999, 1, 0),
                                                                                            (72, 117, 100, 2, 0),
                                                                                            (73, 118, 100, 2, 0),
                                                                                            (74, 119, 100, 2, 0),
                                                                                            (76, 120, 100, 2, 0),
                                                                                            (77, 121, 100, 2, 0),
                                                                                            (78, 122, 100, 2, 0),
                                                                                            (79, 123, 100, 2, 0),
                                                                                            (80, 124, 100, 2, 0),
                                                                                            (81, 128, 100, 2, 0),
                                                                                            (82, 129, 100, 2, 0),
                                                                                            (83, 130, 100, 2, 0),
                                                                                            (84, 131, 100, 2, 0),
                                                                                            (85, 132, 100, 2, 0),
                                                                                            (86, 133, 100, 2, 0),
                                                                                            (87, 134, 100, 3, 0),
                                                                                            (88, 135, 100, 3, 0),
                                                                                            (89, 136, 100, 3, 0),
                                                                                            (90, 137, 100, 3, 0),
                                                                                            (91, 138, 100, 3, 0),
                                                                                            (92, 139, 100, 3, 0),
                                                                                            (93, 126, 100, 2, 0),
                                                                                            (94, 127, 100, 1, 0),
                                                                                            (95, 125, 46, 2, 0),
                                                                                            (96, 140, 100, 2, 0),
                                                                                            (97, 141, 100, 1, 0),
                                                                                            (98, 142, 100, 1, 0),
                                                                                            (99, 143, 100, 1, 0),
                                                                                            (100, 144, 100, 1, 1),
                                                                                            (101, 145, 100, 1, 1),
                                                                                            (102, 146, 100, 2, 0),
                                                                                            (103, 147, 100, 1, 1),
                                                                                            (104, 148, 100, 1, 1),
                                                                                            (105, 149, 100, 2, 0),
                                                                                            (106, 150, 100, 1, 1),
                                                                                            (107, 151, 100, 1, 1),
                                                                                            (108, 152, 100, 2, 2),
                                                                                            (109, 153, 100, 2, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `game_dice`
--

DROP TABLE IF EXISTS `game_dice`;
CREATE TABLE `game_dice` (
                             `id` int NOT NULL,
                             `game_id` int UNSIGNED NOT NULL,
                             `wallet` varchar(255) NOT NULL,
                             `round` int NOT NULL DEFAULT '1',
                             `result` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `game_dice`
--

INSERT INTO `game_dice` (`id`, `game_id`, `wallet`, `round`, `result`) VALUES
                                                                           (1, 151, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 1, 10),
                                                                           (2, 150, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 1, 6),
                                                                           (3, 152, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 1, 9),
                                                                           (4, 152, '0xdD2FD4581271e230360230F9337D5c0430Bf44C0', 1, 8),
                                                                           (5, 148, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 1, 9),
                                                                           (6, 147, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 1, 6),
                                                                           (7, 153, '0xdD2FD4581271e230360230F9337D5c0430Bf44C0', 1, 0),
                                                                           (8, 153, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 1, 6),
                                                                           (9, 145, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 1, 5),
                                                                           (10, 144, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 1, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `game_players`
--

DROP TABLE IF EXISTS `game_players`;
CREATE TABLE `game_players` (
                                `id` int NOT NULL,
                                `game_id` int UNSIGNED NOT NULL,
                                `wallet` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                `user_id` int NOT NULL,
                                `win` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `game_players`
--

INSERT INTO `game_players` (`id`, `game_id`, `wallet`, `user_id`, `win`) VALUES
                                                                             (1, 151, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 14, 98),
                                                                             (2, 150, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 14, 98),
                                                                             (3, 152, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 14, 196),
                                                                             (4, 152, '0xdD2FD4581271e230360230F9337D5c0430Bf44C0', 13, 0),
                                                                             (5, 153, '0xdD2FD4581271e230360230F9337D5c0430Bf44C0', 13, 0),
                                                                             (6, 148, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 14, 98),
                                                                             (7, 147, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 14, 98),
                                                                             (8, 153, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 14, 196),
                                                                             (9, 145, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 14, 98),
                                                                             (10, 144, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 14, 98);

-- --------------------------------------------------------

--
-- Структура таблицы `game_rock_paper_scissors`
--

DROP TABLE IF EXISTS `game_rock_paper_scissors`;
CREATE TABLE `game_rock_paper_scissors` (
                                            `id` int NOT NULL,
                                            `game_id` int UNSIGNED NOT NULL,
                                            `wallet` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                            `round` int NOT NULL DEFAULT '1',
                                            `result` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `game_types`
--

DROP TABLE IF EXISTS `game_types`;
CREATE TABLE `game_types` (
                              `id` int NOT NULL,
                              `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                              `logic_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `game_types`
--

INSERT INTO `game_types` (`id`, `name`, `logic_address`) VALUES
                                                             (1, 'rock-paper-scissors', ''),
                                                             (2, 'dice', '0x12Da690E645f52e389FbE57646b232cD02B882cc');

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
                              `id` int NOT NULL,
                              `timestamp` bigint NOT NULL,
                              `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
                         `id` int NOT NULL,
                         `login` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'player',
                         `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `wallet` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `encrypted_private_key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
                         `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                         `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `status`, `password`, `wallet`, `encrypted_private_key`, `created_at`, `updated_at`) VALUES
                                                                                                                             (13, 'kolya1234', 'player', '$2b$10$Ebxq3YvKw.UbDLFwmQvfmuDCp6GRcl7Leo8xff/AZZqcZrurZ4a.O', '0xdD2FD4581271e230360230F9337D5c0430Bf44C0', '0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0', '2025-06-23 07:43:43.373318', '2025-08-24 11:51:49.027273'),
                                                                                                                             (14, 'kolya12', 'player', '$2b$10$wGOERwcYmKGsyATcO4cYI.pbYhZw7UWQrqLvf/3biPrnJlbUegVXu', '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e', '2025-06-23 07:45:17.429703', '2025-08-19 07:41:54.149594'),
                                                                                                                             (16, 'alex', 'player', '$2b$10$k6npZPaRRzoMW7yVAimSoegs4V43m3hVCFes79L9/YNnxeLmQ3/SK', '0x60a8c06c73bCA5Efad8433c36a5891Bb228cccFf', '0x9b5911e062839631243ce76c6d783c59412c9d620b52a51b961d45b108d2d800', '2025-07-08 07:39:55.655821', '2025-07-08 07:39:55.655821'),
                                                                                                                             (17, 'TEST_PLAYER', 'player', '$2b$10$DK35kWEoRVgEBEVdcSzVsuSpR2X99UrhXoEynNeKBUumiGR2rREgS', '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc', '0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba', '2025-09-03 13:27:33.718107', '2025-09-03 13:28:13.497009'),
                                                                                                                             (18, 'Bot_1', 'bot', '$2b$10$EOXxdRPI6BkjwuBgTATcXujw3J1pnU8Fssj4tCos6yc8G7zLl6E0i', '0xd1334b9e3EF8f1aD13E4d3E81dD8F2C0D9DA5eFd', '0x587fee8549a81d24d0a88daa47ba1b9089517e559e6910fd8646d9f1ad24f0e3', '2025-09-12 13:47:33.584856', '2025-09-12 13:49:13.186276'),
                                                                                                                             (19, 'Bot_2', 'bot', '$2b$10$PQ/q63OzjxL1DVM81eXdwOzqgcYtd2RepZzjRmdWsvyy0Ksl6VF76', '0x2C09acB7ee583553DD45A6Aa0746589555D70375', '0x0358879db3b850eb299aa495d8bd02d545c7989030bddaaaa399f1477743f4b5', '2025-09-12 13:47:40.683848', '2025-09-12 13:49:19.212241'),
                                                                                                                             (20, 'Bot_3', 'bot', '$2b$10$lb06bvgjfEArh6ez7nKodu7yTCAHn.BfwG1VoM/kPYg3y2AmXHVuC', '0xC5647D4B4106187cAEaBAD3B6369259fcB1f85A6', '0x040bbfd81932b1a0bc33fc9eec5d317379bfd8c7db2d0d91fdf7d1942fbfe96a', '2025-09-12 13:47:47.812411', '2025-09-12 13:49:26.669960'),
                                                                                                                             (21, 'Bot_4', 'bot', '$2b$10$ors/dmWT6s40aXAySBOJfu4MB5WGUUvu5sWt3dxAb0vm0wODJDLeC', '0xb23f96fDbBDC394E5535D4118e709a2f25184E52', '0x977c44e3cc205d5a81ada2b5c5f7c065167cedf6bf62889d8490d1f382c0c290', '2025-09-12 13:47:56.108777', '2025-09-12 13:49:05.579455');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `games`
--
ALTER TABLE `games`
    ADD PRIMARY KEY (`id`),
  ADD KEY `idx_games_type_name` (`type`);

--
-- Индексы таблицы `game_data`
--
ALTER TABLE `game_data`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `game_id` (`game_id`),
  ADD UNIQUE KEY `uk_game_data_game` (`game_id`),
  ADD KEY `idx_game_data_game_id` (`game_id`);

--
-- Индексы таблицы `game_dice`
--
ALTER TABLE `game_dice`
    ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `game_players`
--
ALTER TABLE `game_players`
    ADD PRIMARY KEY (`id`),
  ADD KEY `game_id` (`game_id`),
  ADD KEY `idx_game_players_game_id` (`game_id`),
  ADD KEY `idx_game_players_wallet` (`wallet`),
  ADD KEY `fk_game_players_user` (`user_id`);

--
-- Индексы таблицы `game_rock_paper_scissors`
--
ALTER TABLE `game_rock_paper_scissors`
    ADD PRIMARY KEY (`id`),
  ADD KEY `fk_game_rps_game` (`game_id`);

--
-- Индексы таблицы `game_types`
--
ALTER TABLE `game_types`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `migrations`
--
ALTER TABLE `migrations`
    ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_2d443082eccd5198f95f2a36e2` (`login`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `games`
--
ALTER TABLE `games`
    MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT для таблицы `game_data`
--
ALTER TABLE `game_data`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT для таблицы `game_dice`
--
ALTER TABLE `game_dice`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `game_players`
--
ALTER TABLE `game_players`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `game_rock_paper_scissors`
--
ALTER TABLE `game_rock_paper_scissors`
    MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `game_types`
--
ALTER TABLE `game_types`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `migrations`
--
ALTER TABLE `migrations`
    MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `games`
--
ALTER TABLE `games`
    ADD CONSTRAINT `fk_games_game_type` FOREIGN KEY (`type`) REFERENCES `game_types` (`name`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `game_data`
--
ALTER TABLE `game_data`
    ADD CONSTRAINT `fk_game_data_game` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `game_players`
--
ALTER TABLE `game_players`
    ADD CONSTRAINT `fk_game_players_game` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_game_players_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `game_rock_paper_scissors`
--
ALTER TABLE `game_rock_paper_scissors`
    ADD CONSTRAINT `fk_game_rps_game` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
