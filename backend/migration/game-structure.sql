-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Хост: host.docker.internal:3306
-- Время создания: Окт 06 2025 г., 12:59
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
                                                                                                                     (699, 'rock-paper-scissors', '0x93894a0e4979DdC9c1E6F91097b7D1cb6b2d36f2', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-24 15:57:23', '2025-09-24 15:57:52'),
                                                                                                                     (700, 'rock-paper-scissors', '0x2109FeD91C19Daa0Fe829d472655f118C1b2755c', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-24 16:01:07', '2025-09-24 16:17:25'),
                                                                                                                     (701, 'rock-paper-scissors', '0xce4269EdFA7c3149744280B48d9BE121956262dF', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-24 16:01:34', '2025-09-24 16:01:50'),
                                                                                                                     (702, 'rock-paper-scissors', '0xefdfc3F554aA3b0740fc5C4BD4D3475dF5357B44', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-24 16:07:55', '2025-09-24 16:08:01'),
                                                                                                                     (703, 'rock-paper-scissors', '0xFD6221F75330cd15fFC7101D5B2d3A95f00A7fE3', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-24 16:13:54', '2025-09-24 16:14:04'),
                                                                                                                     (704, 'rock-paper-scissors', '0x2D35679322D2612A189154D525698e3BfFa85CB4', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-24 16:25:13', '2025-09-24 16:20:47', '2025-09-24 16:25:13'),
                                                                                                                     (705, 'rock-paper-scissors', '0xE90dB3fD5bb8f6AA021685E4Fa0306358A3a1fC8', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-24 16:28:48', '2025-09-24 16:27:03', '2025-09-24 16:28:48'),
                                                                                                                     (706, 'rock-paper-scissors', '0xc3597E60456c1C60c7794f6d780aa08870548697', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-24 16:31:48', '2025-09-24 16:30:13', '2025-09-24 16:31:48'),
                                                                                                                     (707, 'rock-paper-scissors', '0xBEd11773e4523aFe7C7Ee89FD837Cf33C364A7bF', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-24 16:39:37', '2025-09-24 16:37:07', '2025-09-24 16:39:37'),
                                                                                                                     (708, 'rock-paper-scissors', '0xd7CC49D059Abb717BCdf87c8F093f05FE8EDF470', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-24 21:06:25', '2025-09-24 20:35:17', '2025-09-24 21:06:25'),
                                                                                                                     (709, 'rock-paper-scissors', '0x6F09f09435813Ffda23f042e6f2E91DEf87b67BC', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-24 21:12:48', '2025-09-24 21:09:35', '2025-09-24 21:12:48'),
                                                                                                                     (710, 'rock-paper-scissors', '0x569A3227ec78578714706D6DeE9003AB26C3Bc1B', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-24 21:22:48', '2025-09-24 21:21:15', '2025-09-24 21:22:48'),
                                                                                                                     (711, 'rock-paper-scissors', '0xDb6C3aeD02fDd5892CC04D0795114e8FbF85B7b0', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-24 21:25:24', '2025-09-24 21:23:44', '2025-09-24 21:25:24'),
                                                                                                                     (712, 'rock-paper-scissors', '0x09E7d3d989F091Bfd07aa3D5775b4883DFDfAD45', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-24 21:28:00', '2025-09-24 21:25:37', '2025-09-24 21:28:00'),
                                                                                                                     (713, 'rock-paper-scissors', '0x177Fe10f6981Db34c578abA2D9eA69a40382F906', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-24 21:30:01', '2025-09-24 21:28:30', '2025-09-24 21:30:01'),
                                                                                                                     (714, 'rock-paper-scissors', '0xB29805315566C032cF90112f51ac38c74bf490a0', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-24 21:34:49', '2025-09-24 21:31:48', '2025-09-24 21:34:49'),
                                                                                                                     (715, 'rock-paper-scissors', '0x87fA3193626571406d9C7Ecf3B8e9E034737433E', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-24 21:35:01', '2025-09-24 21:35:16'),
                                                                                                                     (716, 'rock-paper-scissors', '0xb6BDb7Ed3bDFaA175dd27B72ae9afF46366fB2CC', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-24 21:37:24', '2025-09-24 21:35:24', '2025-09-24 21:37:24'),
                                                                                                                     (717, 'rock-paper-scissors', '0x2d4d2c1069866118bCE7aAD25d16D150cf46a60C', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-25 09:13:43', '2025-09-25 09:13:50'),
                                                                                                                     (718, 'rock-paper-scissors', '0x2ED8094391649Db322bbCccF321b605b4a57fb5B', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-25 09:21:24', '2025-09-25 09:19:32', '2025-09-25 09:21:24'),
                                                                                                                     (719, 'rock-paper-scissors', '0xC3e4b5c9DF223B54207DB5dc9744aF73c3811E3f', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-25 09:23:36', '2025-09-25 09:21:57', '2025-09-25 09:23:36'),
                                                                                                                     (720, 'rock-paper-scissors', NULL, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-25 09:27:54', '2025-09-25 09:27:54'),
                                                                                                                     (721, 'rock-paper-scissors', '0x2b1D475640AAd48A41Cd4099D133FdD0e743b365', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-25 09:28:36', '2025-09-25 09:28:52'),
                                                                                                                     (722, 'rock-paper-scissors', '0xE59dd2252d2a90aA144696eBb3A6a53cDf83EdF9', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-25 11:38:03', '2025-09-25 11:38:14'),
                                                                                                                     (723, 'rock-paper-scissors', '0x3549f7457a341F0BCa0AE7473Af0fC9b6221D01b', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-25 11:43:24', '2025-09-25 11:41:20', '2025-09-25 11:43:24'),
                                                                                                                     (724, 'rock-paper-scissors', '0x1474B26E766bD0cd6be4A3AAb5227BA73C3Bf20F', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-25 11:46:16', '2025-09-25 11:46:27'),
                                                                                                                     (725, 'rock-paper-scissors', '0x710d7b5D3996a312b9Ffc82CE7595bd7022a5A0C', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-26 06:56:01', '2025-09-26 06:56:16'),
                                                                                                                     (726, 'rock-paper-scissors', '0x866c90DD35b1a8405e56d0Df79A95d9D34b9Ea7f', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-26 08:44:35', '2025-09-26 08:45:03'),
                                                                                                                     (727, 'rock-paper-scissors', '0x181D5bF9cB85174dC0B21946DB9e5634420EA540', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-26 08:50:00', '2025-09-26 08:48:03', '2025-09-26 08:50:00'),
                                                                                                                     (728, 'dice', '0x1EB535f0092a90A2155B47c35411c69a431e9736', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-26 08:54:24', '2025-09-26 08:52:34', '2025-09-26 08:54:24'),
                                                                                                                     (729, 'rock-paper-scissors', '0x1646E90D3CC910ceB891CCd112098c7B07fBE2a4', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 06:20:19', '2025-09-27 06:20:25'),
                                                                                                                     (730, 'rock-paper-scissors', '0x31604f82790be84E5f0AFC7A4EB3ac7e55ec67EB', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 07:21:04', '2025-09-27 07:21:14'),
                                                                                                                     (731, 'rock-paper-scissors', '0x1D381442B1EeEa1Bd30db085f0E9C643E097a788', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 07:21:36', '2025-09-27 07:21:50'),
                                                                                                                     (732, 'rock-paper-scissors', '0xcFbF5c08268ada141B4081fcE7e54dF43aee8345', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 07:24:25', '2025-09-27 07:24:39'),
                                                                                                                     (733, 'rock-paper-scissors', '0x116458C1240b1D791576Ec2002D82664436AD6f8', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 07:24:51', '2025-09-27 07:25:01'),
                                                                                                                     (734, 'rock-paper-scissors', '0x0f56aC32C89B4A5936a025540d00D343F9F3Cd73', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 07:25:37', '2025-09-27 07:25:52'),
                                                                                                                     (735, 'rock-paper-scissors', '0x734E7B0Ce6F1a27a31c829b72ce8FC02EB5BcEf6', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 07:25:59', '2025-09-27 07:26:14'),
                                                                                                                     (736, 'rock-paper-scissors', '0x2879580C57DC61c6489DF94154a18Ce68e5A79f7', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 07:26:31', '2025-09-27 07:26:37'),
                                                                                                                     (737, 'rock-paper-scissors', '0xa007f9BAe80Ef72759a2839bfDe0dB34f207a7eA', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 07:26:47', '2025-09-27 07:27:14'),
                                                                                                                     (738, 'rock-paper-scissors', '0xCe5FEA9F1e27B2A980b063880279B2e742679f5A', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 07:27:44', '2025-09-27 07:28:03'),
                                                                                                                     (739, 'rock-paper-scissors', '0xBC7DC53cD9C64Aca60185A8444BB60b4106Ab228', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 07:30:02', '2025-09-27 07:30:37'),
                                                                                                                     (740, 'rock-paper-scissors', '0x0c660750BB3c1fa34cD927Cf31451a870AD6E413', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 07:31:11', '2025-09-27 07:31:26'),
                                                                                                                     (741, 'rock-paper-scissors', '0x5Dc15d8B433acE8CDb3e32444Ff976813a2B2e35', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 07:56:47', '2025-09-27 07:57:02'),
                                                                                                                     (742, 'rock-paper-scissors', '0x6B7243eB32547F817a35908C2037B1667Fd966cD', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 07:57:57', '2025-09-27 07:58:15'),
                                                                                                                     (743, 'rock-paper-scissors', '0x3d5fdb4Df30436ea52B468dcB058338A45B5795A', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 07:59:39', '2025-09-27 07:59:49'),
                                                                                                                     (744, 'rock-paper-scissors', '0xB35fC090f55679428C23F7C7CF6dC12a7d35e16E', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 08:02:03', '2025-09-27 08:02:13'),
                                                                                                                     (745, 'rock-paper-scissors', '0x783Da71F8E053416A6efabaF6d85662279F1016e', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 08:11:04', '2025-09-27 08:11:14'),
                                                                                                                     (746, 'rock-paper-scissors', '0xF52bb8b210a5A558C96c1eFe7D640B7F5fa222Fb', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-27 08:12:42', '2025-09-27 08:12:49'),
                                                                                                                     (747, 'rock-paper-scissors', '0xC7ce0b02E0BF42c707E6a250d36Aee655D0670e9', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-28 13:57:31', '2025-09-28 13:57:37'),
                                                                                                                     (748, 'rock-paper-scissors', '0x70657f1e8Afff09927A0953366320EE5cB4A1A19', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-28 13:58:10', '2025-09-28 13:58:25'),
                                                                                                                     (749, 'rock-paper-scissors', '0xf7B5B4d45cfCA8Af2Dd38f963090dEc00bE0ABc8', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-28 14:15:00', '2025-09-28 14:13:21', '2025-09-28 14:15:00'),
                                                                                                                     (750, 'rock-paper-scissors', '0xFB514Ce29236f68FD3D8e717f894c99d22d47Cf4', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-28 15:45:19', '2025-09-28 15:45:38'),
                                                                                                                     (751, 'rock-paper-scissors', '0x3b7157e87766058d184b64727518d4b0a0eF8eF5', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-28 15:49:49', '2025-09-28 15:48:09', '2025-09-28 15:49:49'),
                                                                                                                     (752, 'rock-paper-scissors', '0x15B3BFAdCb20AB2ea58AfE651Aaf72f4C0f927A7', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-28 21:03:00', '2025-09-28 21:01:29', '2025-09-28 21:03:00'),
                                                                                                                     (753, 'dice', '0x3AB3499ED85321C3dD881b437EF42D564f8e9019', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-28 21:04:37', '2025-09-28 21:03:12', '2025-09-28 21:04:37'),
                                                                                                                     (754, 'dice', '0xFa36bEa2E52a3833220044b664B5d88bB09549cF', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-28 21:08:12', '2025-09-28 21:06:13', '2025-09-28 21:08:12'),
                                                                                                                     (755, 'dice', '0x8FCD4Ec1107988A4D885c77cdeea04a8897F99f1', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-28 21:10:00', '2025-09-28 21:08:29', '2025-09-28 21:10:00'),
                                                                                                                     (756, 'dice', '0xBC708205629888cBb0bd052693b5e688969C03e0', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-28 21:14:14', '2025-09-28 21:10:20', '2025-09-28 21:14:14'),
                                                                                                                     (757, 'rock-paper-scissors', '0xE55701c26e05c228c258318c4209148ccb83b771', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-28 21:24:12', '2025-09-28 21:19:14', '2025-09-28 21:24:12'),
                                                                                                                     (758, 'rock-paper-scissors', '0xCab60E72C7fc1b36fE054ff259F4AFBcba94f834', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-28 21:27:12', '2025-09-28 21:24:36', '2025-09-28 21:27:12'),
                                                                                                                     (759, 'rock-paper-scissors', NULL, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-29 07:22:47', '2025-09-29 07:22:47'),
                                                                                                                     (760, 'rock-paper-scissors', NULL, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-29 07:23:42', '2025-09-29 07:23:42'),
                                                                                                                     (761, 'rock-paper-scissors', NULL, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', NULL, '2025-09-29 07:32:41', '2025-09-29 07:32:41'),
                                                                                                                     (762, 'rock-paper-scissors', '0xC0F104649939C0B9924D4F4A42F95b0e37cA1164', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-29 07:42:01', '2025-09-29 07:40:05', '2025-09-29 07:42:01'),
                                                                                                                     (763, 'rock-paper-scissors', '0xf32572dFEad49fF805510Ed04d28163d43d1917B', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-29 07:44:24', '2025-09-29 07:42:16', '2025-09-29 07:44:24'),
                                                                                                                     (764, 'dice', '0xcE1D059204a6E182AC1aA7f61218eB8F0BF277b8', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-29 07:46:00', '2025-09-29 07:44:44', '2025-09-29 07:46:00'),
                                                                                                                     (765, 'dice', '0x9b0Fbd19E476ee332773EEcC94602e4Bd56D8D89', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-29 07:48:13', '2025-09-29 07:46:12', '2025-09-29 07:48:13'),
                                                                                                                     (766, 'dice', '0x04d8b9d658BA386Cf77ECBe9802Db4D78cA5561d', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-29 07:49:36', '2025-09-29 07:48:15', '2025-09-29 07:49:36'),
                                                                                                                     (767, 'dice', '0x5a5687965403E7aA270312606C380a685473688A', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-29 07:51:12', '2025-09-29 07:49:36', '2025-09-29 07:51:12'),
                                                                                                                     (768, 'rock-paper-scissors', '0xbfDF00fD7d8BA1a6528320538fADCB12560800BD', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-29 07:56:37', '2025-09-29 07:54:34', '2025-09-29 07:56:37'),
                                                                                                                     (769, 'rock-paper-scissors', '0xca660215EEF848B551aE32E0f21469Ef5f08bFCC', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-29 07:58:13', '2025-09-29 07:56:40', '2025-09-29 07:58:13'),
                                                                                                                     (770, 'rock-paper-scissors', '0x30A4C6AfA3B794a5D69a5701B436Cf397B3F6B72', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-29 07:59:36', '2025-09-29 07:58:12', '2025-09-29 07:59:36'),
                                                                                                                     (771, 'dice', '0xb51f71cFc2d5Af3Ef489665BD1a07FB496a4E62D', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-29 08:01:00', '2025-09-29 07:59:40', '2025-09-29 08:01:00'),
                                                                                                                     (772, 'dice', '0xf083A07b9273b6532f6E7c16BeBbc9e7AF5B1266', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-29 08:06:01', '2025-09-29 08:01:32', '2025-09-29 08:06:01'),
                                                                                                                     (773, 'dice', '0xd49DF7C80019Fd3518b34E3F199EFb2b7f92D255', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '2025-09-29 08:07:12', '2025-09-29 08:05:25', '2025-09-29 08:07:12');

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
                             `player_number_set` int NOT NULL,
                             `bots` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `game_data`
--

INSERT INTO `game_data` (`id`, `game_id`, `bet`, `players_number`, `player_number_set`, `bots`) VALUES
                                                                                                    (653, 699, 100, 1, 1, 0),
                                                                                                    (654, 700, 100, 2, 2, 0),
                                                                                                    (655, 701, 100, 2, 2, 0),
                                                                                                    (656, 702, 100, 1, 1, 0),
                                                                                                    (657, 703, 100, 1, 1, 0),
                                                                                                    (658, 704, 100, 2, 2, 0),
                                                                                                    (659, 705, 100, 2, 2, 0),
                                                                                                    (660, 706, 100, 2, 2, 0),
                                                                                                    (661, 707, 100, 2, 2, 0),
                                                                                                    (662, 708, 100, 2, 2, 0),
                                                                                                    (663, 709, 100, 2, 2, 0),
                                                                                                    (664, 710, 100, 2, 2, 0),
                                                                                                    (665, 711, 100, 2, 2, 0),
                                                                                                    (666, 712, 100, 2, 2, 0),
                                                                                                    (667, 713, 100, 2, 2, 1),
                                                                                                    (668, 714, 100, 2, 2, 1),
                                                                                                    (669, 715, 100, 2, 2, 1),
                                                                                                    (670, 716, 100, 2, 2, 1),
                                                                                                    (671, 717, 100, 2, 2, 1),
                                                                                                    (672, 718, 100, 2, 2, 1),
                                                                                                    (673, 719, 100, 2, 2, 1),
                                                                                                    (674, 720, 100, 2, 2, 1),
                                                                                                    (675, 721, 100, 2, 2, 1),
                                                                                                    (676, 722, 100, 2, 2, 1),
                                                                                                    (677, 723, 100, 2, 2, 1),
                                                                                                    (678, 724, 100, 2, 2, 1),
                                                                                                    (679, 725, 100, 2, 2, 1),
                                                                                                    (680, 726, 100, 2, 2, 1),
                                                                                                    (681, 727, 100, 2, 2, 1),
                                                                                                    (682, 728, 100, 2, 2, 1),
                                                                                                    (683, 729, 100, 1, 1, 0),
                                                                                                    (684, 730, 100, 1, 1, 0),
                                                                                                    (685, 731, 100, 1, 1, 0),
                                                                                                    (686, 732, 100, 1, 1, 0),
                                                                                                    (687, 733, 100, 1, 1, 0),
                                                                                                    (688, 734, 100, 1, 1, 0),
                                                                                                    (689, 735, 100, 1, 1, 0),
                                                                                                    (690, 736, 100, 1, 1, 0),
                                                                                                    (691, 737, 100, 1, 1, 0),
                                                                                                    (692, 738, 100, 1, 1, 0),
                                                                                                    (693, 739, 100, 1, 1, 0),
                                                                                                    (694, 740, 100, 1, 1, 0),
                                                                                                    (695, 741, 100, 1, 1, 0),
                                                                                                    (696, 742, 100, 1, 1, 0),
                                                                                                    (697, 743, 100, 1, 1, 0),
                                                                                                    (698, 744, 100, 1, 1, 0),
                                                                                                    (699, 745, 100, 2, 2, 1),
                                                                                                    (700, 746, 100, 2, 2, 1),
                                                                                                    (701, 747, 100, 1, 1, 0),
                                                                                                    (702, 748, 100, 2, 2, 1),
                                                                                                    (703, 749, 100, 2, 2, 1),
                                                                                                    (704, 750, 100, 2, 2, 1),
                                                                                                    (705, 751, 100, 2, 2, 1),
                                                                                                    (706, 752, 100, 2, 2, 1),
                                                                                                    (707, 753, 100, 2, 2, 1),
                                                                                                    (708, 754, 100, 2, 2, 1),
                                                                                                    (709, 755, 100, 2, 2, 1),
                                                                                                    (710, 756, 100, 2, 2, 1),
                                                                                                    (711, 757, 100, 2, 2, 1),
                                                                                                    (712, 758, 100, 2, 2, 1),
                                                                                                    (713, 759, 100, 2, 2, 1),
                                                                                                    (714, 760, 100, 2, 2, 1),
                                                                                                    (715, 761, 100, 2, 2, 1),
                                                                                                    (716, 762, 100, 2, 2, 1),
                                                                                                    (717, 763, 100, 2, 2, 1),
                                                                                                    (718, 764, 100, 2, 2, 1),
                                                                                                    (719, 765, 100, 2, 2, 1),
                                                                                                    (720, 766, 100, 2, 2, 1),
                                                                                                    (721, 767, 100, 2, 2, 1),
                                                                                                    (722, 768, 100, 2, 2, 1),
                                                                                                    (723, 769, 100, 2, 2, 1),
                                                                                                    (724, 770, 100, 2, 2, 1),
                                                                                                    (725, 771, 100, 2, 2, 1),
                                                                                                    (726, 772, 100, 2, 2, 1),
                                                                                                    (727, 773, 100, 2, 2, 1);

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
                                                                           (1, 728, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, 6),
                                                                           (2, 728, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, 3),
                                                                           (3, 753, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, 11),
                                                                           (4, 753, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, 9),
                                                                           (5, 754, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, 6),
                                                                           (6, 754, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, 7),
                                                                           (7, 755, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, 9),
                                                                           (8, 755, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, 5),
                                                                           (9, 756, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, 8),
                                                                           (10, 756, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, 12),
                                                                           (11, 764, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, 8),
                                                                           (12, 764, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, 9),
                                                                           (13, 765, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, 9),
                                                                           (14, 765, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, 9),
                                                                           (15, 765, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 2, 8),
                                                                           (16, 765, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 2, 7),
                                                                           (17, 766, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, 10),
                                                                           (18, 766, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, 3),
                                                                           (19, 767, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, 11),
                                                                           (20, 767, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, 7),
                                                                           (21, 771, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, 8),
                                                                           (22, 771, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, 5),
                                                                           (23, 772, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, 11),
                                                                           (24, 772, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, 11),
                                                                           (25, 772, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 2, 5),
                                                                           (26, 772, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 2, 4),
                                                                           (27, 773, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, 11),
                                                                           (28, 773, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, 5);

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
                                                                             (5, 699, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (6, 700, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (7, 701, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 23, NULL),
                                                                             (8, 701, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (9, 702, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (10, 703, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (11, 700, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 23, NULL),
                                                                             (12, 704, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (13, 704, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 23, NULL),
                                                                             (14, 705, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (15, 705, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 23, 196),
                                                                             (16, 706, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (17, 706, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 23, 196),
                                                                             (18, 707, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (19, 707, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 23, 196),
                                                                             (20, 708, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 196),
                                                                             (21, 708, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 23, 0),
                                                                             (22, 709, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 23, 0),
                                                                             (23, 709, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 196),
                                                                             (24, 710, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 23, 196),
                                                                             (25, 710, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (26, 711, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 23, 196),
                                                                             (27, 711, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (28, 712, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 23, 0),
                                                                             (29, 712, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 196),
                                                                             (30, 713, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 0),
                                                                             (31, 713, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 196),
                                                                             (32, 714, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (33, 714, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (34, 715, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, NULL),
                                                                             (35, 715, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (36, 716, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (37, 716, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (38, 717, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, NULL),
                                                                             (39, 717, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (40, 718, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (41, 718, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (42, 719, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 0),
                                                                             (43, 719, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 196),
                                                                             (44, 720, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, NULL),
                                                                             (45, 721, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, NULL),
                                                                             (46, 721, '0xbc919E13e9f7dF0124D8442bA463D782F9401dc0', 23, NULL),
                                                                             (47, 722, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, NULL),
                                                                             (48, 722, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (49, 723, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (50, 723, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (51, 724, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, NULL),
                                                                             (52, 724, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (53, 725, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, NULL),
                                                                             (54, 725, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (55, 726, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, NULL),
                                                                             (56, 726, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (57, 727, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 0),
                                                                             (58, 727, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 196),
                                                                             (59, 720, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (60, 728, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (61, 728, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (62, 729, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (63, 730, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (64, 731, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (65, 732, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (66, 733, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (67, 734, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (68, 735, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (69, 736, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (70, 737, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (71, 738, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (72, 739, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (73, 740, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (74, 741, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (75, 742, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (76, 743, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (77, 744, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (78, 745, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, NULL),
                                                                             (79, 745, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (80, 746, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, NULL),
                                                                             (81, 746, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (82, 747, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (83, 748, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, NULL),
                                                                             (84, 748, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (85, 749, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (86, 749, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (87, 750, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, NULL),
                                                                             (88, 750, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (89, 751, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (90, 751, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (91, 752, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (92, 752, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (93, 753, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (94, 753, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (95, 754, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 0),
                                                                             (96, 754, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 196),
                                                                             (97, 755, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (98, 755, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (99, 756, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 0),
                                                                             (100, 756, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 196),
                                                                             (101, 757, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 0),
                                                                             (102, 757, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 196),
                                                                             (103, 758, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 0),
                                                                             (104, 758, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 196),
                                                                             (105, 759, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, NULL),
                                                                             (106, 759, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (107, 760, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, NULL),
                                                                             (108, 760, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (109, 761, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, NULL),
                                                                             (110, 761, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, NULL),
                                                                             (111, 762, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (112, 762, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (113, 763, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (114, 763, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (115, 764, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 0),
                                                                             (116, 764, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 196),
                                                                             (117, 765, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (118, 765, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (119, 766, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (120, 766, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (121, 767, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (122, 767, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (123, 768, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 0),
                                                                             (124, 768, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 196),
                                                                             (125, 769, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 0),
                                                                             (126, 769, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 196),
                                                                             (127, 770, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 0),
                                                                             (128, 770, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 196),
                                                                             (129, 771, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (130, 771, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (131, 772, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (132, 772, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0),
                                                                             (133, 773, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 18, 196),
                                                                             (134, 773, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 22, 0);

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

--
-- Дамп данных таблицы `game_rock_paper_scissors`
--

INSERT INTO `game_rock_paper_scissors` (`id`, `game_id`, `wallet`, `round`, `result`) VALUES
                                                                                          (1, 699, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '2'),
                                                                                          (2, 699, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 2, NULL),
                                                                                          (3, 701, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, NULL),
                                                                                          (4, 701, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, NULL),
                                                                                          (5, 702, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, NULL),
                                                                                          (6, 703, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '2'),
                                                                                          (7, 703, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 2, '2'),
                                                                                          (8, 703, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 3, NULL),
                                                                                          (9, 704, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '2'),
                                                                                          (10, 704, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '2'),
                                                                                          (11, 704, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 2, '3'),
                                                                                          (12, 704, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 2, '1'),
                                                                                          (13, 705, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '3'),
                                                                                          (14, 705, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '2'),
                                                                                          (15, 706, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '3'),
                                                                                          (16, 706, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '2'),
                                                                                          (17, 707, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '3'),
                                                                                          (18, 707, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '2'),
                                                                                          (19, 708, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '2'),
                                                                                          (20, 708, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '3'),
                                                                                          (21, 709, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '3'),
                                                                                          (22, 709, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '2'),
                                                                                          (23, 710, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '2'),
                                                                                          (24, 710, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '3'),
                                                                                          (25, 711, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '2'),
                                                                                          (26, 711, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '2'),
                                                                                          (27, 711, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 2, '1'),
                                                                                          (28, 711, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 2, '1'),
                                                                                          (29, 711, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 3, '2'),
                                                                                          (30, 711, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 3, '3'),
                                                                                          (31, 712, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '1'),
                                                                                          (32, 712, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '3'),
                                                                                          (33, 713, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '3'),
                                                                                          (34, 713, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '3'),
                                                                                          (35, 713, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 2, '3'),
                                                                                          (36, 713, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 2, '2'),
                                                                                          (37, 714, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '3'),
                                                                                          (38, 714, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '3'),
                                                                                          (39, 714, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 2, '3'),
                                                                                          (40, 714, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 2, '1'),
                                                                                          (41, 716, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '2'),
                                                                                          (42, 716, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '3'),
                                                                                          (43, 718, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '1'),
                                                                                          (44, 718, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '2'),
                                                                                          (45, 719, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '2'),
                                                                                          (46, 719, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '2'),
                                                                                          (47, 719, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 2, '3'),
                                                                                          (48, 719, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 2, '3'),
                                                                                          (49, 719, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 3, '1'),
                                                                                          (50, 719, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 3, '3'),
                                                                                          (51, 723, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '3'),
                                                                                          (52, 723, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '1'),
                                                                                          (53, 727, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '2'),
                                                                                          (54, 727, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '1'),
                                                                                          (55, 746, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '1'),
                                                                                          (56, 746, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, NULL),
                                                                                          (57, 749, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '2'),
                                                                                          (58, 749, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '3'),
                                                                                          (59, 751, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '1'),
                                                                                          (60, 751, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '2'),
                                                                                          (61, 752, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '1'),
                                                                                          (62, 752, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '2'),
                                                                                          (63, 757, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '2'),
                                                                                          (64, 757, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '2'),
                                                                                          (65, 757, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 2, '3'),
                                                                                          (66, 757, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 2, '2'),
                                                                                          (67, 758, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '3'),
                                                                                          (68, 758, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '3'),
                                                                                          (69, 758, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 2, '3'),
                                                                                          (70, 758, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 2, '2'),
                                                                                          (71, 762, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '3'),
                                                                                          (72, 762, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '3'),
                                                                                          (73, 762, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 2, '3'),
                                                                                          (74, 762, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 2, '1'),
                                                                                          (75, 763, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '2'),
                                                                                          (76, 763, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '3'),
                                                                                          (77, 768, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '2'),
                                                                                          (78, 768, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '2'),
                                                                                          (79, 768, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 2, '2'),
                                                                                          (80, 768, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 2, '2'),
                                                                                          (81, 768, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 3, '2'),
                                                                                          (82, 768, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 3, '2'),
                                                                                          (83, 768, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 4, '2'),
                                                                                          (84, 768, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 4, '2'),
                                                                                          (85, 768, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 5, '2'),
                                                                                          (86, 768, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 5, '2'),
                                                                                          (87, 768, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 6, '2'),
                                                                                          (88, 768, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 6, '2'),
                                                                                          (89, 768, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 7, '2'),
                                                                                          (90, 768, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 7, '2'),
                                                                                          (91, 768, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 8, '3'),
                                                                                          (92, 768, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 8, '3'),
                                                                                          (93, 768, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 9, '1'),
                                                                                          (94, 768, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 9, '3'),
                                                                                          (95, 769, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '3'),
                                                                                          (96, 769, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '3'),
                                                                                          (97, 769, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 2, '3'),
                                                                                          (98, 769, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 2, '3'),
                                                                                          (99, 769, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 3, '1'),
                                                                                          (100, 769, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 3, '3'),
                                                                                          (101, 770, '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', 1, '2'),
                                                                                          (102, 770, '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', 1, '1');

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
                                                             (1, 'rock-paper-scissors', '0x177F4dD6EAEd33Fad489138154de7eabeAad48eF'),
                                                             (2, 'dice', '0xc5E21F2058E5DEF02ddb1194c20c335A315C96b7'),
                                                             (3, 'roulette', ''),
                                                             (4, 'blackjack', ''),
                                                             (5, 'bingo', ''),
                                                             (6, 'slots', ''),
                                                             (7, 'poker', ''),
                                                             (8, 'heads-and-tails', '');

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
                                                                                                                             (18, 'Bot_1', 'bot', '$2b$10$EOXxdRPI6BkjwuBgTATcXujw3J1pnU8Fssj4tCos6yc8G7zLl6E0i', '0x5895dD848b7A2357025eC61FDDDFe981Be503fb4', '9454d9e20b5509c171f1c0edb6e990b5b429d727ae73252c98c6f96bf1905884', '2025-09-12 13:47:33.584856', '2025-09-24 21:27:22.659783'),
                                                                                                                             (19, 'Bot_2', 'bot', '$2b$10$PQ/q63OzjxL1DVM81eXdwOzqgcYtd2RepZzjRmdWsvyy0Ksl6VF76', '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a', '2025-09-12 13:47:40.683848', '2025-09-15 09:27:21.662981'),
                                                                                                                             (20, 'Bot_3', 'bot', '$2b$10$lb06bvgjfEArh6ez7nKodu7yTCAHn.BfwG1VoM/kPYg3y2AmXHVuC', '0x90F79bf6EB2c4f870365E785982E1f101E93b906', '0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6', '2025-09-12 13:47:47.812411', '2025-09-15 09:27:38.976495'),
                                                                                                                             (21, 'Bot_4', 'bot', '$2b$10$ors/dmWT6s40aXAySBOJfu4MB5WGUUvu5sWt3dxAb0vm0wODJDLeC', '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65', '0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a', '2025-09-12 13:47:56.108777', '2025-09-15 09:27:57.185993'),
                                                                                                                             (22, 'real_test_wallet', 'player', '$2b$10$izkqQNpOkc5dRm9BRFzoR.Z7rt391BVrjBjSASyn5xjZ/kJBPfYbC', '0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe', '32f561a84be0480b20b69c8633b9ef48464e5bb863627209c502897e823427d3', '2025-09-23 06:39:53.088492', '2025-09-23 06:42:38.280165'),
                                                                                                                             (23, 'real_test_wallet_2', 'player', '$2b$10$IhBiPHA/JSWJyU7/doRTvuPxgsZR4vJjAJWwSw464EgK3oMLFt4q.', '0xbc919E13e9f7dF0124D8442bA463D782F9401dc0', 'd4b36f4fca3f120911357461f2783cb83f172119cf7203e0f3e2d179ccfb0d60', '2025-09-23 06:40:16.957054', '2025-09-25 09:27:38.667639');

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
    MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=774;

--
-- AUTO_INCREMENT для таблицы `game_data`
--
ALTER TABLE `game_data`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=728;

--
-- AUTO_INCREMENT для таблицы `game_dice`
--
ALTER TABLE `game_dice`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `game_players`
--
ALTER TABLE `game_players`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT для таблицы `game_rock_paper_scissors`
--
ALTER TABLE `game_rock_paper_scissors`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT для таблицы `game_types`
--
ALTER TABLE `game_types`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `migrations`
--
ALTER TABLE `migrations`
    MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

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
