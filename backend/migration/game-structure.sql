-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Хост: mysql:3306
-- Время создания: Июл 11 2025 г., 07:52
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
                         `type` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `contractAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `ownerAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `finished_at` timestamp NULL DEFAULT NULL,
                         `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                         `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Очистить таблицу перед добавлением данных `games`
--

TRUNCATE TABLE `games`;
--
-- Дамп данных таблицы `games`
--

INSERT INTO `games` (`id`, `type`, `contractAddress`, `ownerAddress`, `finished_at`, `created_at`, `updated_at`) VALUES
                                                                                                                     (56, 'Rock-Paper-Scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-11 07:34:03', '2025-07-11 07:34:03'),
                                                                                                                     (57, 'Rock-Paper-Scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-11 07:34:19', '2025-07-11 07:34:19'),
                                                                                                                     (58, 'Rock-Paper-Scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-11 07:36:33', '2025-07-11 07:36:33'),
                                                                                                                     (59, 'Rock-Paper-Scissors', NULL, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', NULL, '2025-07-11 07:47:45', '2025-07-11 07:47:45');

-- --------------------------------------------------------

--
-- Структура таблицы `game_data`
--

CREATE TABLE `game_data` (
                             `id` int NOT NULL,
                             `game_id` int NOT NULL,
                             `bet` int NOT NULL,
                             `players_number` int NOT NULL,
                             `player_number_set` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Очистить таблицу перед добавлением данных `game_data`
--

TRUNCATE TABLE `game_data`;
--
-- Дамп данных таблицы `game_data`
--

INSERT INTO `game_data` (`id`, `game_id`, `bet`, `players_number`, `player_number_set`) VALUES
                                                                                            (33, 56, 100, 10000, 3),
                                                                                            (34, 57, 100, 222, 1),
                                                                                            (35, 58, 100, 2, 1),
                                                                                            (36, 59, 100, 22222, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `game_players`
--

CREATE TABLE `game_players` (
                                `id` int NOT NULL,
                                `game_id` int NOT NULL,
                                `wallet` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Очистить таблицу перед добавлением данных `game_players`
--

TRUNCATE TABLE `game_players`;
--
-- Дамп данных таблицы `game_players`
--

INSERT INTO `game_players` (`id`, `game_id`, `wallet`, `user_id`) VALUES
                                                                      (56, 57, '0x75AFb5a18E0B7960f11529f284c18444C8a76A86', 13),
                                                                      (57, 58, '0xEC8B785Bf287606E0B6DdE00A6B8d4849aC51c0f', 14),
                                                                      (59, 56, '0xEC8B785Bf287606E0B6DdE00A6B8d4849aC51c0f', 14),
                                                                      (60, 59, '0xEC8B785Bf287606E0B6DdE00A6B8d4849aC51c0f', 14);

-- --------------------------------------------------------

--
-- Структура таблицы `game_types`
--

CREATE TABLE `game_types` (
                              `id` int NOT NULL,
                              `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Очистить таблицу перед добавлением данных `game_types`
--

TRUNCATE TABLE `game_types`;
--
-- Дамп данных таблицы `game_types`
--

INSERT INTO `game_types` (`id`, `name`) VALUES
                                            (2, 'Dice'),
                                            (1, 'Rock-Paper-Scissors');

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

CREATE TABLE `migrations` (
                              `id` int NOT NULL,
                              `timestamp` bigint NOT NULL,
                              `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Очистить таблицу перед добавлением данных `migrations`
--

TRUNCATE TABLE `migrations`;
-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
                         `id` int NOT NULL,
                         `login` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `wallet` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `encrypted_private_key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
                         `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                         `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Очистить таблицу перед добавлением данных `users`
--

TRUNCATE TABLE `users`;
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
                                                                                                                   (14, 'kolya12', '$2b$10$wGOERwcYmKGsyATcO4cYI.pbYhZw7UWQrqLvf/3biPrnJlbUegVXu', '0xEC8B785Bf287606E0B6DdE00A6B8d4849aC51c0f', '0xe779364c1ac5298be68ac3a61c9e5f6358e3156282b70af3ef18eee204ac6a20', '2025-06-23 07:45:17.429703', '2025-06-23 07:45:17.429703'),
                                                                                                                   (16, 'alex', '$2b$10$k6npZPaRRzoMW7yVAimSoegs4V43m3hVCFes79L9/YNnxeLmQ3/SK', '0x60a8c06c73bCA5Efad8433c36a5891Bb228cccFf', '0x9b5911e062839631243ce76c6d783c59412c9d620b52a51b961d45b108d2d800', '2025-07-08 07:39:55.655821', '2025-07-08 07:39:55.655821');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `games`
--
ALTER TABLE `games`
    ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `game_data`
--
ALTER TABLE `game_data`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `game_id` (`game_id`);

--
-- Индексы таблицы `game_players`
--
ALTER TABLE `game_players`
    ADD PRIMARY KEY (`id`),
  ADD KEY `game_id` (`game_id`);

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
    MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT для таблицы `game_data`
--
ALTER TABLE `game_data`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT для таблицы `game_players`
--
ALTER TABLE `game_players`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

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
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
