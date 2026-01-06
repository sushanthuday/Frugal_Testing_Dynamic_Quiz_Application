<?php
/**
 * PHP Server Configuration
 * Simple router for the built-in PHP development server
 * 
 * Usage: php -S localhost:8080 server.php
 */

// Get the URL path
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Static file extensions that should be served directly
$staticExtensions = ['css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'ico', 'svg', 'woff', 'woff2', 'ttf', 'eot'];

// Check if the request is for a static file
$extension = pathinfo($uri, PATHINFO_EXTENSION);
if (in_array(strtolower($extension), $staticExtensions)) {
    return false; // Let PHP's built-in server handle static files
}

// Default to index.php for root or PHP files
if ($uri === '/' || $uri === '') {
    require __DIR__ . '/index.php';
    return true;
}

// Check if the requested file exists
$requestedFile = __DIR__ . $uri;
if (file_exists($requestedFile) && is_file($requestedFile)) {
    // If it's a PHP file, include it
    if (pathinfo($requestedFile, PATHINFO_EXTENSION) === 'php') {
        require $requestedFile;
        return true;
    }
    return false; // Let the built-in server handle other files
}

// API routing
if (strpos($uri, '/api/') === 0) {
    $apiFile = __DIR__ . $uri;
    if (!str_ends_with($apiFile, '.php')) {
        $apiFile .= '.php';
    }
    if (file_exists($apiFile)) {
        require $apiFile;
        return true;
    }
}

// 404 Not Found
http_response_code(404);
echo json_encode(['error' => 'Not Found', 'path' => $uri]);
return true;
