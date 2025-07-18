-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Хост: mysql:3306
-- Время создания: Июл 18 2025 г., 06:03
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
                                                                                                                     (75, 'Rock-Paper-Scissors', '0x9A7848b9E60C7619f162880c7CA5Cbca80998034', '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-14 14:00:58', '2025-07-18 06:03:28'),
                                                                                                                     (76, 'Rock-Paper-Scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-14 14:01:01', '2025-07-14 14:01:01'),
                                                                                                                     (77, 'Rock-Paper-Scissors', '0x37dD26d18abeC2d311e82177f9fa58E9DC14b579', '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-14 14:01:24', '2025-07-18 05:43:11'),
                                                                                                                     (78, 'Rock-Paper-Scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-14 14:09:16', '2025-07-14 14:09:16'),
                                                                                                                     (79, 'Rock-Paper-Scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-14 14:18:31', '2025-07-14 14:18:31');

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
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `games`
--
ALTER TABLE `games`
    MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `games`
--
ALTER TABLE `games`
    ADD CONSTRAINT `fk_games_game_type` FOREIGN KEY (`type`) REFERENCES `game_types` (`name`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
