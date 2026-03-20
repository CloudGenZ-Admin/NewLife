<?php
// CORS headers handled by index.php router

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/env.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    
    // Query newlife_users table
    $query = "SELECT id, email, password, first_name, last_name, woocommerce_customer_id FROM newlife_users WHERE email = :email LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $data->email);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Check password using bcrypt
        require_once __DIR__ . '/../../includes/wp-password.php';
        
        if (wp_check_password($data->password, $row['password'])) {
            
            // Return minimal user data with woocommerce_customer_id
            // Frontend will fetch full customer data from WooCommerce API
            $user_response = [
                "id" => (int)$row['id'],
                "email" => $row['email'],
                "first_name" => $row['first_name'],
                "last_name" => $row['last_name'],
                "display_name" => trim($row['first_name'] . ' ' . $row['last_name']),
                "woocommerce_customer_id" => (int)$row['woocommerce_customer_id'],
                "role" => "customer"
            ];
            
            http_response_code(200);
            echo json_encode($user_response);
            
        } else {
            http_response_code(401);
            echo json_encode(["error" => "Invalid password."]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["error" => "User not found."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Please provide email and password."]);
}
