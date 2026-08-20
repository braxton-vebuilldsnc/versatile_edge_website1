# Versatile Edge IONOS PHP setup

The static build places the public endpoint at `dist/client/api/inquiries.php`.
Upload the complete contents of `dist/client/` to the domain's public document
root. The endpoint must therefore be available publicly as `/api/inquiries.php`.

Do not upload a completed private configuration into a public document root.
The hosting account uses this private location:

```text
/versatile-edge-private/inquiry-config.php
```

The endpoint preserves `VERSATILE_EDGE_CONFIG_PATH` as the preferred explicit
override. Without it, the verified relative layouts are:

```text
Staging document root:    /versatile-edge-staging
Staging private config:   /versatile-edge-private/inquiry-config.php

Production document root: /clickandbuilds/VerstatileEdgeLLC
Production private config:/versatile-edge-private/inquiry-config.php
```

The fallback checks the private directory one level above the staging root and
two levels above the nested production root. Do not replace this with a guessed
physical filesystem path. The completed private file must remain mode `0600`
where supported and must never be copied into `dist/client/`.

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

## Repeatable production build

`NEXT_PUBLIC_TURNSTILE_SITE_KEY` is a public, browser-visible value. The
approved value is stored in `deployment/production-public-config.json` and was
verified against the functioning staging widget. `npm run build` uses
`scripts/build-production.mjs` to inject that value into the Vinext build. An
explicit environment override is accepted only when it exactly matches the
approved value.

The postbuild release gate checks the exported Contact page, embedded site key,
Turnstile loader, form submission wiring, and PHP verification field. A build
fails if the widget is silently omitted. The Turnstile secret, SMTP password,
and SMTP username belong only in the private PHP configuration.

Run the production readiness workflow with:

```text
npm test
git diff --check
```

`npm test` performs the production build, static preparation, inquiry release
gate, and complete regression suite.

## IONOS deployment authentication

Use SFTP account `a2838378` with the native interactive macOS hidden-password
dialog. Never place the SFTP password in chat, shell history, repository files,
or deployment artifacts. Deploy through a verified temporary release followed
by an atomic directory swap and preserve a rollback directory.
