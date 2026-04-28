<?php
// CORS headers handled by index.php router

// Suppress all warnings and notices to ensure clean JSON output
error_reporting(0);
ini_set('display_errors', 0);

// Start output buffering to catch any stray output
ob_start();

// Load environment variables
require_once __DIR__ . '/../../config/env.php';

// Get Stripe API key
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
    
    if (!isset($input['payment_intent_id'])) {
        throw new Exception('Missing required parameter: payment_intent_id');
    }

    $paymentIntentId = $input['payment_intent_id'];

    // Retrieve Payment Intent with expanded charges to get card details
    $ch = curl_init("https://api.stripe.com/v1/payment_intents/{$paymentIntentId}?expand[]=charges.data.payment_method_details");
    
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $stripeSecretKey,
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

    // Extract card details from latest_charge
    $cardBrand = 'UNKNOWN';
    $cardLast4 = '';
    
    // Debug: Check what we actually received
    $debugInfo = [
        'has_latest_charge' => isset($responseData['latest_charge']),
        'latest_charge_type' => gettype($responseData['latest_charge'] ?? null),
        'latest_charge_is_string' => is_string($responseData['latest_charge'] ?? null),
        'has_charges_array' => isset($responseData['charges']['data'][0]),
    ];
    
    // If latest_charge is just a string ID, we need to retrieve it separately
    if (isset($responseData['latest_charge']) && is_string($responseData['latest_charge'])) {
        // Retrieve the charge separately
        $chargeId = $responseData['latest_charge'];
        $chCharge = curl_init("https://api.stripe.com/v1/charges/{$chargeId}");
        
        curl_setopt_array($chCharge, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . $stripeSecretKey,
            ],
            CURLOPT_TIMEOUT => 10,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
        ]);
        
        $chargeResponse = curl_exec($chCharge);
        $chargeHttpCode = curl_getinfo($chCharge, CURLINFO_HTTP_CODE);
        curl_close($chCharge);
        
        if ($chargeHttpCode === 200) {
            $chargeData = json_decode($chargeResponse, true);
            if (isset($chargeData['payment_method_details']['card'])) {
                $card = $chargeData['payment_method_details']['card'];
                $cardBrand = strtoupper($card['brand'] ?? 'UNKNOWN');
                $cardLast4 = $card['last4'] ?? '';
            }
        }
    }
    // Try latest_charge as object (if expand worked)
    elseif (isset($responseData['latest_charge']['payment_method_details']['card'])) {
        $card = $responseData['latest_charge']['payment_method_details']['card'];
        $cardBrand = strtoupper($card['brand'] ?? 'UNKNOWN');
        $cardLast4 = $card['last4'] ?? '';
    }
    // Fallback to charges array
    elseif (isset($responseData['charges']['data'][0]['payment_method_details']['card'])) {
        $card = $responseData['charges']['data'][0]['payment_method_details']['card'];
        $cardBrand = strtoupper($card['brand'] ?? 'UNKNOWN');
        $cardLast4 = $card['last4'] ?? '';
    }

    // Return card details
    ob_end_clean(); // Clear any buffered output
    echo json_encode([
        'cardBrand' => $cardBrand,
        'cardLast4' => $cardLast4,
        'paymentIntentId' => $responseData['id'],
        'status' => $responseData['status'],
    ]);

} catch (Exception $e) {
    ob_end_clean(); // Clear any buffered output
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
