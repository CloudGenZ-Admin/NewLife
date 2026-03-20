<?php
// Database connection test endpoint
require_once dirname(__DIR__) . '/config/database.php';
require_once dirname(__DIR__) . '/config/env.php';

$response = [
    'timestamp' => date('Y-m-d H:i:s'),
    'env_loaded' => false,
    'db_connection' => false,
    'table_exists' => false,
    'credentials' => [],
    'error' => null
];

try {
    // Check if env variables are loaded
    $dbHost = getenv('WP_DB_HOST');
    $dbName = getenv('WP_DB_NAME');
    $dbUser = getenv('WP_DB_USER');
    $dbPass = getenv('WP_DB_PASSWORD');
    
    $response['env_loaded'] = !empty($dbHost) && !empty($dbName) && !empty($dbUser);
    $response['credentials'] = [
        'host' => $dbHost ?: 'NOT SET',
        'database' => $dbName ?: 'NOT SET',
        'user' => $dbUser ?: 'NOT SET',
        'password' => $dbPass ? '***' . substr($dbPass, -3) : 'NOT SET'
    ];
    
    if (!$response['env_loaded']) {
        throw new Exception('Environment variables not loaded properly');
    }
    
    // Try database connection
    $database = new Database();
    $db = $database->getConnection();
    $response['db_connection'] = true;
    
    // Check if newlife_users table exists
    $query = "SHOW TABLES LIKE 'newlife_users'";
    $stmt = $db->query($query);
    $response['table_exists'] = $stmt->rowCount() > 0;
    
    if ($response['table_exists']) {
        // Count users in table
        $countQuery = "SELECT COUNT(*) as total FROM newlife_users";
        $countStmt = $db->query($countQuery);
        $count = $countStmt->fetch(PDO::FETCH_ASSOC);
        $response['users_count'] = (int)$count['total'];
    }
    
    $response['status'] = 'success';
    $response['message'] = 'Database connection successful!';
    
} catch (Exception $e) {
    $response['status'] = 'error';
    $response['error'] = $e->getMessage();
}

echo json_encode($response, JSON_PRETTY_PRINT);
