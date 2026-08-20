# Technical Prompt 6: Final Pre-Launch QA

## Audit identification

- Site: Versatile Edge LLC
- Production identity: `https://versatileedgellc.com/`
- Staging host: `https://staging.versatileedgellc.com/`
- Audit date: August 13, 2026 (America/New_York)
- Repository: `/Users/braxtonbunn/Documents/ChatGPT/Versatile_Edge_Website`
- Branch: `main`
- Audited commit: `b2e17c2d19346bd4031de5f5f21500783ce70c32`
- `origin/main`: `b2e17c2d19346bd4031de5f5f21500783ce70c32`
- Ahead/behind: `0/0`
- Application: React 19 / Vinext static export
- Deployment structure: generated static output in `dist/client`, intended for IONOS Apache hosting with repository-managed `.htaccess`

This audit was read-only except for creation of this required report. No application or hosting corrections were made. Nothing was staged, committed, pushed, or deployed. The previously requested Prompt 5 report and this report remain untracked under `reports/codex/`.

## Final verdict

# NOT READY

The repository artifact is technically ready and passes the complete build/test suite, but the live staging environment is not serving that artifact and cannot be approved for launch.

The launch-blocking staging defects are:

1. Staging is not protected by `X-Robots-Tag: noindex, nofollow`. All 19 intended production routes are currently crawlable and have neither an HTTP noindex header nor a meta noindex directive.
2. The approved `.htaccess` behavior is not active on staging. HTTP does not redirect to HTTPS, clean-route aliases do not normalize, and direct `/404`, `/404/`, and `/404.html` requests incorrectly return `200`.
3. Staging is serving an older HTML/CSS/JavaScript artifact. Eighteen of 19 intended pages lack production canonicals; all page-specific Service, FAQ, Breadcrumb, and service-catalog schemas are missing; responsive image markup and LCP priority attributes are missing.
4. Generated responsive image derivatives in the current repository artifact are absent from staging and return `404` when requested directly.
5. The old staging artifact retains the accessibility and mobile performance defects corrected in Prompt 5.

These are deployment/hosting blockers, not verified defects in the current repository code. The exact current `dist/client` artifact, including the hidden `.htaccess` file and generated responsive images, must be deployed to the correct staging document root. Apache override/header/rewrite processing must then be verified before production launch approval.

## Audit methodology

The final QA combined:

- A fresh production build and static export from the current `main` commit
- The complete automated repository test suite
- Local inspection of every exported HTML document
- Extraction and validation of canonicals, robots directives, sitemap membership, JSON-LD types, and production-domain URLs
- Local validation of the generated IONOS `.htaccess`
- Apache integration tests for redirect, clean-route, and nonrecursive 404 behavior
- A live HTTP crawl of all 19 intended routes on staging
- Live response-header checks on staging and production
- Live robots and sitemap retrieval
- Live redirect/status requests covering HTTP, trailing-slash, `.html`, `/index`, direct 404 aliases, and unknown URLs
- A crawl of all root-relative internal links and referenced local assets discovered in staging HTML
- Comparison of local and staging HTML/CSS fingerprints
- Direct availability checks for generated responsive-image candidates
- Browser inspection of the live rendered staging homepage
- The most recent controlled four-page live staging mobile/axe run, tied to the same staging artifact through unchanged HTML/CSS and image fingerprints
- Comparison with the final Prompt 5 artifact measurements under the same mobile conditions

The controlled representative mobile profile was:

- 390 × 844 CSS-pixel viewport
- Device scale factor 3
- Mobile emulation
- 4× CPU slowdown
- 100 ms network latency
- 4 Mbps download
- 1 Mbps upload
- Disabled browser cache
- Five-second post-load observation period
- axe-core 4.11.4

The performance values are controlled synthetic lab measurements, not field Core Web Vitals or CrUX data.

## PASS/FAIL summary

