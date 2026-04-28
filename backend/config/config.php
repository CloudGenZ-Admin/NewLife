<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// JWT Secret Key
define('JWT_SECRET_KEY', 'your-secret-key-change-this-in-production');
define('JWT_ALGORITHM', 'HS256');

// WooCommerce Configuration
define('WC_URL', getenv('WC_URL') ?: 'https://your-wordpress-site.com');
define('WC_CONSUMER_KEY', getenv('WC_CONSUMER_KEY') ?: '');
define('WC_CONSUMER_SECRET', getenv('WC_CONSUMER_SECRET') ?: '');

// WordPress Database Configuration (for user authentication)
define('WP_DB_HOST', getenv('WP_DB_HOST') ?: 'localhost');
define('WP_DB_NAME', getenv('WP_DB_NAME') ?: 'wordpress_db');
define('WP_DB_USER', getenv('WP_DB_USER') ?: 'root');
define('WP_DB_PASSWORD', getenv('WP_DB_PASSWORD') ?: '');
