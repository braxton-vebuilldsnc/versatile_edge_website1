<?php
declare(strict_types=1);

const VE_PHONE = '888-381-1033';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, string $code, string $message): never
{
    http_response_code($status);
    echo json_encode(['code' => $code, 'message' => $message], JSON_UNESCAPED_SLASHES);
    exit;
}

function config_value(array $config, string $key, mixed $default = null): mixed
{
    return array_key_exists($key, $config) ? $config[$key] : $default;
}

function field(string $name, int $maxLength = 500): string
{
    $value = $_POST[$name] ?? '';
    if (!is_string($value)) {
        return '';
    }
    $value = trim(str_replace(["\0", "\r"], '', $value));
    return function_exists('mb_substr')
        ? mb_substr($value, 0, $maxLength, 'UTF-8')
        : substr($value, 0, $maxLength);
}

function html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function header_text(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

function encoded_header(string $value): string
{
    return '=?UTF-8?B?' . base64_encode(header_text($value)) . '?=';
}

function client_ip(): string
{
    // Do not trust client-supplied forwarding headers on ordinary shared hosting.
    return filter_var($_SERVER['REMOTE_ADDR'] ?? '', FILTER_VALIDATE_IP) ?: 'unknown';
}

function enforce_rate_limit(array $config, string $ip): void
{
    $limit = max(1, (int) config_value($config, 'rate_limit_attempts', 5));
    $window = max(60, (int) config_value($config, 'rate_limit_window_seconds', 900));
    $directory = (string) config_value(
        $config,
        'rate_limit_directory',
        rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'versatile-edge-rate-limits'
    );

    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) {
        error_log('Versatile Edge inquiry: rate-limit directory is unavailable.');
        return;
    }

    $file = $directory . DIRECTORY_SEPARATOR . hash('sha256', $ip) . '.json';
    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        error_log('Versatile Edge inquiry: rate-limit file could not be opened.');
        return;
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            return;
        }
        $contents = stream_get_contents($handle);
        $attempts = json_decode($contents ?: '[]', true);
        $attempts = is_array($attempts) ? $attempts : [];
        $cutoff = time() - $window;
        $attempts = array_values(array_filter($attempts, static fn ($time): bool => is_int($time) && $time >= $cutoff));
        if (count($attempts) >= $limit) {
            respond(429, 'rate_limited', 'Too many requests. Please wait or call ' . VE_PHONE . '.');
        }
        $attempts[] = time();
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($attempts));
        fflush($handle);
        flock($handle, LOCK_UN);
    } finally {
        fclose($handle);
    }
}

function http_post_form(string $url, array $fields): array
{
    $body = http_build_query($fields, '', '&', PHP_QUERY_RFC3986);
    if (function_exists('curl_init')) {
        $curl = curl_init($url);
        curl_setopt_array($curl, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $body,
            CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 8,
            CURLOPT_TIMEOUT => 15,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
        ]);
        $response = curl_exec($curl);
        $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
        $error = curl_error($curl);
        curl_close($curl);
        if ($response === false || $status < 200 || $status >= 300) {
            throw new RuntimeException('Turnstile request failed: ' . $error);
        }
    } else {
        $context = stream_context_create(['http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $body,
            'timeout' => 15,
            'ignore_errors' => true,
        ]]);
        $response = @file_get_contents($url, false, $context);
        if ($response === false) {
            throw new RuntimeException('Turnstile request failed.');
        }
    }

    $decoded = json_decode($response, true);
    if (!is_array($decoded)) {
        throw new RuntimeException('Turnstile returned an invalid response.');
    }
    return $decoded;
}