| QA area | Repository artifact | Live staging | Result |
|---|---|---|---|
| Git commit synchronization | Local `main` matches `origin/main` | Not applicable | PASS |
| Fresh production build | 20 routes prerendered | Older artifact deployed | REPOSITORY PASS / STAGING FAIL |
| Complete test suite | 17/17 passed | Not applicable | PASS |
| Intended route availability | All 19 exported | All 19 return 200 | PASS |
| Production canonicals | Present on all 19 | Present only on `/` | FAIL |
| Generated production sitemap | Exact 19 URLs | Exact 19 production URLs | PASS |
| Robots file | Correct static file | Correct static file served | PASS |
| Staging noindex | Exact-host `.htaccess` rule present | Header absent on every checked route | FAIL — LAUNCH BLOCKER |
| Production indexability | No local production noindex; exact staging-host isolation | Current WordPress production is indexable | PASS, post-cutover verification required |
| HTTP → HTTPS | Correct local Apache rule/test | Staging HTTP returns 200 | FAIL |
| `www` → apex | Correct local rule/test | Current production returns direct 301 | PASS |
| Clean-route normalization | Generated from exported routes; tests pass | Slash, `.html`, and `/index` aliases return 200 | FAIL |
| Unknown URL 404 | Local Apache test passes | Returns true 404 | PASS |
| Direct 404 aliases | Local nonrecursive tests pass | Return 200 | FAIL |
| Legacy non-city redirects | Correct production-only rules/tests | Current old WordPress pages return 200 | DEPLOYMENT VERIFICATION REQUIRED |
| Reserved city legacy URLs | No redirect rules; inventory preserved | Current WordPress pages still return 200 | PASS IN REPOSITORY / POST-CUTOVER CHECK REQUIRED |
| Global business schema | Stable contractor entity on all local pages | Stable contractor entity present | PASS |
| Page-specific schema | Correct local catalog/Service/FAQ/Breadcrumb inventory | Missing from live staging | FAIL |
| Staging-domain leakage | None in local canonicals, sitemap, or schema | No staging URLs found in the limited live metadata that exists | PASS |
| Internal links | Automated export test passes | All discovered internal links return 200 | PASS |
| Referenced assets | Automated export test passes | Existing deployed assets return 200 | PASS |
| Responsive derivatives | 116 generated; tests pass | Representative candidates return 404 | FAIL |
| Mobile performance | Prompt 5 artifact materially improved | Old performance profile remains live | FAIL FOR STAGING APPROVAL |
| Representative axe checks | Zero violations on current artifact | Existing violations remain | FAIL FOR STAGING APPROVAL |
| Inquiry form static output | Endpoint and complete form tests pass | No live submission made | MANUAL VERIFICATION REQUIRED |

## Final URL inventory and production canonical inventory

All 19 routes below are intended to be indexable after production deployment. In the current repository artifact, every route exists as exported static HTML, has a production canonical, appears exactly once in the sitemap, is allowed by robots, and is reachable through internal links.

| Route | Expected production status | Local canonical | Sitemap | Robots | Internal discovery | Live staging status | Live staging canonical |
|---|---:|---|---|---|---|---:|---|
| `/` | 200 | `https://versatileedgellc.com` | Included | Allowed | Yes | 200 | `https://versatileedgellc.com` |
| `/about` | 200 | `https://versatileedgellc.com/about` | Included | Allowed | Yes | 200 | Missing |
| `/services` | 200 | `https://versatileedgellc.com/services` | Included | Allowed | Yes | 200 | Missing |
| `/services/whole-home-renovations` | 200 | `https://versatileedgellc.com/services/whole-home-renovations` | Included | Allowed | Yes | 200 | Missing |
| `/services/interior-remodeling` | 200 | `https://versatileedgellc.com/services/interior-remodeling` | Included | Allowed | Yes | 200 | Missing |
| `/services/kitchen-renovations` | 200 | `https://versatileedgellc.com/services/kitchen-renovations` | Included | Allowed | Yes | 200 | Missing |
| `/services/bathroom-renovations` | 200 | `https://versatileedgellc.com/services/bathroom-renovations` | Included | Allowed | Yes | 200 | Missing |
| `/services/porches-and-decks` | 200 | `https://versatileedgellc.com/services/porches-and-decks` | Included | Allowed | Yes | 200 | Missing |
| `/services/home-additions` | 200 | `https://versatileedgellc.com/services/home-additions` | Included | Allowed | Yes | 200 | Missing |
| `/services/window-replacement` | 200 | `https://versatileedgellc.com/services/window-replacement` | Included | Allowed | Yes | 200 | Missing |
| `/projects` | 200 | `https://versatileedgellc.com/projects` | Included | Allowed | Yes | 200 | Missing |
| `/projects/hutter-whole-house-remodel-addition` | 200 | `https://versatileedgellc.com/projects/hutter-whole-house-remodel-addition` | Included | Allowed | Yes | 200 | Missing |
| `/projects/johnson-bathroom` | 200 | `https://versatileedgellc.com/projects/johnson-bathroom` | Included | Allowed | Yes | 200 | Missing |
| `/projects/brown-bathroom` | 200 | `https://versatileedgellc.com/projects/brown-bathroom` | Included | Allowed | Yes | 200 | Missing |
| `/projects/walsh-sunroom-deck` | 200 | `https://versatileedgellc.com/projects/walsh-sunroom-deck` | Included | Allowed | Yes | 200 | Missing |
| `/projects/janet-home-addition` | 200 | `https://versatileedgellc.com/projects/janet-home-addition` | Included | Allowed | Yes | 200 | Missing |
| `/process` | 200 | `https://versatileedgellc.com/process` | Included | Allowed | Yes | 200 | Missing |
| `/contact` | 200 | `https://versatileedgellc.com/contact` | Included | Allowed | Yes | 200 | Missing |
| `/privacy` | 200 | `https://versatileedgellc.com/privacy` | Included | Allowed | Yes | 200 | Missing |

