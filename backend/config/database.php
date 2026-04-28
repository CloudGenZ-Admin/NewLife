<?php
// Load environment variables
require_once __DIR__ . '/env.php';

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $charset = 'utf8mb4';
    public $conn;

    public function __construct() {
        // Get WordPress database credentials from environment or use defaults
        $this->host = getenv('WP_DB_HOST') ?: 'localhost';
        $this->db_name = getenv('WP_DB_NAME') ?: 'wordpress_db';
        $this->username = getenv('WP_DB_USER') ?: 'root';
        $this->password = getenv('WP_DB_PASSWORD') ?: '';
    }

    public function getConnection() {
        $this->conn = null;
        
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=" . $this->charset;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_TIMEOUT => 5, // 5 second timeout
                PDO::ATTR_EMULATE_PREPARES => false
            ];
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
        } catch(PDOException $exception) {
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode([
                "error" => "Database connection failed: " . $exception->getMessage()
            ]);
            exit();
        }
        
        return $this->conn;
    }
}
