-- ============================================
-- NewLife Custom Users Table
-- ============================================
-- This table is separate from WordPress wp_users
-- Use this for your custom authentication system
-- ============================================

CREATE TABLE IF NOT EXISTS `newlife_users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `woocommerce_customer_id` bigint(20) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` varchar(20) NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `woocommerce_customer_id` (`woocommerce_customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- HOW TO RUN THIS SQL:
-- ============================================
-- 1. Login to Hostinger control panel
-- 2. Go to: Websites → Manage → Database → Enter phpMyAdmin
-- 3. Select database: u930449354_b4BRK20
-- 4. Click "SQL" tab at the top
-- 5. Copy and paste this entire file
-- 6. Click "Go" button
-- ============================================