The root canonical serializes without a trailing slash in the rendered link value while resolving to the same absolute root URL as the sitemap’s `https://versatileedgellc.com/`. Automated URL comparison normalizes these as equivalent.

### URL inventory result

- Repository artifact: PASS
- Live staging: FAIL because 18 production canonicals are missing
- No obsolete, duplicate, staging-host, or 404 URLs appear in the generated static sitemap
- No intended route is accidentally blocked by robots
- No intended route is missing from internal discovery

## HTTP and status expectations

### Canonical host and route expectations after static production deployment

| Request class | Expected status | Expected destination/behavior |
|---|---:|---|
| `http://versatileedgellc.com/<path>` | 301 | Same path on `https://versatileedgellc.com` |
| `https://www.versatileedgellc.com/<path>` | 301 | Same path on HTTPS apex |
| `http://www.versatileedgellc.com/<path>` | 301 | Directly to HTTPS apex; no chain |
| Valid clean route | 200 | Exported page |
| Valid route with trailing slash | 301 | Matching clean route without slash |
| Valid route with `.html` | 301 | Matching clean route without `.html` |
| `/index`, `/index/`, `/index.html` | 301 | `/` |
| Unknown route | 404 | Custom `404.html` rendered as a true 404 |
| `/404`, `/404/`, `/404.html` | 404 | Custom 404 without recursive ErrorDocument handling |
| Static asset | 200 | Real file served directly |

The route-normalization allowlist is generated during post-build from exported indexable canonicals. It is not a manually maintained list. Future exported city pages or other valid routes will be incorporated automatically.

### Live staging status matrix

| Live request | Expected | Actual | Result |
|---|---:|---:|---|
| `https://staging.versatileedgellc.com/` | 200 | 200 | PASS |
| `http://staging.versatileedgellc.com/about` | 301 to HTTPS | 200 | FAIL |
| `/about/` | 301 to `/about` | 200 | FAIL |
| `/about.html` | 301 to `/about` | 200 | FAIL |
| `/index` | 301 to `/` | 200 | FAIL |
| `/index/` | 301 to `/` | 200 | FAIL |
| `/index.html` | 301 to `/` | 200 | FAIL |
| `/definitely-not-a-real-page` | 404 | 404 | PASS |
| `/404` | 404 | 200 | FAIL |
| `/404/` | 404 | 200 | FAIL |
| `/404.html` | 404 | 200 | FAIL |
| `/robots.txt` | 200 | 200 | PASS |
| `/sitemap.xml` | 200 | 200 | PASS |

The pattern proves that the approved `.htaccess` rules are not active for the current staging document root. Possible hosting causes include an omitted hidden file, upload to the wrong document root, disabled overrides, or unavailable/disabled Apache modules. The audit does not guess which one applies; IONOS configuration and the deployed filesystem must be checked.

### Current production host behavior

The production host is still serving the old WordPress site:

- `http://versatileedgellc.com/` returns a direct 301 to `https://versatileedgellc.com/` — PASS.
- `https://www.versatileedgellc.com/` returns a direct 301 to the HTTPS apex — PASS.
- `http://www.versatileedgellc.com/` returns a direct 301 to the HTTPS apex — PASS.
- `https://versatileedgellc.com/` returns 200 — PASS.
- The three non-city WordPress legacy URLs currently return 200 because the static site is not deployed yet.
- Sample city-targeted WordPress legacy URLs currently return 200 because the old WordPress site remains live.

