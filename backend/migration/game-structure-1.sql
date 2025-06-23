-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Хост: mysql:3306
-- Время создания: Июн 23 2025 г., 13:23
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

CREATE TABLE `games` (
                         `id` int UNSIGNED NOT NULL,
                         `contractAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `ownerAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `finished_at` timestamp NULL DEFAULT NULL,
                         `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                         `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
                         `id` int NOT NULL,
                         `login` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
                         `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `wallet` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `encrypted_private_key` text COLLATE utf8mb4_unicode_ci,
                         `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                         `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `wallet`, `encrypted_private_key`, `created_at`, `updated_at`) VALUES
                                                                                                                   (1, 'kolya', '$2b$10$I5h8H57VJrHbiJWtYQy.3uyZSYJrMoVt3IQW6inqSZdw1nSJ1JVI2', NULL, NULL, '2025-06-19 07:24:40.522243', '2025-06-19 07:24:40.522243'),
                                                                                                                   (2, 'kolya2', '$2b$10$CkU5kn3avlUCoQuoUK832uDx7pItWlQbSAWm35BJOVz2b0jSauxcu', NULL, NULL, '2025-06-19 07:29:07.597112', '2025-06-19 07:29:07.597112'),
                                                                                                                   (3, 'kolya3', '$2b$10$5wC1jr.vIYn3AEdO6E9Wm.igIHkiqtiCEMNk6IcuQQOiRD.NthkVO', NULL, NULL, '2025-06-19 07:32:22.425851', '2025-06-19 07:32:22.425851'),
                                                                                                                   (4, 'Nikola14', '$2b$10$Hk3rpbzdHQKnCiAfZhD.Dezptv3nAIGKdkr4KXLKenaXBXZmlYJTa', NULL, NULL, '2025-06-19 16:16:37.499400', '2025-06-19 16:16:37.499400'),
                                                                                                                   (5, 'nikolay', '$2b$10$b1vhki.H9u6OmCggye1Zz.ANYap.9V4s0WZmgN7PhFAcmb9YyyCEq', NULL, NULL, '2025-06-19 16:17:29.920966', '2025-06-19 16:17:29.920966'),
                                                                                                                   (6, '123456', '$2b$10$m1NjS2g4fqIjIA/jWMk48eNjQVM58qu8FBFyJiaUwiqQWu6.ypb7C', NULL, NULL, '2025-06-19 16:25:34.399866', '2025-06-19 16:25:34.399866'),
                                                                                                                   (8, '123456kola', '$2b$10$NwMcn96HmMd6NuzkPWd9dejDDrQA7Aft7oEFY2CT98cVlsp3AGZfW', NULL, NULL, '2025-06-20 07:16:09.626700', '2025-06-20 07:16:09.626700'),
                                                                                                                   (9, 'mikola', '$2b$10$6M.nsLLeK524krrSg9cjZ.Iv4/k4oHdtnRP73ZzN1c5bUaX6AxEqq', NULL, NULL, '2025-06-23 07:29:18.736980', '2025-06-23 07:29:18.736980'),
                                                                                                                   (10, 'mikola1', '$2b$10$9JWmmdmBqaSmZZbPbcqXFO1bSAhLedQOhbX9sVHN31ou7si5yVKki', NULL, NULL, '2025-06-23 07:30:32.649430', '2025-06-23 07:30:32.649430'),
                                                                                                                   (11, 'mikola123', '$2b$10$suel29U322TBCRDT/XP2eeabY1eFBu/3Q/4rQqcdHQDlsr4Aa9tum', NULL, NULL, '2025-06-23 07:38:31.233456', '2025-06-23 07:38:31.233456'),
                                                                                                                   (12, 'kolya123', '$2b$10$JXbQPMNApdIX3meJPeqHqO4ZRshIgr1yx7hdet4Zpaq7vtya6DzSS', NULL, NULL, '2025-06-23 07:42:17.011938', '2025-06-23 07:42:17.011938'),
                                                                                                                   (13, 'kolya1234', '$2b$10$Ebxq3YvKw.UbDLFwmQvfmuDCp6GRcl7Leo8xff/AZZqcZrurZ4a.O', '0x75AFb5a18E0B7960f11529f284c18444C8a76A86', '0x875d1d57f6e0576363dc0f6d55c9480c4e5f463762fe66d9b8c0989c7d97f88f', '2025-06-23 07:43:43.373318', '2025-06-23 07:43:43.373318'),
                                                                                                                   (14, 'kolya12', '$2b$10$wGOERwcYmKGsyATcO4cYI.pbYhZw7UWQrqLvf/3biPrnJlbUegVXu', '0xEC8B785Bf287606E0B6DdE00A6B8d4849aC51c0f', '0xe779364c1ac5298be68ac3a61c9e5f6358e3156282b70af3ef18eee204ac6a20', '2025-06-23 07:45:17.429703', '2025-06-23 07:45:17.429703');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `games`
--
ALTER TABLE `games`
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
    MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