function verify_turnstile(array $config, string $ip): void
{
    $secret = (string) config_value($config, 'turnstile_secret', '');
    if ($secret === '') {
        throw new RuntimeException('Turnstile is not configured.');
    }
    $token = field('cf-turnstile-response', 4096);
    if ($token === '') {
        respond(400, 'turnstile_required', 'Please complete the anti-spam check.');
    }

    $result = http_post_form('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
        'secret' => $secret,
        'response' => $token,
        'remoteip' => $ip,
    ]);
    if (($result['success'] ?? false) !== true) {
        respond(400, 'turnstile_failed', 'The anti-spam check could not be verified. Please try again.');
    }

    $allowedHosts = config_value($config, 'turnstile_allowed_hostnames', []);
    if (is_array($allowedHosts) && $allowedHosts !== []) {
        $hostname = strtolower((string) ($result['hostname'] ?? ''));
        $allowedHosts = array_map(static fn ($host): string => strtolower((string) $host), $allowedHosts);
        if (!in_array($hostname, $allowedHosts, true)) {
            throw new RuntimeException('Turnstile hostname did not match the configured site.');
        }
    }
}

function normalized_uploads(): array
{
    if (!isset($_FILES['files'])) {
        return [];
    }
    $files = $_FILES['files'];
    $names = is_array($files['name']) ? $files['name'] : [$files['name']];
    $temporaryNames = is_array($files['tmp_name']) ? $files['tmp_name'] : [$files['tmp_name']];
    $errors = is_array($files['error']) ? $files['error'] : [$files['error']];
    $sizes = is_array($files['size']) ? $files['size'] : [$files['size']];
    $uploads = [];
    foreach ($names as $index => $name) {
        $uploads[] = [
            'name' => (string) $name,
            'tmp_name' => (string) ($temporaryNames[$index] ?? ''),
            'error' => (int) ($errors[$index] ?? UPLOAD_ERR_NO_FILE),
            'size' => (int) ($sizes[$index] ?? 0),
        ];
    }
    return $uploads;
}

function validate_uploads(array $config): array
{
    $uploads = array_values(array_filter(
        normalized_uploads(),
        static fn (array $file): bool => $file['error'] !== UPLOAD_ERR_NO_FILE
    ));
    $maxFiles = max(0, (int) config_value($config, 'max_files', 5));
    $maxBytes = max(1024, (int) config_value($config, 'max_file_bytes', 10 * 1024 * 1024));
    $maxTotal = max($maxBytes, (int) config_value($config, 'max_total_attachment_bytes', 25 * 1024 * 1024));

    if (count($uploads) > $maxFiles) {
        respond(400, 'too_many_files', "Please upload no more than {$maxFiles} files.");
    }

    $allowed = [
        'image/jpeg' => ['jpg', 'jpeg'],
        'image/png' => ['png'],
        'image/webp' => ['webp'],
        'image/heic' => ['heic'],
        'image/heif' => ['heic', 'heif'],
        'image/heic-sequence' => ['heic'],
        'image/heif-sequence' => ['heic', 'heif'],
        'application/pdf' => ['pdf'],
    ];
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $validated = [];
    $total = 0;

    foreach ($uploads as $index => $file) {
        if ($file['error'] === UPLOAD_ERR_INI_SIZE || $file['error'] === UPLOAD_ERR_FORM_SIZE) {
            respond(400, 'file_too_large', 'One attachment exceeds the server upload limit.');
        }
        if ($file['error'] !== UPLOAD_ERR_OK) {
            respond(400, 'upload_failed', 'One attachment could not be uploaded. Please try again.');
        }
        if ($file['size'] <= 0 || $file['size'] > $maxBytes) {
            respond(400, 'file_too_large', 'Each attachment must be 10 MB or smaller.');
        }
        if (!is_uploaded_file($file['tmp_name'])) {
            throw new RuntimeException('An upload did not originate from PHP.');
        }

        $mime = (string) $finfo->file($file['tmp_name']);
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!isset($allowed[$mime]) || !in_array($extension, $allowed[$mime], true)) {
            respond(400, 'unsupported_file', 'One selected file is not a supported JPEG, PNG, WebP, HEIC, HEIF, or PDF.');
        }

        $safeBase = preg_replace('/[^A-Za-z0-9._-]+/', '-', pathinfo(basename($file['name']), PATHINFO_FILENAME));
        $safeBase = trim((string) $safeBase, '.-_');
        $safeBase = $safeBase !== '' ? substr($safeBase, 0, 70) : 'project-file';
        $total += $file['size'];
        if ($total > $maxTotal) {
            respond(400, 'attachments_too_large', 'The combined attachments are too large. Please upload fewer files.');
        }
        $validated[] = [
            'path' => $file['tmp_name'],
            'name' => sprintf('%02d-%s.%s', $index + 1, $safeBase, $extension),
            'mime' => $mime,
        ];
    }
    return $validated;
}