Current production host normalization is good, but static-site legacy redirect behavior cannot be verified live until cutover.

## Legacy URL verification

The approved production-only non-city redirects in the generated `.htaccess` are:

| Legacy URL | Final production destination | Expected status |
|---|---|---:|
| `/about-versatile-edge` | `https://versatileedgellc.com/about` | 301 |
| `/services1` | `https://versatileedgellc.com/services` | 301 |
| `/contact-versatile-edge-llc` | `https://versatileedgellc.com/contact` | 301 |

Each redirect uses an absolute final HTTPS/apex target, combining path and host/scheme normalization in one hop.

City-targeted legacy URLs remain in `deployment/LEGACY-URL-INVENTORY.md` and have no redirect rules. They are reserved for reassignment to matching future city pages. The static deployment should return a true 404 for them until a matching page and approved redirect exist. A broad wildcard redirect is intentionally absent.

Repository legacy tests: PASS.

Live post-cutover behavior: deployment verification required.

## Robots verification

### Repository/static artifact

Generated `robots.txt` content:

```text
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://versatileedgellc.com/sitemap.xml
```

Results:

- General crawling allowed: PASS
- Inquiry API excluded: PASS
- No intended indexable page excluded: PASS
- Production sitemap declared: PASS
- No staging URL present: PASS

### Live staging

Staging serves the same robots file with HTTP 200. This is correct because robots blocking is not a reliable noindex mechanism and could prevent crawlers from seeing an HTTP noindex directive.

Robots delivery: PASS.

Staging indexing protection: FAIL because the separate `X-Robots-Tag` safeguard is absent.

### Current production

Production still serves the WordPress robots file:

```text
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php

Sitemap: https://versatileedgellc.com/sitemap_index.xml
```

This confirms the static artifact has not been deployed to production. It is expected before cutover but must be replaced and rechecked after deployment.

## Sitemap verification

The post-build script generates `dist/client/sitemap.xml` from exported indexable production canonicals. Manual duplication between a route list and the sitemap is avoided.

### Repository artifact results

- URL count: 19
- Unique URL count: 19
- All URLs use `https://versatileedgellc.com/`: PASS
- Every intended indexable route included: PASS
- `/404` excluded: PASS
- No staging URLs: PASS
- No duplicate URLs: PASS
- No obsolete URLs: PASS
- No accidentally noindexed URL included: PASS

### Live staging results

Staging `/sitemap.xml` returns HTTP 200 and contains the same 19 production URLs. It contains no staging URLs.

Live sitemap content: PASS.

### Current production results

The old WordPress `/sitemap.xml` returns 301 to `/sitemap_index.xml`, which returns HTTP 200 with an `X-Robots-Tag: noindex` header on the XML response. That XML response header does not noindex the production HTML pages; it is part of the current WordPress sitemap handling.

The static sitemap cannot be verified on production until cutover.

## Staging noindex verification

The generated `.htaccess` uses an exact hostname condition:

- Exact staging host matched: `staging.versatileedgellc.com`
- Intended header: `X-Robots-Tag: noindex, nofollow`
- Production apex and `www` cannot match the condition
- No build-time environment switch can accidentally noindex production

Repository rule and automated test: PASS.

Live staging result:

- `X-Robots-Tag` on homepage: absent
- `X-Robots-Tag` across all 19 audited routes: absent
- Meta robots noindex across all 19 audited routes: absent
- Staging robots allows crawling

Live staging noindex: FAIL — LAUNCH BLOCKER.

The staging site is currently eligible to become an indexed duplicate. This must be corrected at the hosting/deployment layer before launch approval.

## Production indexability verification

### Repository artifact

- All 19 intended production routes lack noindex directives: PASS
- Robots permits all 19 routes: PASS
- All 19 have production canonicals: PASS
- All 19 appear in the sitemap: PASS
- Staging-only noindex condition cannot match production: PASS
- The custom 404 has `noindex` and is excluded from the sitemap: PASS

### Current production

- Homepage status: 200
- Homepage `X-Robots-Tag`: absent
- Homepage meta noindex: absent
- Homepage canonical: `https://versatileedgellc.com/`

Current WordPress production homepage indexability: PASS.

Final static production indexability: verification required immediately after cutover.

## Redirect and 404 verification

### Repository and generated Apache configuration

The complete Apache integration test passed. It verifies:

