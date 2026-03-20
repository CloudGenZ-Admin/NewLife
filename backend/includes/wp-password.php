<?php
/**
 * WordPress Password Hashing Functions
 * Simplified version using bcrypt (WordPress 5.5+ compatible)
 */

if (!function_exists('wp_hash_password')) {
    function wp_hash_password($password) {
        // Use bcrypt for new passwords (WordPress 5.5+)
        return password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);
    }
}

if (!function_exists('wp_check_password')) {
    function wp_check_password($password, $hash) {
        // Check bcrypt hash (WordPress 5.5+)
        return password_verify($password, $hash);
    }
}

