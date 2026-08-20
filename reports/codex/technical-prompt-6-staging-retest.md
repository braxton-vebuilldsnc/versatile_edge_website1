# Technical Prompt 6: Post-Deployment Staging Retest

## Audit identification

- Site: Versatile Edge LLC
- Production identity: `https://versatileedgellc.com/`
- Staging host tested: `https://staging.versatileedgellc.com/`
- Audit and deployment date: August 13, 2026 (America/New_York)
- Repository: `/Users/braxtonbunn/Documents/ChatGPT/Versatile_Edge_Website`
- Branch: `main`
- Audited commit: `b2e17c2d19346bd4031de5f5f21500783ce70c32`
- `origin/main`: `b2e17c2d19346bd4031de5f5f21500783ce70c32`
- Application: React 19 / Vinext 1.0.0-beta.2 static export
- Static output: `dist/client`
- Hosting target: IONOS Apache/SFTP
- Staging document root: `/versatile-edge-staging`

This report records the staging-only deployment recovery, atomic directory swap, and complete live staging retest requested after the first pre-swap SFTP operation appeared to stall. No production directory was modified. No application code was changed. Nothing was staged, committed, pushed, or deployed to production.

## Final verdict

# READY WITH MINOR MANUAL TASKS

The current release artifact is now active on IONOS staging and the previously blocking staging defects are resolved. Live staging serves the exact verified release, including `.htaccess` and all generated responsive images. All 19 intended routes have production canonicals and an exact-host staging-only `X-Robots-Tag: noindex, nofollow` header. Robots, sitemap, URL normalization, custom 404 behavior, structured data, internal links, responsive images, representative mobile performance, and automated accessibility checks pass.

There is no verified code or staging-hosting blocker. The remaining manual tasks are:

1. Perform one authorized real staging inquiry submission and confirm Turnstile validation, PHP processing, delivery, and the success/error announcement behavior. The form was not submitted during this QA to avoid creating an external inquiry without explicit authorization.
2. Perform a manual keyboard/screen-reader and real-device spot check. Automated axe and focus checks passed, but automation cannot prove complete accessibility.
3. When separately approved, deploy this exact verified artifact to production, then run the post-cutover production checks listed in this report. Production was deliberately not deployed in this task.
4. Review the existing npm dependency advisories in a separately scoped maintenance task; do not apply automatic or incompatible upgrades as part of launch deployment.

## Deployment recovery and atomic swap

### Read-only inspection of the apparent partial upload

The existing temporary directory was inspected first:

`/versatile-edge-staging-next-b2e17c2`

Findings:

- The server filesystem reported approximately 2.0 TB total, 1.5 TB used, and 461 GB available (77% used).
- There was no quota or storage-capacity failure.
- Read-only root listing showed the expected top-level files and directories, including `.htaccess`.
- The apparent interruption occurred at the local command/session execution window while recursively verifying/downloading the remote tree, not while the server was rejecting writes.
- Segmented verification established that all 262 expected files had in fact uploaded successfully. There were no missing or incomplete files to resume, so no redundant retransmission was performed.
- The release has 262 files in 16 directories and totals 41,784,559 bytes.

Conclusion: PASS. The interruption was timeout/session-related, not quota-related.

### Resilient verification method

The remote temporary release was downloaded for verification in six bounded SFTP batches of approximately 6.3–7.3 MB each. This avoided relying on one long recursive SFTP session.

Results:

- Expected files: 262
- Downloaded remote files: 262
- Expected bytes: 41,784,559
- Downloaded bytes: 41,784,559
- SHA-256 comparisons: 262/262 exact
- Missing files: 0
- Extra files: 0
- Content mismatches: 0
- `.htaccess`: present and exact
- `.htaccess` size: 6,641 bytes
- `.htaccess` SHA-256: `94c049cf6f9f043087b9cee25303daf694e3628b7f9f8e277705a66b18bf8a5d`
- Generated responsive derivatives: 116/116 present and exact
- Required release files `index.html`, `404.html`, `robots.txt`, `sitemap.xml`, and `api/inquiries.php`: present

The itemized comparison showed timestamp-only differences; file contents were exact.

### Backup and swap

The approved SFTP directory swap completed in this order:

1. Renamed the former live staging directory to `/versatile-edge-staging-backup-20260813-b2e17c2`.
2. Renamed the verified temporary release directory from `/versatile-edge-staging-next-b2e17c2` to `/versatile-edge-staging`.
3. Listed both directories after the swap and confirmed the new live staging directory and the timestamped remote backup.

Recovery points retained:

- Remote backup: `/versatile-edge-staging-backup-20260813-b2e17c2`
- Local backup: `/Users/braxtonbunn/Documents/ChatGPT/IONOS_Backups/prompt6-2026-08-13/versatile-edge-staging`

The local backup contains the prior staging content and its prior 1,794-byte `.htaccess`. Neither backup was deleted. The private inquiry configuration at `/versatile-edge-private/inquiry-config.php` remained outside the swapped document root and was not modified.

Production was not referenced by either rename and was not modified.

## PASS/FAIL summary

| QA area | Result | Evidence |
|---|---|---|
| Release completeness before swap | PASS | 262/262 files, byte count and SHA-256 exact |
| `.htaccess` inclusion | PASS | SFTP-verified, 6,641 bytes, exact SHA-256 |
| Responsive derivatives | PASS | 116/116 present; representative live candidates return 200 |
| Atomic staging-only swap | PASS | New live and timestamped backup directories confirmed |
| Production isolation | PASS | Production directory untouched; current production site unchanged |
| Intended staging routes | PASS | 19/19 return 200 |
| Staging noindex | PASS | 19/19 return `X-Robots-Tag: noindex, nofollow` |
| Production canonicals | PASS | 19/19 present and correct |
| Live HTML matches release | PASS | 19/19 byte-for-byte and SHA-256 exact |
| Robots | PASS | Live file exact; crawl allowed; `/api/` disallowed; production sitemap declared |
| Sitemap | PASS | 19 unique production URLs; no staging URLs |
| HTTP to HTTPS | PASS | Direct 301 on staging; production host normalization remains direct 301 |
| Trailing-slash normalization | PASS | Valid aliases return direct 301 to clean route |
| `.html` normalization | PASS | Valid aliases return direct 301 to clean route |
| `/index*` normalization | PASS | `/index`, `/index/`, `/index.html` return direct 301 to `/` |
| Unknown URL behavior | PASS | True 404 with custom document |
| Direct 404 aliases | PASS | `/404`, `/404/`, `/404.html` all return true 404 without recursion |
| Non-city legacy paths on staging | PASS | Return 404; production-only redirect rules do not fire on staging |
| Reserved city legacy paths | PASS | Return 404; no premature or wildcard reassignment |
| Structured-data parsing | PASS | All JSON-LD parses; zero invalid documents |
| Business entity consistency | PASS | One stable GeneralContractor on each route |
| Seven-service catalogs | PASS | Exactly seven entries on `/` and `/services` only |
| Service, FAQ, breadcrumb schema | PASS | Exact expected counts and repository parity tests pass |
| Staging URL leakage | PASS | None in canonical, sitemap, or structured data |
| Internal links | PASS | 33 discovered root-relative targets checked; zero failures |
| Referenced assets | PASS | Local complete-asset test passes; live release is exact and complete |
| Static build/export | PASS | 20 routes prerendered; 0 skipped; output preparation passed |
| Complete automated suite | PASS | 17 passed, 0 failed |
| Representative mobile CLS | PASS | 0 on all four pages |
| Representative axe | PASS | 0 violations on all four pages |
| Real inquiry/Turnstile submission | MANUAL | Script/key load verified; no external inquiry submitted |
| Field Core Web Vitals/INP | NOT YET AVAILABLE | Requires real production traffic |

## Final URL, canonical, index-control, and schema inventory

All routes below are intended to be indexable on production. On staging, each route remains crawlable so a crawler can see the HTTP noindex directive, but each response is protected from indexing by `X-Robots-Tag: noindex, nofollow`.

The root canonical serializes as `https://versatileedgellc.com`, while the sitemap uses `https://versatileedgellc.com/`; these are the same root URL. This is not a duplicate or conflict.