- HTTP/HTTPS and host normalization
- Exact-route clean URL normalization
- `.html`, trailing-slash, and `/index` behavior
- No normalization of unknown routes
- Production-only legacy redirects
- No city-targeted legacy redirects
- Clean-route file serving
- Unknown-route true 404 behavior
- Direct `/404`, `/404/`, and `/404.html` true 404 behavior
- Nonrecursive `ErrorDocument 404 /404.html` rendering

Repository result: PASS.

### Live staging

- Unknown-route true 404: PASS
- HTTP → HTTPS: FAIL
- Slash normalization: FAIL
- `.html` normalization: FAIL
- `/index` normalization: FAIL
- Direct 404 aliases: FAIL

Live staging result: FAIL.

## Structured-data inventory

Every exported page contains one consistent global `GeneralContractor` entity with stable production ID:

`https://versatileedgellc.com/#contractor`

Nested `AdministrativeArea` and `City` types describe the visible service area within that entity and are not duplicate business entities.

| Route group | Expected/local structured data beyond global contractor | Repository result | Live staging result |
|---|---|---|---|
| `/` | Complete `OfferCatalog` with seven `Offer`/`Service` entries | PASS | Missing |
| `/about` | No page-specific schema | PASS | PASS |
| `/services` | Complete `OfferCatalog` with seven `Offer`/`Service` entries | PASS | Missing |
| Seven service detail pages | One matching `Service`, exact visible `FAQPage`, and `BreadcrumbList` | PASS | Missing on all seven |
| `/projects` | No page-specific schema | PASS | PASS |
| Five project detail pages | Matching `BreadcrumbList` only | PASS | Missing on all five |
| `/process` | No page-specific schema | PASS | PASS |
| `/contact` | No page-specific schema | PASS | PASS |
| `/privacy` | No page-specific schema | PASS | PASS |
| Direct 404 document | Inherited contractor schema retained; page noindexed | PASS locally | Old live behavior |

Repository schema checks confirm:

- One stable business entity: PASS
- Production-domain GeneralContractor URLs: PASS
- Seven-service catalog completeness: PASS
- Catalog only where all seven services are visibly represented: PASS
- One matching Service per service-detail page: PASS
- FAQ schema/content parity: PASS
- Service and project breadcrumb hierarchy/URLs: PASS
- No duplicate/conflicting contractor entities: PASS
- No staging URLs in JSON-LD: PASS
- No unsupported page-specific schema on unrelated routes: PASS

Live staging contains only the global `GeneralContractor` entity on every audited page. The missing approved detail schemas prove that the current artifact is stale.

## Staging artifact/version verification

The fresh local homepage and live staging homepage have different SHA-256 hashes:

- Local `dist/client/index.html`: `d0da68583b260e123abf2b3d6e09d158178cbe64271fa0a15bb434e406128ef2`
- Live staging homepage: `093551cc9948fcd8c31255865d584ade2a69c08f58626e0c396dd23bbe45a3b3`

CSS fingerprint:

- Current local artifact: `/_next/static/css/index.Yqfu44OL.css`
- Live staging artifact: `/_next/static/css/index.Ds7_yOiB.css`

Representative generated assets:

| Staging asset request | Expected after current deployment | Current status |
|---|---:|---:|
| `/images/projects/hutter-kitchen-04-640w.webp` | 200 | 404 |
| `/images/projects/hutter-kitchen-04-1280w.webp` | 200 | 404 |
| `/images/projects/hutter-kitchen-04-1920w.webp` | 200 | 404 |

Current live homepage images have no `srcset`, no `fetchpriority`, and no approved responsive loading attributes. The local export generated 116 responsive derivatives.

Artifact/version result: FAIL — LAUNCH BLOCKER.

## Broken-link and referenced-asset check

### Repository artifact

The rendered-output test traversed every root-relative internal link in all 19 public HTML documents and resolved it to an exported file. It also checked direct `src`/`poster` references and every generated `srcset` candidate.

- Broken internal page links: 0
- Missing directly referenced local assets: 0
- Missing responsive candidates: 0
- No-upscaling violations: 0

Repository result: PASS.

### Live staging

The live crawl discovered the 19 page routes plus local fonts, CSS, JavaScript, brand assets, and deployed project images. Every discovered link/asset in the old staging HTML returned 200.

- Broken discovered internal page links: 0
- Missing assets referenced by the currently deployed HTML: 0

Live current-markup result: PASS.

