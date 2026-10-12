<?php
// CORS Headers for API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database Configuration
// Choose driver: 'sqlite' or 'mysql'
define('DB_DRIVER', 'sqlite'); // Set to 'mysql' for cPanel MySQL / phpMyAdmin

// MySQL Credentials (if DB_DRIVER is set to 'mysql')
define('DB_HOST', 'localhost');
define('DB_NAME', 'crew5_db');
define('DB_USER', 'root');
define('DB_PASS', '');

// SQLite File Location
define('SQLITE_FILE', __DIR__ . '/data/database.sqlite');

function getDB() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    try {
        if (DB_DRIVER === 'sqlite') {
            $dir = dirname(SQLITE_FILE);
            if (!file_exists($dir)) {
                mkdir($dir, 0777, true);
            }
            $isNew = !file_exists(SQLITE_FILE);
            $pdo = new PDO("sqlite:" . SQLITE_FILE);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

            if ($isNew) {
                initDatabase($pdo);
            }
        } else {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $pdo = new PDO($dsn, DB_USER, DB_PASS);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        }
    } catch (PDOException $e) {
        sendJson(["success" => false, "message" => "Database connection error: " . $e->getMessage()], 500);
    }

    return $pdo;
}

function initDatabase($pdo) {
    $schemaFile = __DIR__ . '/schema.sql';
    if (file_exists($schemaFile)) {
        $sql = file_get_contents($schemaFile);
        $pdo->exec($sql);
    }
}

function sendJson($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

function getJsonInput() {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?: [];
}

function getAuthHeader() {
    $headers = function_exists('getallheaders') ? getallheaders() : [];
    return $headers['Authorization'] ?? $headers['authorization'] ?? '';
}
