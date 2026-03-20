<?php
// CORS headers handled by index.php router

// Suppress all warnings and notices to ensure clean JSON output
error_reporting(0);
ini_set('display_errors', 0);

// Start output buffering to catch any stray output
ob_start();

// Load environment variables
require_once __DIR__ . '/../../config/env.php';

// Get Stripe API key (try both variable names)
$stripeSecretKey = getenv('STRIPE_SECRET_KEY') ?: getenv('VITE_STRIPE_SECRET_KEY');
if (!$stripeSecretKey) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Stripe API key not configured. Please check backend/.env file.'
    ]);
    exit();
}

try {
    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['amount']) || !isset($input['currency'])) {
        throw new Exception('Missing required parameters: amount and currency');
    }

    $amount = (int)$input['amount']; // Amount in cents
    $currency = $input['currency'] ?: 'usd';
    $orderId = $input['order_id'] ?? null;
    $customerEmail = $input['customer_email'] ?? null;

    // Prepare Payment Intent data for Stripe API
    // Note: Stripe API expects nested arrays in a specific format
    $paymentIntentData = [
        'amount' => $amount,
        'currency' => $currency,
        'automatic_payment_methods[enabled]' => 'true', // Stripe expects string 'true', not boolean
        'metadata[order_id]' => $orderId,
        'metadata[integration]' => 'newlife_woocommerce',
    ];

    // Add customer email if provided
    if ($customerEmail) {
        $paymentIntentData['receipt_email'] = $customerEmail;
    }

    // Add description
    if ($orderId) {
        $paymentIntentData['description'] = "Order #$orderId - NewLife Project";
    }

    // Call Stripe API using cURL (no library needed!)
    $ch = curl_init('https://api.stripe.com/v1/payment_intents');
    
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($paymentIntentData),
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $stripeSecretKey,
            'Content-Type: application/x-www-form-urlencoded',
        ],
        // Fix for Windows SSL certificate issue
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($curlError) {
        throw new Exception('cURL error: ' . $curlError);
    }

    $responseData = json_decode($response, true);

    if ($httpCode !== 200) {
        $errorMessage = $responseData['error']['message'] ?? 'Unknown Stripe error';
        throw new Exception($errorMessage);
    }

    // Return client secret
    ob_end_clean(); // Clear any buffered output
    echo json_encode([
        'clientSecret' => $responseData['client_secret'],
        'paymentIntentId' => $responseData['id'],
    ]);

} catch (Exception $e) {
    ob_end_clean(); // Clear any buffered output
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