The current repository’s generated responsive derivatives are not referenced by the old live HTML and return 404 when requested, so staging still fails artifact-completeness verification.

External telephone behavior was not treated as an HTTP link. No inquiry was submitted during this audit.

## Static export, build, and test results

Fresh command result: `npm test` passed.

### Build

- Vinext version: 1.0.0-beta.2
- Vite version reported by build: 8.0.13
- Client references: 261 modules transformed
- Server references: 104 modules transformed
- RSC environment: 259 modules transformed
- Client environment: 1,904 modules transformed
- SSR environment: 105 modules transformed
- Prerendered routes: 20
- Skipped routes: 0
- CDN warmup paths discovered: 19
- Post-build IONOS output preparation: PASS
- Static output path: `dist/client`
- Exported HTML documents: 20, including `404.html`
- Intended sitemap URLs: 19
- Generated responsive derivatives: 116

Build emitted only the existing Node experimental `glob` warning. It did not produce a compile or export error.

### Complete test suite

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

Final test count: 17 passed, 0 failed, 0 skipped, 0 cancelled.

Repository build/test result: PASS.

## Representative mobile performance results

The latest controlled live staging run and the final Prompt 5 artifact run used the same 390 × 844 mobile/throttling profile. Current staging was re-fingerprinted during this audit and still serves the same pre–Prompt 5 HTML/CSS/image asset set as that live measurement.

| Page | Current staging LCP | Current staging transfer | Current staging CLS | Current repository artifact LCP | Artifact transfer | Artifact CLS |
|---|---:|---:|---:|---:|---:|---:|
| Homepage | 5.764 s | 2,563,860 bytes / 2.56 MB | 0 | 0.744 s | 1,689,340 bytes / 1.69 MB | 0 |
| Kitchen service | 5.380 s | 2,838,554 bytes / 2.84 MB | 0 | 1.276 s | 1,711,558 bytes / 1.71 MB | 0 |
| Hutter project | 3.028 s | 2,724,168 bytes / 2.72 MB | 0 | 1.772 s | 1,108,560 bytes / 1.11 MB | 0 |
| Contact | 0.752 s | 605,843 bytes / 0.61 MB | 0 | 0.600 s | 606,483 bytes / 0.61 MB | 0 |

Interpretation:

- Homepage staging LCP is 5.020 seconds slower than the current artifact.
- Service staging LCP is 4.104 seconds slower than the current artifact.
- Project staging LCP is 1.256 seconds slower than the current artifact.
- Contact performance is effectively unchanged because its LCP is text rather than a large project image.
- CLS is zero in both artifacts on all four representative pages.
- The large image-led differences align with staging loading original photographs and the current artifact loading responsive candidates.

Field INP is not available before production traffic. Synthetic timing cannot replace field INP.

Current repository performance result: PASS for the approved Prompt 5 target.

Live staging performance result: FAIL for final staging approval because the optimized artifact is not deployed.

## Accessibility blockers

The most recent controlled live staging axe results, tied to the unchanged old staging fingerprint, are:

| Page | Rule findings | Affected nodes | Severity |
|---|---|---:|---|
| Homepage | `color-contrast` (25), `region` (1) | 26 | Serious + moderate |
| Kitchen service | `landmark-complementary-is-top-level` (1), `region` (1) | 2 | Moderate |
| Hutter project | `color-contrast` (18), `region` (1) | 19 | Serious + moderate |
| Contact | `color-contrast` (1), `landmark-complementary-is-top-level` (1), `region` (1) | 3 | Serious + moderate |

The current Prompt 5 repository artifact produced zero axe violations on all four representative pages under the same test setup. Repository rendered-output tests additionally confirm:

- Accessible muted text token
- Separate accessible dark-gold foreground token
- Removal of the problematic global anchor color override
- Explicit `:focus-visible` treatment
- 44 × 44 mobile menu target
- Enlarged utility phone target
- Fixed mobile CTA inside the header landmark
- Neutral service/contact semantic containers instead of inappropriate `<aside>` elements
- `role="alert"` for failed form feedback and `role="status"` for success

Repository accessibility result: PASS.

Live staging accessibility result: FAIL for final staging approval.

Automated axe testing does not replace screen-reader, zoom/reflow, or real-device keyboard/touch review. Those remain appropriate manual launch checks after the current artifact is deployed.

## Inquiry form and Turnstile limitation

