<?php
// ═══════════════════════════════════════════════════════════════
// Backend API Router - Single Entry Point
// ═══════════════════════════════════════════════════════════════

// Set CORS headers globally
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the request URI and remove query string
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove /api prefix if present
$request_uri = preg_replace('#^/api#', '', $request_uri);

// Define routes mapping - easy to maintain and scale
$routes = [
    '/test' => '/api/test.php',
    '/auth/register' => '/api/auth/register.php',
    '/auth/login' => '/api/auth/login.php',
    '/auth/sync-customer' => '/api/auth/sync-customer.php',
    '/auth/get-user' => '/api/auth/get-user.php',
    '/auth/update-profile' => '/api/auth/update-profile.php',
    '/stripe/create-payment-intent' => '/api/stripe/create-payment-intent.php',
    '/stripe/get-payment-details' => '/api/stripe/get-payment-details.php',
];

// Check if route exists
if (isset($routes[$request_uri])) {
    $file = __DIR__ . $routes[$request_uri];
    if (file_exists($file)) {
        require $file;
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Route file not found', 'file' => $routes[$request_uri]]);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found', 'path' => $request_uri]);
}
