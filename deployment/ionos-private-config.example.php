<?php
// Copy this file to a private directory outside the public web root on IONOS:
//   ../versatile-edge-private/inquiry-config.php
// Never place the completed file in Git or inside dist/client/.
return [
    'smtp_host' => 'smtp.ionos.com',
    'smtp_port' => 587,
    'smtp_encryption' => 'tls', // Use 'ssl' with port 465 if required by IONOS.
    'smtp_username' => 'REPLACE_WITH_IONOS_SMTP_USERNAME',
    'smtp_password' => 'REPLACE_WITH_IONOS_MAILBOX_PASSWORD',
    'from_email' => 'REPLACE_WITH_IONOS_FROM_ADDRESS',
    'from_name' => 'Versatile Edge Website',
    'to_email' => 'REPLACE_WITH_INQUIRY_RECIPIENT',
    'turnstile_secret' => 'REPLACE_WITH_CLOUDFLARE_TURNSTILE_SECRET',
    'turnstile_allowed_hostnames' => [
        'versatileedgellc.com',
        'www.versatileedgellc.com',
    ],
    'max_files' => 5,
    'max_file_bytes' => 10 * 1024 * 1024,
    'max_total_attachment_bytes' => 25 * 1024 * 1024,
    'rate_limit_attempts' => 5,
    'rate_limit_window_seconds' => 15 * 60,
    // Optional: set a writable directory outside the public web root.
    // 'rate_limit_directory' => '/absolute/private/path/versatile-edge-rate-limits',
];
