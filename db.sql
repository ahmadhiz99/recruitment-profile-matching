-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table db_profile_matching.aspects
CREATE TABLE IF NOT EXISTS `aspects` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `percentage` int(11) DEFAULT NULL,
  `problem_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `aspects_problem_id_foreign` (`problem_id`),
  CONSTRAINT `aspects_problem_id_foreign` FOREIGN KEY (`problem_id`) REFERENCES `problems` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_profile_matching.aspects: ~2 rows (approximately)
INSERT INTO `aspects` (`id`, `name`, `percentage`, `problem_id`, `created_at`, `updated_at`) VALUES
	(1, 'Kecerdasan', 75, 1, '2024-08-08 08:50:08', NULL),
	(2, 'Target Kerja', 25, 1, '2024-08-08 08:50:08', NULL);

-- Dumping structure for table db_profile_matching.criterias
CREATE TABLE IF NOT EXISTS `criterias` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `criteria` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `factor` varchar(255) NOT NULL,
  `value` int(11) NOT NULL,
  `aspect_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `criterias_aspect_id_foreign` (`aspect_id`),
  CONSTRAINT `criterias_aspect_id_foreign` FOREIGN KEY (`aspect_id`) REFERENCES `aspects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_profile_matching.criterias: ~10 rows (approximately)
INSERT INTO `criterias` (`id`, `criteria`, `code`, `factor`, `value`, `aspect_id`, `created_at`, `updated_at`) VALUES
	(1, 'Penguasaan Pemasaran', 'A1', 'CF', 3, 1, '2024-08-08 08:50:08', NULL),
	(2, 'Penguasaan Area', 'A2', 'CF', 4, 1, '2024-08-08 08:50:08', NULL),
	(3, 'Kreatif', 'A3', 'CF', 3, 1, '2024-08-08 08:50:08', NULL),
	(4, 'Komitmen', 'A4', 'SF', 4, 1, '2024-08-08 08:50:08', NULL),
	(5, 'Inovatif', 'A5', 'SF', 3, 1, '2024-08-08 08:50:08', NULL),
	(6, 'Jujur', 'A6', 'CF', 3, 2, '2024-08-08 08:50:08', NULL),
	(7, 'Bertanggung Jawab', 'A7', 'CF', 2, 2, '2024-08-08 08:50:08', NULL),
	(8, 'Disiplin', 'A8', 'CF', 4, 2, '2024-08-08 08:50:08', NULL),
	(9, 'Bekerjasama Tim', 'A9', 'SF', 3, 2, '2024-08-08 08:50:08', NULL),
	(10, 'Percaya Diri', 'A10', 'SF', 3, 2, '2024-08-08 08:50:08', NULL);

-- Dumping structure for table db_profile_matching.differences
CREATE TABLE IF NOT EXISTS `differences` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `difference` int(11) NOT NULL,
  `value` double(8,2) NOT NULL,
  `description` longtext DEFAULT NULL,
  `problem_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `differences_problem_id_foreign` (`problem_id`),
  CONSTRAINT `differences_problem_id_foreign` FOREIGN KEY (`problem_id`) REFERENCES `problems` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_profile_matching.differences: ~9 rows (approximately)
INSERT INTO `differences` (`id`, `difference`, `value`, `description`, `problem_id`, `created_at`, `updated_at`) VALUES
	(1, 0, 5.00, 'Tidak Ada Selisih (kompetensi sesuai dengna yang dibutuhkan)', 1, '2024-08-08 08:50:08', NULL),
	(2, 1, 4.50, 'Kompetensi individu kelebihan 1 tingkat/level', 1, '2024-08-08 08:50:08', NULL),
	(3, -1, 4.00, 'Kompetensi individu kekurangan 1 tingkat/level', 1, '2024-08-08 08:50:08', NULL),
	(4, 2, 3.50, 'Kompetensi individu kelebihan 2 tingkat/level', 1, '2024-08-08 08:50:08', NULL),
	(5, -2, 3.00, 'Kompetensi individu kekurangan 2 tingkat/level', 1, '2024-08-08 08:50:08', NULL),
	(6, 3, 2.50, 'Kompetensi individu kelebihan 3 tingkat/level', 1, '2024-08-08 08:50:08', NULL),
	(7, -3, 2.00, 'Kompetensi individu kekurangan 3 tingkat/level', 1, '2024-08-08 08:50:08', NULL),
	(8, 4, 1.50, 'Kompetensi individu kelebihan 4 tingkat/level', 1, '2024-08-08 08:50:08', NULL),
	(9, -4, 1.00, 'Kompetensi individu kekurangan 4 tingkat/level', 1, '2024-08-08 08:50:08', NULL);