function smtp_read($socket): array
{
    $lines = [];
    while (($line = fgets($socket, 8192)) !== false) {
        $lines[] = rtrim($line, "\r\n");
        if (strlen($line) < 4 || $line[3] === ' ') {
            break;
        }
    }
    $code = isset($lines[0]) ? (int) substr($lines[0], 0, 3) : 0;
    return [$code, implode("\n", $lines)];
}

function smtp_expect($socket, array $expected): void
{
    [$code, $message] = smtp_read($socket);
    if (!in_array($code, $expected, true)) {
        throw new RuntimeException("SMTP rejected a command ({$code}): {$message}");
    }
}

function smtp_command($socket, string $command, array $expected): void
{
    if (fwrite($socket, $command . "\r\n") === false) {
        throw new RuntimeException('Could not write to the SMTP connection.');
    }
    smtp_expect($socket, $expected);
}

function build_email(array $config, array $fields, array $attachments): array
{
    $address = sprintf('%s, %s, %s %s', $fields['street'], $fields['city'], strtoupper($fields['state']), $fields['zip']);
    $mapLink = 'https://www.google.com/maps/search/?api=1&query=' . rawurlencode($address);
    $rows = [
        'Project' => $fields['projectType'],
        'Timeline' => $fields['timeline'],
        'Budget' => $fields['budget'],
        'Name' => $fields['firstName'] . ' ' . $fields['lastName'],
        'Email' => $fields['email'],
        'Phone' => $fields['phone'],
        'Property' => $address,
        'Referral' => $fields['referral'],
        'Description' => $fields['description'],
    ];
    $htmlRows = '';
    $plainRows = '';
    foreach ($rows as $label => $value) {
        $htmlRows .= '<p><strong>' . html($label) . ':</strong><br>' . nl2br(html($value)) . '</p>';
        $plainRows .= $label . ":\n" . $value . "\n\n";
    }
    $htmlBody = '<div style="font-family:Arial,sans-serif;color:#15202e;max-width:680px">'
        . '<div style="background:#0b213d;color:white;padding:26px"><h1 style="margin:0;font-size:24px">New Versatile Edge project inquiry</h1></div>'
        . '<div style="padding:24px;border:1px solid #d5dadd">' . $htmlRows
        . '<p><a style="display:inline-block;background:#f1b544;color:#0b213d;padding:12px 16px;font-weight:bold;text-decoration:none" href="' . html($mapLink) . '">Review property on Google Maps</a></p>'
        . (count($attachments) > 0 ? '<p><strong>Attachments:</strong> ' . count($attachments) . ' included with this email.</p>' : '')
        . '</div></div>';
    $plainBody = "New Versatile Edge project inquiry\n\n" . $plainRows . "Review property: {$mapLink}\n";

    $mixed = 'mixed_' . bin2hex(random_bytes(16));
    $alternative = 'alt_' . bin2hex(random_bytes(16));
    $body = "--{$mixed}\r\nContent-Type: multipart/alternative; boundary=\"{$alternative}\"\r\n\r\n";
    $body .= "--{$alternative}\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($plainBody));
    $body .= "--{$alternative}\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($htmlBody));
    $body .= "--{$alternative}--\r\n";

    foreach ($attachments as $attachment) {
        $contents = file_get_contents($attachment['path']);
        if ($contents === false) {
            throw new RuntimeException('An attachment could not be read.');
        }
        $name = addcslashes($attachment['name'], "\"\\");
        $body .= "--{$mixed}\r\nContent-Type: {$attachment['mime']}; name=\"{$name}\"\r\n";
        $body .= "Content-Disposition: attachment; filename=\"{$name}\"\r\nContent-Transfer-Encoding: base64\r\n\r\n";
        $body .= chunk_split(base64_encode($contents));
    }
    $body .= "--{$mixed}--\r\n";

    $fromEmail = header_text((string) $config['from_email']);
    $fromName = header_text((string) config_value($config, 'from_name', 'Versatile Edge Website'));
    $toEmail = header_text((string) $config['to_email']);
    $subject = 'New ' . $fields['projectType'] . ' inquiry - ' . $fields['city'] . ', ' . strtoupper($fields['state']);
    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'From: ' . encoded_header($fromName) . ' <' . $fromEmail . '>',
        'To: <' . $toEmail . '>',
        'Reply-To: ' . header_text($fields['email']),
        'Subject: ' . encoded_header($subject),
        'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . substr(strrchr($fromEmail, '@') ?: '@localhost', 1) . '>',
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="' . $mixed . '"',
    ];
    return [implode("\r\n", $headers) . "\r\n\r\n" . $body, $subject];
}