| Route | Live status | Production canonical | Sitemap | Robots | Internal discovery | Staging noindex | Page-specific schema beyond contractor |
|---|---:|---|---|---|---|---|---|
| `/` | 200 | `https://versatileedgellc.com` | Included | Allowed | Yes | PASS | OfferCatalog: 7 services |
| `/about` | 200 | `https://versatileedgellc.com/about` | Included | Allowed | Yes | PASS | None |
| `/services` | 200 | `https://versatileedgellc.com/services` | Included | Allowed | Yes | PASS | OfferCatalog: 7 services |
| `/services/whole-home-renovations` | 200 | `https://versatileedgellc.com/services/whole-home-renovations` | Included | Allowed | Yes | PASS | Service: 1; FAQ: 2; breadcrumb items: 3 |
| `/services/interior-remodeling` | 200 | `https://versatileedgellc.com/services/interior-remodeling` | Included | Allowed | Yes | PASS | Service: 1; FAQ: 2; breadcrumb items: 3 |
| `/services/kitchen-renovations` | 200 | `https://versatileedgellc.com/services/kitchen-renovations` | Included | Allowed | Yes | PASS | Service: 1; FAQ: 2; breadcrumb items: 3 |
| `/services/bathroom-renovations` | 200 | `https://versatileedgellc.com/services/bathroom-renovations` | Included | Allowed | Yes | PASS | Service: 1; FAQ: 2; breadcrumb items: 3 |
| `/services/porches-and-decks` | 200 | `https://versatileedgellc.com/services/porches-and-decks` | Included | Allowed | Yes | PASS | Service: 1; FAQ: 2; breadcrumb items: 3 |
| `/services/home-additions` | 200 | `https://versatileedgellc.com/services/home-additions` | Included | Allowed | Yes | PASS | Service: 1; FAQ: 2; breadcrumb items: 3 |
| `/services/window-replacement` | 200 | `https://versatileedgellc.com/services/window-replacement` | Included | Allowed | Yes | PASS | Service: 1; FAQ: 2; breadcrumb items: 3 |
| `/projects` | 200 | `https://versatileedgellc.com/projects` | Included | Allowed | Yes | PASS | None |
| `/projects/hutter-whole-house-remodel-addition` | 200 | `https://versatileedgellc.com/projects/hutter-whole-house-remodel-addition` | Included | Allowed | Yes | PASS | Breadcrumb items: 3 |
| `/projects/johnson-bathroom` | 200 | `https://versatileedgellc.com/projects/johnson-bathroom` | Included | Allowed | Yes | PASS | Breadcrumb items: 3 |
| `/projects/brown-bathroom` | 200 | `https://versatileedgellc.com/projects/brown-bathroom` | Included | Allowed | Yes | PASS | Breadcrumb items: 3 |
| `/projects/walsh-sunroom-deck` | 200 | `https://versatileedgellc.com/projects/walsh-sunroom-deck` | Included | Allowed | Yes | PASS | Breadcrumb items: 3 |
| `/projects/janet-home-addition` | 200 | `https://versatileedgellc.com/projects/janet-home-addition` | Included | Allowed | Yes | PASS | Breadcrumb items: 3 |
| `/process` | 200 | `https://versatileedgellc.com/process` | Included | Allowed | Yes | PASS | None |
| `/contact` | 200 | `https://versatileedgellc.com/contact` | Included | Allowed | Yes | PASS | None |
| `/privacy` | 200 | `https://versatileedgellc.com/privacy` | Included | Allowed | Yes | PASS | None |

Inventory totals:

- Intended indexable routes: 19
- Exported intended routes: 19/19
- Live staging 200 responses: 19/19
- Correct production canonicals: 19/19
- Sitemap inclusions: 19/19
- Internally discoverable intended routes: 19/19
- Staging noindex headers: 19/19
- Duplicate sitemap URLs: 0
- Obsolete sitemap URLs: 0
- Staging URLs in sitemap/canonicals/schema: 0
- Invalid JSON-LD documents: 0

## HTTP/status and normalization verification

