<?php
// CORS headers handled by index.php router

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/env.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    
    // Check if user already exists in newlife_users table
    $query = "SELECT id FROM newlife_users WHERE email = :email LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $data->email);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(["error" => "User already exists with this email."]);
        exit();
    }
    
    // Hash password using bcrypt
    require_once __DIR__ . '/../../includes/wp-password.php';
    $password_hash = wp_hash_password($data->password);
    
    $first_name = !empty($data->first_name) ? $data->first_name : '';
    $last_name = !empty($data->last_name) ? $data->last_name : '';
    
    // Insert user into newlife_users table
    $query = "INSERT INTO newlife_users (email, password, first_name, last_name, created_at) 
              VALUES (:email, :password, :first_name, :last_name, NOW())";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":password", $password_hash);
    $stmt->bindParam(":first_name", $first_name);
    $stmt->bindParam(":last_name", $last_name);
    
    if ($stmt->execute()) {
        $user_id = $db->lastInsertId();
        
        // Create customer in WooCommerce via API
        $wc_url = getenv('VITE_WC_URL');
        $consumer_key = getenv('VITE_WC_CONSUMER_KEY');
        $consumer_secret = getenv('VITE_WC_CONSUMER_SECRET');
        
        $customer_data = null;
        $woocommerce_customer_id = null;
        
        if ($consumer_key && $consumer_secret) {
            $customer_payload = [
                'email' => $data->email,
                'first_name' => $first_name,
                'last_name' => $last_name,
                'billing' => [
                    'first_name' => $first_name,
                    'last_name' => $last_name,
                    'email' => $data->email,
                ],
                'shipping' => [
                    'first_name' => $first_name,
                    'last_name' => $last_name,
                ]
            ];
            
            $api_url = $wc_url . '/wp-json/wc/v3/customers';
            
            $ch = curl_init($api_url);
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => json_encode($customer_payload),
                CURLOPT_HTTPHEADER => [
                    'Authorization: Basic ' . base64_encode($consumer_key . ':' . $consumer_secret),
                    'Content-Type: application/json',
                ],
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_SSL_VERIFYHOST => false,
                CURLOPT_TIMEOUT => 10, // 10 second timeout
                CURLOPT_CONNECTTIMEOUT => 5, // 5 second connection timeout
            ]);
            
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $curlError = curl_error($ch);
            curl_close($ch);
            
            if ($httpCode === 201) {
                $customer_data = json_decode($response, true);
                $woocommerce_customer_id = $customer_data['id'];
                
                // Update newlife_users with WooCommerce customer ID
                $update_query = "UPDATE newlife_users SET woocommerce_customer_id = :wc_id WHERE id = :user_id";
                $update_stmt = $db->prepare($update_query);
                $update_stmt->bindParam(":wc_id", $woocommerce_customer_id);
                $update_stmt->bindParam(":user_id", $user_id);
                $update_stmt->execute();
            } else {
                // Log WooCommerce API error but don't fail registration
                error_log("WooCommerce customer creation failed: HTTP $httpCode - " . ($curlError ?: $response));
            }
        }
        
        // Prepare response
        $user_response = [
            "id" => (int)$user_id,
            "email" => $data->email,
            "first_name" => $first_name,
            "last_name" => $last_name,
            "display_name" => trim($first_name . ' ' . $last_name),
            "role" => "customer"
        ];
        
        // Merge WooCommerce customer data if available
        if ($customer_data) {
            $user_response = array_merge($user_response, [
                "woocommerce_customer_id" => $woocommerce_customer_id,
                "billing" => $customer_data['billing'] ?? [],
                "shipping" => $customer_data['shipping'] ?? [],
                "avatar_url" => $customer_data['avatar_url'] ?? '',
            ]);
        }
        
        http_response_code(201);
        echo json_encode($user_response);
        
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Unable to register user."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Please provide email and password."]);
}