function send_smtp(array $config, string $message): void
{
    $host = header_text((string) $config['smtp_host']);
    $port = (int) config_value($config, 'smtp_port', 587);
    $encryption = strtolower((string) config_value($config, 'smtp_encryption', 'tls'));
    $remote = ($encryption === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $port;
    $context = stream_context_create(['ssl' => [
        'verify_peer' => true,
        'verify_peer_name' => true,
        'allow_self_signed' => false,
        'peer_name' => $host,
    ]]);
    $socket = @stream_socket_client($remote, $errorCode, $errorMessage, 20, STREAM_CLIENT_CONNECT, $context);
    if ($socket === false) {
        throw new RuntimeException("SMTP connection failed ({$errorCode}): {$errorMessage}");
    }
    stream_set_timeout($socket, 20);

    try {
        smtp_expect($socket, [220]);
        $hostname = preg_replace('/[^A-Za-z0-9.-]/', '', gethostname() ?: 'localhost') ?: 'localhost';
        smtp_command($socket, 'EHLO ' . $hostname, [250]);
        if ($encryption === 'tls') {
            smtp_command($socket, 'STARTTLS', [220]);
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('SMTP TLS negotiation failed.');
            }
            smtp_command($socket, 'EHLO ' . $hostname, [250]);
        }
        smtp_command($socket, 'AUTH LOGIN', [334]);
        smtp_command($socket, base64_encode((string) $config['smtp_username']), [334]);
        smtp_command($socket, base64_encode((string) $config['smtp_password']), [235]);
        smtp_command($socket, 'MAIL FROM:<' . header_text((string) $config['from_email']) . '>', [250]);
        smtp_command($socket, 'RCPT TO:<' . header_text((string) $config['to_email']) . '>', [250, 251]);
        smtp_command($socket, 'DATA', [354]);
        $dotStuffed = preg_replace('/(?m)^\./', '..', $message);
        if (fwrite($socket, $dotStuffed . "\r\n.\r\n") === false) {
            throw new RuntimeException('Could not transmit the inquiry email.');
        }
        smtp_expect($socket, [250]);
        smtp_command($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, 'method_not_allowed', 'This endpoint accepts form submissions only.');
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
$absoluteRequestLimit = 40 * 1024 * 1024;
if ($contentLength > $absoluteRequestLimit) {
    respond(413, 'request_too_large', 'The selected attachments are too large. Please upload fewer files.');
}

$configPath = getenv('VERSATILE_EDGE_CONFIG_PATH');
if (!is_string($configPath) || $configPath === '') {
    $documentRoot = rtrim((string) ($_SERVER['DOCUMENT_ROOT'] ?? dirname(__DIR__, 2)), DIRECTORY_SEPARATOR);
    $configPath = dirname($documentRoot) . DIRECTORY_SEPARATOR . 'versatile-edge-private' . DIRECTORY_SEPARATOR . 'inquiry-config.php';
}
if (!is_file($configPath) || !is_readable($configPath)) {
    error_log('Versatile Edge inquiry: private configuration file was not found.');
    respond(503, 'not_configured', 'Online inquiries are being configured. Please call ' . VE_PHONE . ' for now.');
}
$config = require $configPath;
if (!is_array($config)) {
    error_log('Versatile Edge inquiry: private configuration did not return an array.');
    respond(503, 'not_configured', 'Online inquiries are being configured. Please call ' . VE_PHONE . ' for now.');
}

$requiredConfig = ['smtp_host', 'smtp_username', 'smtp_password', 'from_email', 'to_email', 'turnstile_secret'];
foreach ($requiredConfig as $key) {
    if (!is_string($config[$key] ?? null) || trim($config[$key]) === '') {
        error_log("Versatile Edge inquiry: missing private configuration value {$key}.");
        respond(503, 'not_configured', 'Online inquiries are being configured. Please call ' . VE_PHONE . ' for now.');
    }
}
if (!filter_var($config['from_email'], FILTER_VALIDATE_EMAIL) || !filter_var($config['to_email'], FILTER_VALIDATE_EMAIL)) {
    error_log('Versatile Edge inquiry: invalid configured email address.');
    respond(503, 'not_configured', 'Online inquiries are being configured. Please call ' . VE_PHONE . ' for now.');
}

$ip = client_ip();
enforce_rate_limit($config, $ip);

if (field('companyWebsite', 200) !== '') {
    respond(200, 'accepted', 'Your project details were sent successfully.');
}

$fields = [
    'projectType' => field('projectType', 100),
    'timeline' => field('timeline', 100),
    'budget' => field('budget', 100),
    'description' => field('description', 5000),
    'referral' => field('referral', 100),
    'street' => field('street', 200),
    'city' => field('city', 100),
    'state' => strtoupper(field('state', 2)),
    'zip' => field('zip', 10),
    'firstName' => field('firstName', 100),
    'lastName' => field('lastName', 100),
    'email' => field('email', 254),
    'phone' => field('phone', 40),
];
foreach ($fields as $value) {
    if ($value === '') {
        respond(400, 'required_fields', 'Please complete every required field.');
    }
}
if (!filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
    respond(400, 'invalid_email', 'Please enter a valid email address.');
}
if (!preg_match('/^[A-Z]{2}$/', $fields['state'])) {
    respond(400, 'invalid_state', 'Please enter a two-letter state abbreviation.');
}
if (!preg_match('/^\d{5}(?:-\d{4})?$/', $fields['zip'])) {
    respond(400, 'invalid_zip', 'Please enter a valid ZIP code.');
}
if (strlen(preg_replace('/\D+/', '', $fields['phone'])) < 10) {
    respond(400, 'invalid_phone', 'Please enter a valid phone number.');
}
if (strlen($fields['description']) < 20) {
    respond(400, 'description_too_short', 'Please add a little more detail about your project.');
}
$allowedProjectTypes = [
    'Whole-Home Renovations', 'Interior Remodeling', 'Kitchen Renovations',
    'Bathroom Renovations', 'Porches & Decks', 'Home Additions', 'Window Replacement',
];
$allowedTimelines = ['As soon as practical', 'Within 3 months', '3–6 months', '6–12 months', 'Planning ahead'];
$allowedBudgets = [
    'Under $25,000', '$25,000 – $50,000', '$50,000 – $75,000', '$75,000 – $100,000',
    '$100,000 – $150,000', '$150,000 – $200,000', '$200,000 – $300,000',
    'Over $300,000', 'Not sure yet',
];
$allowedReferrals = [
    'Neighbor or friend', 'Yard sign', 'Web search', 'Social media',
    'Print advertisement', 'Repeat client', 'Other',
];
if (!in_array($fields['projectType'], $allowedProjectTypes, true)
    || !in_array($fields['timeline'], $allowedTimelines, true)
    || !in_array($fields['budget'], $allowedBudgets, true)
    || !in_array($fields['referral'], $allowedReferrals, true)) {
    respond(400, 'invalid_selection', 'Please select valid project details from the form.');
}
if (($_POST['consent'] ?? '') !== 'on') {
    respond(400, 'consent_required', 'Please confirm the privacy acknowledgement.');
}

try {
    verify_turnstile($config, $ip);
    $attachments = validate_uploads($config);
    [$message] = build_email($config, $fields, $attachments);
    send_smtp($config, $message);
    respond(200, 'sent', 'Your project details were sent successfully.');
} catch (Throwable $error) {
    error_log('Versatile Edge inquiry failure: ' . $error->getMessage());
    respond(502, 'delivery_failed', 'We could not deliver your inquiry. Please try again or call ' . VE_PHONE . '.');
}