-- Dumping structure for table db_profile_matching.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_profile_matching.failed_jobs: ~0 rows (approximately)

-- Dumping structure for table db_profile_matching.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_profile_matching.migrations: ~14 rows (approximately)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2014_10_12_100000_create_password_reset_tokens_table', 1),
	(2, '2019_08_19_000000_create_failed_jobs_table', 1),
	(3, '2019_12_14_000001_create_personal_access_tokens_table', 1),
	(4, '2024_03_24_132416_create_roles_table', 1),
	(5, '2024_03_24_132544_create_users_table', 2),
	(6, '2024_03_24_133734_create_problems_table', 2),
	(7, '2024_03_24_141148_create_scales_table', 2),
	(8, '2024_03_24_141804_create_aspects_table', 2),
	(9, '2024_03_25_132417_create_criterias_table', 2),
	(10, '2024_03_25_134004_create_differences_table', 2),
	(11, '2024_04_09_132247_create_participants_table', 2),
	(12, '2024_05_04_135157_create_participant_criterias_table', 2),
	(13, '2024_05_13_125032_create_participant_factors_table', 2),
	(14, '2024_05_13_144257_create_participant_totals_table', 2);

-- Dumping structure for table db_profile_matching.participants
CREATE TABLE IF NOT EXISTS `participants` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `problem_id` bigint(20) unsigned NOT NULL,
  `final` double(8,2) DEFAULT NULL,
  `qualified_status` varchar(255) DEFAULT NULL,
  `final_qualified` double(8,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `participants_user_id_foreign` (`user_id`),
  KEY `participants_problem_id_foreign` (`problem_id`),
  CONSTRAINT `participants_problem_id_foreign` FOREIGN KEY (`problem_id`) REFERENCES `problems` (`id`) ON DELETE CASCADE,
  CONSTRAINT `participants_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_profile_matching.participants: ~3 rows (approximately)
INSERT INTO `participants` (`id`, `user_id`, `problem_id`, `final`, `qualified_status`, `final_qualified`, `created_at`, `updated_at`) VALUES
	(2, 4, 1, 4.53, '1', 13.57, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(3, 5, 1, 4.20, NULL, 12.60, '2024-08-08 08:50:08', '2024-08-08 09:26:35');

-- Dumping structure for table db_profile_matching.participant_criterias
CREATE TABLE IF NOT EXISTS `participant_criterias` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `participant_id` bigint(20) unsigned NOT NULL,
  `criteria_id` bigint(20) unsigned NOT NULL,
  `value` int(11) NOT NULL,
  `gap` int(11) DEFAULT NULL,
  `bobot` double(8,2) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `participant_criterias_participant_id_foreign` (`participant_id`),
  KEY `participant_criterias_criteria_id_foreign` (`criteria_id`),
  CONSTRAINT `participant_criterias_criteria_id_foreign` FOREIGN KEY (`criteria_id`) REFERENCES `criterias` (`id`) ON DELETE CASCADE,
  CONSTRAINT `participant_criterias_participant_id_foreign` FOREIGN KEY (`participant_id`) REFERENCES `participants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_profile_matching.participant_criterias: ~30 rows (approximately)
INSERT INTO `participant_criterias` (`id`, `participant_id`, `criteria_id`, `value`, `gap`, `bobot`, `note`, `created_at`, `updated_at`) VALUES
	(11, 2, 1, 3, 0, 5.00, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(12, 2, 2, 4, 1, 4.50, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(13, 2, 3, 3, 0, 5.00, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(14, 2, 4, 5, 2, 3.50, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(15, 2, 5, 3, 0, 5.00, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(16, 2, 6, 4, 1, 4.50, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(17, 2, 7, 3, 0, 5.00, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(18, 2, 8, 5, 2, 3.50, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(19, 2, 9, 5, 2, 3.50, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(20, 2, 10, 3, 0, 5.00, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(21, 3, 1, 4, 1, 4.50, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(22, 3, 2, 4, 1, 4.50, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(23, 3, 3, 2, -1, 4.00, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(24, 3, 4, 4, 1, 4.50, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(25, 3, 5, 5, 2, 3.50, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(26, 3, 6, 4, 1, 4.50, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(27, 3, 7, 3, 0, 5.00, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(28, 3, 8, 4, 1, 4.50, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(29, 3, 9, 5, 2, 3.50, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35'),
	(30, 3, 10, 5, 2, 3.50, NULL, '2024-08-08 08:50:08', '2024-08-08 09:26:35');

-- Dumping structure for table db_profile_matching.participant_factors
CREATE TABLE IF NOT EXISTS `participant_factors` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `participant_id` bigint(20) unsigned NOT NULL,
  `aspect_id` bigint(20) unsigned NOT NULL,
  `core_factor` double(8,2) NOT NULL,
  `secondary_factor` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `participant_factors_participant_id_foreign` (`participant_id`),
  KEY `participant_factors_aspect_id_foreign` (`aspect_id`),
  CONSTRAINT `participant_factors_aspect_id_foreign` FOREIGN KEY (`aspect_id`) REFERENCES `aspects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `participant_factors_participant_id_foreign` FOREIGN KEY (`participant_id`) REFERENCES `participants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_profile_matching.participant_factors: ~12 rows (approximately)
INSERT INTO `participant_factors` (`id`, `participant_id`, `aspect_id`, `core_factor`, `secondary_factor`, `created_at`, `updated_at`) VALUES
	(3, 2, 1, 4.83, 4.25, '2024-08-08 09:26:02', '2024-08-08 09:26:02'),
	(4, 2, 2, 4.33, 4.25, '2024-08-08 09:26:02', '2024-08-08 09:26:02'),
	(5, 3, 1, 4.33, 4.00, '2024-08-08 09:26:02', '2024-08-08 09:26:02'),
	(6, 3, 2, 4.67, 3.50, '2024-08-08 09:26:02', '2024-08-08 09:26:02'),
	(9, 2, 1, 4.83, 4.25, '2024-08-08 09:26:35', '2024-08-08 09:26:35'),
	(10, 2, 2, 4.33, 4.25, '2024-08-08 09:26:35', '2024-08-08 09:26:35'),
	(11, 3, 1, 4.33, 4.00, '2024-08-08 09:26:35', '2024-08-08 09:26:35'),
	(12, 3, 2, 4.67, 3.50, '2024-08-08 09:26:35', '2024-08-08 09:26:35');

-- Dumping structure for table db_profile_matching.participant_totals
CREATE TABLE IF NOT EXISTS `participant_totals` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `participant_id` bigint(20) unsigned NOT NULL,
  `aspect_id` bigint(20) unsigned NOT NULL,
  `total` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `participant_totals_participant_id_foreign` (`participant_id`),
  KEY `participant_totals_aspect_id_foreign` (`aspect_id`),
  CONSTRAINT `participant_totals_aspect_id_foreign` FOREIGN KEY (`aspect_id`) REFERENCES `aspects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `participant_totals_participant_id_foreign` FOREIGN KEY (`participant_id`) REFERENCES `participants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_profile_matching.participant_totals: ~18 rows (approximately)
INSERT INTO `participant_totals` (`id`, `participant_id`, `aspect_id`, `total`, `created_at`, `updated_at`) VALUES
	(3, 2, 1, 4.60, '2024-08-08 09:26:02', '2024-08-08 09:26:02'),
	(4, 2, 2, 4.30, '2024-08-08 09:26:02', '2024-08-08 09:26:02'),
	(5, 3, 1, 4.20, '2024-08-08 09:26:02', '2024-08-08 09:26:02'),
	(6, 3, 2, 4.20, '2024-08-08 09:26:02', '2024-08-08 09:26:02'),
	(11, 2, 1, 4.60, '2024-08-08 09:26:35', '2024-08-08 09:26:35'),
	(12, 2, 1, 4.60, '2024-08-08 09:26:35', '2024-08-08 09:26:35'),
	(13, 2, 2, 4.30, '2024-08-08 09:26:35', '2024-08-08 09:26:35'),
	(14, 2, 2, 4.30, '2024-08-08 09:26:35', '2024-08-08 09:26:35'),
	(15, 3, 1, 4.20, '2024-08-08 09:26:35', '2024-08-08 09:26:35'),
	(16, 3, 1, 4.20, '2024-08-08 09:26:35', '2024-08-08 09:26:35'),
	(17, 3, 2, 4.20, '2024-08-08 09:26:35', '2024-08-08 09:26:35'),
	(18, 3, 2, 4.20, '2024-08-08 09:26:35', '2024-08-08 09:26:35');

-- Dumping structure for table db_profile_matching.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_profile_matching.password_reset_tokens: ~0 rows (approximately)

-- Dumping structure for table db_profile_matching.personal_access_tokens
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_profile_matching.personal_access_tokens: ~0 rows (approximately)

-- Dumping structure for table db_profile_matching.problems
CREATE TABLE IF NOT EXISTS `problems` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `core_factor` int(11) NOT NULL,
  `secondary_factor` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_profile_matching.problems: ~2 rows (approximately)
INSERT INTO `problems` (`id`, `title`, `description`, `status`, `created_by`, `core_factor`, `secondary_factor`, `created_at`, `updated_at`) VALUES
	(1, 'Seleksi Calon karyawan Programmer', 'Ini adalah proses perhitungan seleksi otomatis menggunakan sistem pendukung keputusan dengan metode profile matching', 'open', 'Super Admin', 60, 40, '2024-08-08 08:50:08', NULL),
	(2, 'Seleksi Calon karyawan IT Supervisor', 'Ini adalah proses perhitungan seleksi otomatis menggunakan sistem pendukung keputusan dengan metode profile matching', 'pending', 'Akbar Staff', 60, 40, '2024-08-08 08:50:08', NULL);

-- Dumping structure for table db_profile_matching.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `level` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_profile_matching.roles: ~3 rows (approximately)
INSERT INTO `roles` (`id`, `name`, `level`, `created_at`, `updated_at`) VALUES
	(1, 'admin', 1, '2024-08-08 08:50:07', NULL),
	(2, 'staff', 2, '2024-08-08 08:50:07', NULL),
	(3, 'user', 3, '2024-08-08 08:50:07', NULL);

-- Dumping structure for table db_profile_matching.scales
CREATE TABLE IF NOT EXISTS `scales` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `value` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_profile_matching.scales: ~5 rows (approximately)
INSERT INTO `scales` (`id`, `title`, `value`, `created_at`, `updated_at`) VALUES
	(1, 'Sangat Kurang', 1, '2024-08-08 08:50:08', NULL),
	(2, 'Kurang', 2, '2024-08-08 08:50:08', NULL),
	(3, 'Cukup', 3, '2024-08-08 08:50:08', NULL),
	(4, 'Baik', 4, '2024-08-08 08:50:08', NULL),
	(5, 'Sangat baik', 5, '2024-08-08 08:50:08', NULL);

-- Dumping structure for table db_profile_matching.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `whatsapp` varchar(255) DEFAULT NULL,
  `cv` text DEFAULT NULL,
  `ijazah` text DEFAULT NULL,
  `portofolio` text DEFAULT NULL,
  `qualified` int(11) NOT NULL DEFAULT 0,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_role_id_foreign` (`role_id`),
  CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_profile_matching.users: ~5 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `fullname`, `nickname`, `phone`, `address`, `whatsapp`, `cv`, `ijazah`, `portofolio`, `qualified`, `password`, `remember_token`, `role_id`, `created_at`, `updated_at`) VALUES
	(1, 'Super Admin', 'admin@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '$2y$12$7OwzDC7sBX3BxeeR0OiE7O0DcmjJdM2I7CgY0DYxjPlbCUQUbOIji', NULL, 1, '2024-08-08 08:50:07', NULL),
	(2, 'Akbar Staff', 'staff@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '$2y$12$uw/EUDtGZ.Vx6FXn9EvvU.oif.RhBdkUJaWEBnPhf4sQbLXcBP1ku', NULL, 2, '2024-08-08 08:50:07', NULL),
	(4, 'Siti', 'siti@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '$2y$12$o6PP0etVIQtq6zmveTUUduhLj.m94mfB8/xQfP86oJlru5sEOOhDm', NULL, 3, '2024-08-08 08:50:08', '2024-08-08 09:26:15'),
	(5, 'Putri', 'putri@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '$2y$12$OkI2yXhPAaKuI9QhBFFvpOZkO6hJuhvYPs/pkXvxWB16viCqIfhDi', NULL, 3, '2024-08-08 08:50:08', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