The repository test confirms that the static export contains the complete inquiry form and the PHP inquiry endpoint. Prompt 5 preserved the form fields, consent, honeypot, file upload, Turnstile integration, and submission logic.

No live inquiry was submitted during this read-only audit. A real staging submission requires:

- The staging hostname to be authorized for the configured Turnstile site key
- Valid server-side Turnstile configuration
- PHP endpoint execution in the deployed IONOS environment
- Confirmation of successful delivery and failure-state behavior

Live Turnstile/form submission remains a required manual deployment verification.

## Hosting-only tasks remaining

The following tasks must be completed before another launch verdict:

1. Deploy the exact contents of the fresh `dist/client` directory to the actual staging document root.
2. Include hidden files, especially `dist/client/.htaccess`. FTP and hosting file managers may omit dotfiles unless explicitly configured.
3. Include all generated responsive image candidates under `dist/client/images/projects/`.
4. Confirm that the live staging HTML and CSS fingerprints match the fresh artifact.
5. Confirm Apache permits `.htaccess` overrides for the staging document root.
6. Confirm `mod_rewrite`, `mod_headers`, and `mod_setenvif` behavior needed by the approved rules.
7. Verify `X-Robots-Tag: noindex, nofollow` on the homepage, all 19 intended routes, redirects, and error responses on the exact staging host.
8. Verify production responses do not receive the staging header.
9. Rerun the HTTP/status matrix for HTTP → HTTPS, trailing slash, `.html`, `/index`, direct 404 aliases, and unknown routes.
10. Rerun the full canonical and structured-data inventory against live staging.
11. Verify responsive `srcset`, `sizes`, intrinsic dimensions, lazy loading, and hero fetch priority in live HTML.
12. Rerun representative mobile performance and axe checks on the newly deployed staging artifact.
13. Perform a real staging Turnstile/inquiry-form submission and verify delivery and error announcement.
14. After staging passes, deploy the exact same artifact to production without rebuilding a different artifact.
15. Confirm the old WordPress installation is removed from or isolated outside the active production document root as appropriate for rollback policy.
16. Verify production HTTP and `www` normalization remains single-hop after cutover.
17. Verify the three approved non-city legacy redirects return single-hop 301 responses to their final destinations.
18. Verify reserved city-targeted legacy URLs have not acquired broad or incorrect redirects.
19. Verify production `/robots.txt` is the static file and `/sitemap.xml` returns the generated static sitemap directly.
20. Verify all intended production pages are indexable and no production response contains the staging noindex header.
21. Submit or refresh `https://versatileedgellc.com/sitemap.xml` in the appropriate search-engine webmaster tools after production validation.

## Recommendations

### Required before launch

- Treat the current staging environment as unapproved and potentially indexable.
- Correct the staging deployment/Apache handling before further repository changes.
- Deploy the already tested artifact rather than editing code to compensate for missing hosting behavior.
- Do not launch production until the exact staging noindex, redirect, canonical, schema, responsive-image, performance, and accessibility checks pass live.

### Immediately after staging redeployment

- Run the same 19-route metadata/schema crawl.
- Run the same status matrix.
- Confirm every staging response has the noindex header.
- Confirm all generated responsive candidates return 200.
- Repeat the four-page mobile/axe audit.
- Complete the live form/Turnstile test.

### Immediately after production cutover

- Verify the staging noindex rule did not leak to production.
- Verify static robots and sitemap delivery.
- Verify all 19 production canonicals and schemas.
- Verify host/scheme normalization and legacy redirects without chains.
- Verify true 404 behavior.
- Verify the inquiry form in production.
- Monitor Search Console indexing and Core Web Vitals as field data becomes available.

## Corrections made during this audit

None.

No code, configuration, hosting state, content, redirect, or deployment correction was made. Only this report file was created. The identified defects require deployment/hosting correction and subsequent live verification. No new repository correction is recommended from the evidence gathered in this audit.

## Final launch recommendation

Do not launch the static site to production from the current staging state.

The current repository artifact is a valid release candidate: it builds, exports, passes 17/17 tests, contains the complete canonical/sitemap/schema/redirect/accessibility/responsive-image work, and keeps staging noindex isolated from production. However, staging is not running that release candidate and is not enforcing its noindex or normalization rules. Because staging cannot presently validate the artifact that would be launched, the only responsible final verdict is:

# NOT READY

Reassess the verdict after the exact `dist/client` artifact and `.htaccess` are active on staging and all hosting-only verification items pass.