| Request | Expected | Actual | Destination/behavior | Result |
|---|---:|---:|---|---|
| `https://staging.versatileedgellc.com/` | 200 | 200 | Current homepage | PASS |
| `http://staging.versatileedgellc.com/about` | 301 | 301 | `https://staging.versatileedgellc.com/about` | PASS |
| `/about/` | 301 | 301 | `/about` | PASS |
| `/about.html` | 301 | 301 | `/about` | PASS |
| `/services/kitchen-renovations/` | 301 | 301 | Clean nested route | PASS |
| `/services/kitchen-renovations.html` | 301 | 301 | Clean nested route | PASS |
| `/index` | 301 | 301 | `/` | PASS |
| `/index/` | 301 | 301 | `/` | PASS |
| `/index.html` | 301 | 301 | `/` | PASS |
| `/404` | 404 | 404 | Custom 404 document | PASS |
| `/404/` | 404 | 404 | Custom 404 document | PASS |
| `/404.html` | 404 | 404 | Custom 404 document | PASS |
| `/definitely-not-a-real-page` | 404 | 404 | Custom 404 document | PASS |
| Staging non-city legacy `/about-versatile-edge/` | 404 | 404 | No production-only redirect on staging | PASS |
| Reserved Wake Forest legacy sample | 404 | 404 | Preserved for future matching city page | PASS |
| `http://versatileedgellc.com/` | 301 | 301 | Directly to HTTPS apex | PASS, current production |
| `https://www.versatileedgellc.com/` | 301 | 301 | Directly to HTTPS apex | PASS, current production |
| `http://www.versatileedgellc.com/` | 301 | 301 | Directly to HTTPS apex | PASS, current production |

No redirect chain was observed in the tested staging cases. Route normalization remains generated from exported valid routes rather than a manually maintained 19-route list. Direct 404 aliases do not redirect into `ErrorDocument`, and normal missing URLs render the custom document with a true 404, so recursive error handling is not present.

The staging noindex header is also present on tested redirects and 404 responses.

### Legacy URL behavior

The approved non-city redirects are production-host-only and therefore correctly return 404 on staging:

- `/about-versatile-edge` → production `/about` after production deployment
- `/services1` → production `/services` after production deployment
- `/contact-versatile-edge-llc` → production `/contact` after production deployment

These URLs still return 200 on the current production WordPress site because production has not been replaced. Their final static-site 301 behavior must be verified immediately after production cutover.

City-targeted legacy URLs remain inventoried but intentionally have no redirect. The Wake Forest sample returned 404 on the static staging release, confirming no broad wildcard redirect has hidden the missing future page.

## Robots verification

Live `https://staging.versatileedgellc.com/robots.txt` returns 200 and is byte-for-byte identical to the release:

```text
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://versatileedgellc.com/sitemap.xml
```

Results:

- General page crawling allowed: PASS
- Inquiry API excluded: PASS
- No intended indexable route excluded: PASS
- Production sitemap declared: PASS
- Staging URL absent: PASS
- Live/release byte equality: PASS

Allowing staging crawling is intentional: crawlers must be able to retrieve a page to observe its HTTP noindex header.

## Sitemap verification

Live `https://staging.versatileedgellc.com/sitemap.xml` returns 200 and is byte-for-byte identical to the generated release file.

- URL count: 19
- Unique URL count: 19
- Production-domain URL count: 19
- Staging URLs: 0
- Missing intended routes: 0
- Duplicate URLs: 0
- Obsolete URLs: 0
- Direct 404 URL included: no
- API URL included: no

The sitemap is generated during the existing post-build process from exported indexable production canonicals, avoiding a separately maintained route list.

## Staging noindex and production indexability

### Staging

All 19 intended route responses return:

`X-Robots-Tag: noindex, nofollow`

The exact-host condition is active on `staging.versatileedgellc.com`. Tested redirects and 404 responses also carry the header. Result: PASS.

### Production safety

The noindex mechanism is based on the exact staging hostname, not an environment variable or a generic deployment flag. The current production homepage returns 200 with:

- No `X-Robots-Tag: noindex`
- No meta robots noindex
- Production canonical `https://versatileedgellc.com/`

The current production site remains the prior WordPress deployment and was not modified. Production indexability currently passes. After static cutover, all 19 production responses must be rechecked to prove that the staging-only header remains isolated.

## Structured-data inventory and validation

Every live staging HTML document is byte-for-byte identical to its release counterpart, and every JSON-LD block parsed successfully.

Global entity results:

- Exactly one `GeneralContractor` on each of the 19 intended routes: PASS
- Stable entity ID: `https://versatileedgellc.com/#contractor`: PASS
- Production-domain logo, image, and business URLs: PASS
- Conflicting business entity: none
- Staging URL leakage: none

Page-specific inventory:

| Route group | Page-specific schema | Count/result |
|---|---|---|
| `/` | `OfferCatalog` | Exactly 7 service entries |
| `/services` | `OfferCatalog` | Exactly 7 service entries |
| Seven service detail routes | `Service` | Exactly 1 matching service per route |
| Seven service detail routes | `FAQPage` | Exactly 2 questions per route; visible-content parity test passed |
| Seven service detail routes | `BreadcrumbList` | Exactly 3 hierarchy items per route |
| Five project detail routes | `BreadcrumbList` | Exactly 3 hierarchy items per route |
| About, projects index, process, contact, privacy | No extra page-specific schema | Correct |

Breadcrumb IDs and item URLs use the production domain and match the real service/project hierarchy. The automated schema suite confirmed the Service name/URL, FAQ question/answer parity with visible content, catalog placement/completeness, breadcrumb hierarchy, and absence of staging URLs.

## Broken links and referenced assets

The live crawl checked every root-relative link discovered across the 19 intended route documents:

- Unique discovered targets checked: 33
- Failed targets: 0
- Intended routes internally discoverable: 19/19

The rendered-output suite additionally resolved every internal page link, direct `src`/`poster` reference, and generated `srcset` candidate to an exported file:

- Broken internal page links: 0
- Missing directly referenced local assets: 0
- Missing responsive candidates: 0
- No-upscaling violations: 0

Because all 262 remote files were downloaded and matched to the expected release by SHA-256 before the swap, the deployed release-content comparison found no missing, extra, or incomplete artifact file. Representative live responsive-image requests at 640, 1280, and 1920 pixels returned 200 where those source dimensions support the candidate.

## Static export, build, and test results

### Fresh predeployment production build

The artifact deployed in this task came directly from the successful fresh production build/test run for commit `b2e17c2` with the approved staging Turnstile public key embedded through a native local prompt.

- `vinext build`: PASS
- Vite version: 8.0.13
- Client reference modules transformed: 261
- Server reference modules transformed: 104
- RSC environment modules transformed: 259
- Client environment modules transformed: 1,904
- SSR environment modules transformed: 105
- Prerendered routes: 20
- Skipped routes: 0
- Exported HTML documents: 20, including `404.html`
- Intended sitemap URLs: 19
- Post-build IONOS preparation: PASS
- Responsive derivatives generated: 116
- Filtered deployment artifact: 262 files / 41,784,559 bytes
- Exclusions: only `.DS_Store` and `.vite/`

The build emitted the existing Node experimental `glob` warning but no compile/export error.

### Postdeployment full test rerun

The complete test suite was rerun against the same exact static artifact without rebuilding it. Results: 17 passed, 0 failed, 0 skipped, 0 cancelled.

| # | Test | Result |
|---:|---|---|
| 1 | Apache applies route normalization and renders non-recursive true 404s | PASS |
| 2 | Exports every public route as static HTML | PASS |
| 3 | Exports every local asset referenced by public HTML | PASS |
| 4 | Generates responsive images without upscaling and prioritizes only page heroes | PASS |
| 5 | Exports approved focus, landmark, contrast, and form-error accessibility corrections | PASS |
| 6 | Resolves every internal page link to an exported file | PASS |
| 7 | Exports static search-engine and IONOS hosting files | PASS |
| 8 | Tracks city-targeted legacy URLs without prematurely redirecting them | PASS |
| 9 | Uses native document navigation on the static website | PASS |
| 10 | Exports the approved content and global back-to-top control | PASS |
| 11 | Exports the approved homepage SEO metadata and contractor schema | PASS |
| 12 | Exports the PHP inquiry endpoint and preserves the complete form | PASS |
| 13 | Uses one consistent production GeneralContractor entity on every exported document | PASS |
| 14 | Places complete seven-service catalogs only where all services are visible | PASS |
| 15 | Service detail schema matches its visible service, FAQ, and hierarchy | PASS |
| 16 | Project detail schema contains only its matching breadcrumb hierarchy | PASS |
| 17 | All structured-data URLs use schema.org or the production domain without staging leakage | PASS |

The additional live comparison verified 19/19 route HTML files byte-for-byte and SHA-256 exact against the tested release. Therefore the HTML, canonical, structured-data, accessibility markup, and responsive-image markup exercised by the local tests are the files now served by staging.

## Representative live mobile performance

### Testing conditions

The post-swap live run used the same Prompt 5 synthetic profile:

- Viewport: 390 × 844 CSS pixels
- Device scale factor: 3
- Mobile emulation
- 4× CPU slowdown
- 100 ms network latency
- 4 Mbps download
- 1 Mbps upload
- Browser cache disabled
- Five-second post-load observation window
- Chrome DevTools Protocol performance observers
- axe-core 4.11.4

These are controlled lab measurements, not field Core Web Vitals or CrUX data.

### Live postdeployment results

| Page | Live LCP | LCP element/resource | Transfer bytes | CLS | Axe violations |
|---|---:|---|---:|---:|---:|
| Homepage | 1.764 s | `hutter-kitchen-04-1280w.webp` image | 1,754,230 | 0 | 0 |
| Kitchen service | 0.940 s | Text `H1` | 1,711,665 | 0 | 0 |
| Hutter project | 1.648 s | `hutter-living-03-1280w.webp` image | 1,108,667 | 0 | 0 |
| Contact | 1.196 s | Text `H1` | 606,576 | 0 | 0 |

All representative LCP values are below the commonly used 2.5-second “good” lab threshold in this run. Synthetic run-to-run variation is expected, particularly for text-led pages and the remote first request.

### Comparison with the final local Prompt 5 artifact run

| Page | Final local artifact LCP | Live staging LCP | Local transfer | Live transfer | Interpretation |
|---|---:|---:|---:|---:|---|
| Homepage | 0.744 s | 1.764 s | 1,689,340 | 1,754,230 | Remote/network variation; responsive 1280w LCP candidate confirmed |
| Kitchen service | 1.276 s | 0.940 s | 1,711,558 | 1,711,665 | Comparable; live faster in this run |
| Hutter project | 1.772 s | 1.648 s | 1,108,560 | 1,108,667 | Comparable; live slightly faster |
| Contact | 0.600 s | 1.196 s | 606,483 | 606,576 | Transfer equivalent; text LCP timing varied |

The service, project, and contact transfer totals differ by only 93–107 bytes. The homepage live run transferred 64,890 more bytes than the local run while selecting the same optimized 1280w hero candidate; this is consistent with remote/request encoding and lab-run variation rather than a return to the old multi-megabyte original-image behavior.

For comparison, the superseded predeployment staging artifact measured 2.56 MB, 2.84 MB, and 2.72 MB on the homepage, service, and project pages. The new live results confirm the responsive-image deployment is active.

CLS remained zero on all four pages. No long tasks were recorded in this live run.

Field INP remains unavailable before production traffic; synthetic event and long-task observations are not a substitute.

## Accessibility and visual QA

### Axe and semantics

The live postdeployment axe run reported zero violations on all four representative pages:

- Homepage: 0
- Kitchen service: 0
- Hutter project: 0
- Contact: 0

Verified rendered behavior includes:

- Skip link receives a visible 3-pixel focus outline.
- Utility phone is 44 pixels high in the mobile header.
- Mobile menu is 44 × 44 pixels.
- Fixed mobile consultation CTA remains inside the header landmark and is keyboard focusable.
- Standard links, buttons, FAQ summaries, and form controls expose visible focus indication.
- Contact controls retain native label association.
- Required controls, consent, honeypot, upload control, and form endpoint remain present.
- Failure feedback is exported with `role="alert"`; success remains `role="status"`.
- Responsive hero images have intrinsic dimensions, `srcset`, appropriate `sizes`, async decoding, eager loading, and high fetch priority.
- Below-the-fold responsive images remain lazy loaded.
- Decorative service/project hero images retain empty alt text; meaningful images retain descriptive alt text.

### Visual inspection

Fresh 390 × 844 live screenshots of the homepage and contact page were inspected after deployment. The site stylesheet, logo, navy/gold brand treatment, oversized editorial headings, hero image crop, fixed mobile CTA, contact layout, phone/service-area content, and form-panel transition rendered without missing CSS or imagery. No deployment-induced visual regression, broken layout resource, or stale-asset mismatch was observed.

This was a rendered visual spot check, not a numerical pixel-diff suite. The complete Prompt 5 sitewide visual comparison remains applicable because the live HTML is byte-identical to that tested release.

Automated axe does not replace manual screen-reader, zoom/reflow, high-contrast, and real-device touch/keyboard testing. No automated accessibility blocker remains.

## Inquiry form and Turnstile

Static and live evidence:

- `api/inquiries.php` is present in the deployed release and matched its expected checksum.
- The complete form fields, file upload, consent checkbox, honeypot, required validation, and submission endpoint are present.
- The current staging Turnstile public site key is embedded in the inquiry-form chunk.
- The rendered contact page requested Cloudflare’s explicit Turnstile API script.
- The private server configuration remains outside the swapped root at `/versatile-edge-private/inquiry-config.php` and was not changed.
- The staging hostname was previously configured for Turnstile as supplied by the site owner.

No real submission was made. End-to-end token issuance, server-side verification, email delivery, and user-facing success/failure messages still require one authorized manual staging submission. This is a minor manual deployment-verification item, not evidence of a current defect.

## Dependency/audit advisories

No dependency changes were made during deployment or staging QA. The separately recorded Prompt 5 advisory query found 14 packages in the installed dependency graph: 0 critical, 9 high, 4 moderate, and 1 low.

The direct packages identified in that report included `drizzle-kit`, `react-server-dom-webpack`, `vinext`, and `vite`; transitive findings included build/tooling packages. Much of this graph is development/build tooling and the deployed output is static, which limits but does not eliminate relevance.

Do not run a blind `npm audit fix` or incompatible framework downgrade during launch. Review and test dependency upgrades in a separately scoped maintenance batch with a fresh build, complete static-export tests, and staging verification.

## Remaining hosting-only and launch tasks

### Before production deployment

1. Perform the authorized real staging inquiry/Turnstile test and confirm receipt.
2. Optionally complete manual assistive-technology and real-device checks.
3. Retain the remote and local backups until the site owner approves cleanup.

### Production deployment

Production deployment was not authorized and did not occur. When approved:

1. Deploy the exact 262-file verified release artifact without rebuilding a different artifact.
2. Include hidden `.htaccess` and all 116 responsive derivatives.
3. Create a production recovery point before replacement.
4. Keep `/versatile-edge-private/inquiry-config.php` outside the public document root and do not overwrite it.
5. Do not reuse the staging directory or touch the staging backup during the production swap.

### Immediate post-production verification

1. Confirm all 19 routes return 200 and production canonicals.
2. Confirm production has no staging `X-Robots-Tag` and no meta noindex.
3. Confirm HTTP and both `www` variants redirect directly to the HTTPS apex without chains.
4. Confirm clean routes, trailing-slash aliases, `.html` aliases, and `/index*` behavior.
5. Confirm unknown URLs and direct 404 aliases return true 404.
6. Confirm the three approved non-city legacy paths return direct 301 responses to their final production routes.
7. Confirm city-targeted legacy URLs remain unredirected until matching future city pages are approved.
8. Confirm production `/robots.txt` and `/sitemap.xml` serve the static files directly.
9. Confirm no staging URL appears in sitemap, canonical, or structured data.
10. Repeat the schema, broken-link, referenced-asset, representative performance, and axe checks.
11. Test the inquiry form and Turnstile on production.
12. Submit or refresh `https://versatileedgellc.com/sitemap.xml` in search-engine webmaster tools after validation.
13. Begin field Core Web Vitals monitoring when production traffic is available.

## Files changed by this staging retest

No application, configuration, content, build, or deployment-source file was changed.

The only new repository file is this required, untracked report:

`reports/codex/technical-prompt-6-staging-retest.md`

Temporary QA scripts, downloaded verification trees, manifests, audit JSON, and screenshots remain under `/private/tmp/` and are not repository changes. The local recovery copy is outside the repository under `/Users/braxtonbunn/Documents/ChatGPT/IONOS_Backups/`.

## Final assessment and recommendation

The live staging environment now proves that the complete release artifact and its IONOS-facing Apache configuration work together as intended. The prior blockers—missing staging noindex, absent normalization, incorrect direct-404 statuses, missing canonicals/page schemas, absent responsive derivatives, old performance behavior, and old axe violations—were all consequences of the stale staging artifact and are resolved by the verified deployment.

No code correction is recommended from this retest. Keep the exact release artifact and both recovery points. Complete the one authorized live inquiry/Turnstile test, then use this same verified artifact for production only after explicit production-deployment approval. Immediately repeat the production-specific indexability, redirects, legacy URLs, robots, sitemap, schema, links, form, performance, and accessibility checks after cutover.

# READY WITH MINOR MANUAL TASKS
