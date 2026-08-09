# Versatile Edge IONOS PHP setup

The static build places the public endpoint at `dist/client/api/inquiries.php`.
Upload the complete contents of `dist/client/` to the domain's public document
root. The endpoint must therefore be available publicly as `/api/inquiries.php`.

Do not upload a completed private configuration into the public document root.
Copy `deployment/ionos-private-config.example.php` to this default location:

```text
<parent of document root>/versatile-edge-private/inquiry-config.php
```

If a different private location is required, set the server environment value
`VERSATILE_EDGE_CONFIG_PATH` to its absolute path.

Use PHP 8.2 or newer. Confirm that OpenSSL, Fileinfo, and either cURL or
`allow_url_fopen` are enabled. The web-hosting account must permit outbound
encrypted SMTP connections to `smtp.ionos.com`.

Recommended PHP limits for the current form are:

```ini
upload_max_filesize = 10M
post_max_size = 32M
memory_limit = 128M
max_file_uploads = 5
max_execution_time = 60
```

`post_max_size` must be larger than the configured combined attachment limit,
and `memory_limit` must be larger than `post_max_size`. IONOS may impose lower
package-level ceilings that cannot be raised with `php.ini`.

The public Turnstile site key must be provided as
`NEXT_PUBLIC_TURNSTILE_SITE_KEY` when the static site is built. Its secret key
belongs only in the private PHP configuration.
