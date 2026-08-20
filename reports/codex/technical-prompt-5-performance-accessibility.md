# Technical Prompt 5: Performance, Mobile, and Accessibility Report

## Report purpose and scope

This report preserves the complete findings, implementation details, and validation results from Technical Prompt 5 for the Versatile Edge LLC website. The work was deliberately measurement-first and limited to verified performance, mobile usability, and accessibility defects. It preserved the existing visual design, typography, branding, routes, static-export architecture, IONOS deployment structure, header behavior, inquiry form, imagery, and site content.

The representative pages were:

- Homepage: `/`
- Service detail: `/services/kitchen-renovations`
- Project detail: `/projects/hutter-whole-house-remodel-addition`
- Contact page: `/contact`

The approved implementation is contained in commit `b2e17c2d19346bd4031de5f5f21500783ce70c32` (`Improve mobile performance and accessibility`). The implementation changed 17 repository files with 804 additions and 38 deletions. The temporary measurement harness, `/private/tmp/ve-mobile-audit.mjs`, was outside the repository and was not committed.

## Audit methodology and testing conditions

### Measurement profile

Before and after measurements used the same synthetic mobile profile so the results were directly comparable:

- Browser viewport: 390 × 844 CSS pixels
- Device scale factor: 3
- Mobile emulation: enabled
- CPU throttling: 4× slowdown
- Network latency: 100 ms
- Download throughput: 4 Mbps
- Upload throughput: 1 Mbps
- Browser cache: disabled
- Browser: headless Google Chrome controlled through the Chrome DevTools Protocol
- Chrome version currently associated with the preserved environment: 151.0.7922.137
- Node.js: 22.14.0
- npm: 10.9.2
- Accessibility engine: axe-core 4.11.4
- Observation period: navigation through document completion plus a five-second post-load observation window

The audit harness recorded:

- Largest Contentful Paint entries through `PerformanceObserver`
- Cumulative Layout Shift entries, excluding shifts following recent user input
- Long tasks and supported event timing entries
- Navigation timing
- Resource count and transfer, decoded, image, JavaScript, CSS, and font bytes
- Image source, selected `currentSrc`, source and rendered dimensions, viewport position, `srcset`, `sizes`, `loading`, and fetch priority
- Heading hierarchy
- Form label associations and relevant ARIA attributes
- Interactive-control dimensions and small mobile targets
- Keyboard tab order and computed focus indication
- Full axe violation data for the rendered document

This was not a field Core Web Vitals collection. It did not use real-user Chrome UX Report data. Lighthouse CLI was not available as the acceptance mechanism, so the reported LCP and CLS figures are direct browser performance-entry measurements under a controlled Lighthouse-like mobile profile rather than Lighthouse scores.

### Code and rendered-output audit

The audit also inspected the application and the generated static export for:

- Hero and gallery source dimensions
- Above-the-fold image priority
- Below-the-fold lazy loading
- Responsive image candidates and sizing hints
- Intrinsic image dimensions
- Avoidance of image upscaling
- Client-side JavaScript ownership and necessity
- Local font loading
- Heading and landmark structure
- Alt-text mechanics
- Keyboard navigation and focus visibility
- Form labels, submission feedback, and error announcement
- Color contrast
- Mobile tap targets
- Referenced assets and internal links
- Static-export compatibility

### Comparison procedure

The before run measured the unoptimized Prompt 1–4 artifact. The final after run measured a fresh Prompt 5 production build served from the generated static output. Cache was disabled for each page. An intermediate after run was also performed during implementation; it exposed stale/unrefreshed served output for some clean routes because service and project transfer totals remained at their original-image values. That run was not used as the final comparison. The server/output was refreshed and the complete four-page run was repeated, producing the final results below.

## Baseline findings before implementation

### Performance and image delivery

The homepage, service page, and project page LCP elements were large project photographs delivered at their original dimensions without responsive candidates:

| Page | LCP element | Original source dimensions | Approximate rendered mobile dimensions | Before behavior |
|---|---|---:|---:|---|
| Homepage | `hutter-kitchen-04.webp` | 6240 × 4160 | 390 × 835 | Original image; no `srcset`; no explicit priority |
| Kitchen service | `hutter-kitchen-04.webp` | 6240 × 4160 | 390 × 520 | Original image; no `srcset`; no explicit priority |
| Hutter project | `hutter-living-03.webp` | 1800 × 1200 | 390 × 571 | Original image; no `srcset`; no explicit priority |
| Contact | Text `<h1>` | Not applicable | Not applicable | No material image-driven LCP issue |

The three image-led pages were transferring photographs far larger than the mobile viewport required. Hero images did not have `fetchpriority="high"`, explicit eager loading, responsive `srcset`, or route-appropriate `sizes`. Below-the-fold site, service, and gallery images were not consistently lazy loaded or asynchronously decoded.

The header and footer logo elements lacked explicit intrinsic dimensions. The measured CLS was already zero on the four representative pages, but dimensions were still warranted to make image geometry deterministic and protect against future layout instability.

### JavaScript and fonts

The baseline transferred approximately 432.7 KB of JavaScript on the homepage, service page, and project page and approximately 439.9 KB on the contact page. The additional contact JavaScript is associated with the interactive inquiry form. The client-side modules supported actual interactions: mobile navigation, project filtering, back-to-top behavior, and the inquiry form/Turnstile integration. No speculative client-component removal was made because the audit did not identify a safe removal with a meaningful benefit that would preserve all existing functionality.

The site used locally generated Manrope and Playfair Display WOFF2 resources. The representative pages transferred 63,636 font bytes. No third-party font host or separate font architecture was introduced, and font loading was not identified as the dominant LCP bottleneck.

### Accessibility baseline

The baseline axe results were:

| Page | axe violations | Affected nodes | Details |
|---|---:|---:|---|
| Homepage | 2 rule types | 26 | `color-contrast`: 25 serious nodes; `region`: 1 moderate node |
| Kitchen service | 2 rule types | 2 | `landmark-complementary-is-top-level`: 1 moderate node; `region`: 1 moderate node |
| Hutter project | 2 rule types | 19 | `color-contrast`: 18 serious nodes; `region`: 1 moderate node |
| Contact | 3 rule types | 3 | `color-contrast`: 1 serious node; `landmark-complementary-is-top-level`: 1 moderate node; `region`: 1 moderate node |

Verified accessibility defects included:

- The muted foreground token `#687481` was borderline on the paper background, measuring approximately 4.44:1 against `#f7f7f4`, below the normal-text 4.5:1 target.
- The bright brand gold `#f1b544` was being used as small foreground text on light backgrounds. It measured approximately 1.71:1 against `#f7f7f4` and 1.84:1 against white, so it was appropriate as a decorative/background accent but not as small foreground text.
- The global `a { color: inherit; }` rule overrode expected link-color mechanics too broadly and contributed to link contrast behavior outside components that already supplied intentional colors.
- There was no consistent, explicit sitewide `:focus-visible` treatment for keyboard users.
- The mobile menu button was smaller than the 44 × 44 CSS-pixel target.
- The utility-bar phone link did not provide a 44-pixel-high hit area.
- The fixed mobile consultation CTA was outside the header landmark, producing an orphaned-region finding.
- A service-detail support panel and the contact-page introduction used `<aside>` even though they were not complementary content independent of their surrounding main content. This produced nested/inappropriate complementary-landmark findings.
- Inquiry-form success and failure feedback both used `role="status"`; failures needed the more assertive `role="alert"` while successful submission feedback should remain a polite status.

The rendered headings, visible form labels, required-field mechanics, image alt-text approach, skip link, and basic keyboard reachability were otherwise sound. The audit found no reason to rewrite headings or page content.

## Implemented corrections

### Responsive-image component

A reusable `ResponsiveImage` component was added. It accepts the existing source and alt text plus route-specific `sizes`, optional classes, priority, loading behavior, and decorative-image semantics. Its build marker requests the standard candidate set `640,1280,1920`, but the post-build process filters that list against the source width so candidates larger than the source are never generated.

Rendered responsive images receive:

- `srcset` containing only valid generated candidates
- A layout-specific `sizes` value
- Source intrinsic `width` and `height`
- `decoding="async"`
- `loading="lazy"` by default
- `loading="eager"` and `fetchpriority="high"` only for true hero/LCP images

Decorative page-hero images retain empty alt text and receive `aria-hidden="true"`. Meaningful homepage, service, project, gallery, and about-page images retain descriptive alt text.

### Build-pipeline integration

Responsive generation was integrated into the existing `scripts/prepare-static-output.mjs` post-build pipeline rather than maintaining derivative files manually.

For each exported HTML file, the post-build process:

1. Finds marked responsive image elements.
2. Resolves their source file from the static export.
3. Reads source metadata through Sharp.
4. Deduplicates and sorts requested widths.
5. Drops any width larger than the source width.
6. Generates WebP derivatives at quality 78 using `withoutEnlargement: true`.
7. Replaces the temporary build marker with the actual `srcset`.
8. Writes the original source dimensions as intrinsic `width` and `height`.
9. Leaves the original source as the fallback `src`.

The fresh export produced 116 responsive derivative assets: 57 at 640 pixels, 50 at 1280 pixels, and 9 at 1920 pixels. These are generated deployment artifacts under `dist/client`, not manually maintained source assets.

The automated tests verify that:

- Build markers do not leak into exported HTML.
- Every responsive image has intrinsic dimensions and `sizes`.
- Every responsive image decodes asynchronously.
- Every candidate file exists.
- No candidate width exceeds its source width.
- Representative page heroes are responsive, eager, and high priority.
- Representative below-the-fold images remain lazy loaded.

### Image usage changes

Responsive delivery was applied to:

- Homepage hero
- Shared service/about/project page heroes
- Homepage featured project image
- Homepage service-area image
- About-page craftsmanship image
- Services-index images
- Service-detail supporting images
- Project-index gallery cards
- Project-detail room galleries

The header logo now has explicit 1040 × 719 intrinsic dimensions and async decoding. The footer logo has the same intrinsic dimensions, async decoding, and lazy loading.

Project-detail gallery sizing received narrow CSS adjustments to preserve the established composition after intrinsic dimensions were introduced:

- Standard images retain fixed desktop and mobile visual heights.
- Single-image groups can render at their natural aspect ratio.
- The first wide lead image preserves the intended 3:2 desktop composition and established mobile heights.

### Color and focus corrections

The following minimal token and behavior changes were made:

- Muted text changed from `#687481` to `#5f6a76`, improving contrast against `#f7f7f4` from approximately 4.44:1 to 5.14:1.
- A separate `--accent-foreground: #8a5a00` token was introduced for small gold-colored text. It measures approximately 5.52:1 against `#f7f7f4` and 5.93:1 against white.
- The brighter `--accent: #f1b544` remained unchanged for branded fills, borders, icons, and larger decorative accents.
- The global anchor color override was removed while preserving `text-decoration: none`; existing navigation, CTA, footer, project, and text-link colors continue to come from their component or section rules.
- A global `:focus-visible` outline of `3px solid currentColor` with a three-pixel offset was added for anchors, buttons, inputs, selects, textareas, summaries, and video.
- The existing special white focus outline for the back-to-top control was retained.

### Mobile targets and landmarks

- The mobile menu button was set to 44 × 44 pixels and uses grid centering when visible.
- The utility phone link now supplies a minimum 44-pixel hit height while preserving the utility bar’s visual height through balanced negative block margins.
- The fixed mobile consultation CTA was moved inside the site `<header>` landmark without changing its fixed visual position or destination.
- The service-detail `<aside>` was replaced with a neutral `<div class="service-detail-panel">` and corresponding CSS selectors.
- The contact introduction `<aside>` was replaced with a neutral `<div class="contact-intro">` and corresponding responsive CSS selectors.

### Form feedback

The inquiry form now assigns:

- `role="alert"` when `status === "error"`
- `role="status"` for successful/non-error feedback

The form endpoint, fields, required validation, file upload, honeypot, consent checkbox, Turnstile integration, and submission flow were otherwise left unchanged.

## Before-and-after performance results

### LCP

| Page | Before LCP | After LCP | Improvement | Final LCP element |
|---|---:|---:|---:|---|
| Homepage | 7.196 s | 0.744 s | 6.452 s / 89.7% | Responsive hero image |
| Kitchen service | 5.320 s | 1.276 s | 4.044 s / 76.0% | Responsive page-hero image |
| Hutter project | 3.060 s | 1.772 s | 1.288 s / 42.1% | Responsive page-hero image |
| Contact | 0.640 s | 0.600 s | 0.040 s / 6.3% | Text `<h1>` |

The final browser selected a 1280-pixel responsive candidate for each representative image hero at the emulated 3× mobile density. The homepage and service sources offered 640, 1280, and 1920 candidates because their 6240-pixel sources justified all three. The project hero’s 1800-pixel source offered only 640 and 1280 candidates, demonstrating that the pipeline did not upscale to 1920.

### Total transfer size

| Page | Before transfer | After transfer | Difference | Reduction |
|---|---:|---:|---:|---:|
| Homepage | 2,563,597 bytes / 2.56 MB | 1,689,340 bytes / 1.69 MB | −874,257 bytes | 34.1% |
| Kitchen service | 2,838,591 bytes / 2.84 MB | 1,711,558 bytes / 1.71 MB | −1,127,033 bytes | 39.7% |
| Hutter project | 2,724,205 bytes / 2.72 MB | 1,108,560 bytes / 1.11 MB | −1,615,645 bytes | 59.3% |
| Contact | 605,894 bytes / 0.61 MB | 606,483 bytes / 0.61 MB | +589 bytes | −0.1% / effectively unchanged |

Final directly attributed image transfer bytes in the browser resource data were:

- Homepage: 135,333 bytes
- Kitchen service: 214,353 bytes
- Hutter project: 302,015 bytes
- Contact: 64,783 bytes

The contact result remained effectively unchanged because its LCP is text and it has no project-photo hero. The 589-byte difference is measurement/build variation rather than a material regression.

### JavaScript and fonts after implementation

JavaScript remained effectively unchanged, consistent with the decision not to make speculative functionality changes:

- Homepage, service, and project: 432,718 transferred JavaScript bytes, approximately 40 bytes above baseline
- Contact: 440,009 transferred JavaScript bytes, approximately 60 bytes above baseline
- Fonts: 63,636 transferred bytes on each representative page, unchanged

No new client-side image library, animation library, framework, CDN, CMS, or runtime image service was added. Sharp is a build-time development dependency only.

### CLS and responsiveness

| Page | Before CLS | After CLS |
|---|---:|---:|
| Homepage | 0 | 0 |
| Kitchen service | 0 | 0 |
| Hutter project | 0 | 0 |
| Contact | 0 | 0 |

No layout-shift regression was introduced. Intrinsic image dimensions and explicit gallery geometry make the zero-shift behavior more deterministic even though the representative baseline already measured zero.

The final run recorded no long tasks on the homepage, service page, or project page. The contact page recorded one long task during its interactive form/Turnstile-capable client initialization; this did not provide a valid field INP measurement and was not treated as evidence for speculative form rewrites.

## Accessibility results after implementation

| Page | Before affected axe nodes | After affected axe nodes | After violations |
|---|---:|---:|---|
| Homepage | 26 | 0 | None |
| Kitchen service | 2 | 0 | None |
| Hutter project | 19 | 0 | None |
| Contact | 3 | 0 | None |

The final four-page axe run reported zero violations. Specifically:

- The homepage’s 25 contrast nodes and one region node were resolved.
- The service page’s complementary-landmark and region findings were resolved.
- The project page’s 18 contrast nodes and one region node were resolved.
- The contact page’s contrast, complementary-landmark, and region findings were resolved.

Keyboard traversal remained functional. The new focus treatment made focus visible across standard interactive elements without changing the mouse/touch presentation. Form labels remained explicitly associated through native label nesting, required controls retained native validation, and failure messages gained assertive announcement without making success messages unnecessarily disruptive.

Automated axe results do not replace manual assistive-technology testing, but no automated accessibility blocker remained in the tested pages.

## Visual-regression findings

A sitewide visual comparison was performed after the CSS, semantic, and image-delivery changes, with particular attention to the required safeguards:

- Branding colors and the bright gold accent remained visually consistent.
- The navy header, utility bar, desktop navigation, dropdowns, mobile navigation, footer, and logo presentation were preserved.
- Primary and secondary CTAs retained their existing fills, text colors, sizing, and hover treatment.
- Removing the global anchor color override did not unintentionally recolor navigation links, footer links, project links, hero actions, or text links because those contexts already have explicit component/section styles.
- The muted-text change was intentionally subtle while providing a safe contrast margin.
- The darker gold foreground is limited to small service indices, project-room numbers, and process-timeline numbers; the main brand gold remains in decorative and filled uses.
- Page typography, spacing, content order, routes, and overall compositions were preserved.
- Homepage hero, featured-project, and service-area image crops remained consistent.
- Service-page hero and supporting-image layout remained consistent.
- Project-card and project-detail imagery retained the intended crops and gallery rhythm. Explicit gallery height/natural-image classes were added where needed to prevent intrinsic dimensions from changing the established composition.
- Contact-page columns and sticky desktop introduction remained visually unchanged after replacing the inappropriate `<aside>` with a neutral container.
- The mobile fixed CTA remained in the same visual position after moving inside the header landmark.
- The 44-pixel menu and phone targets did not produce unintended header wrapping or navigation displacement.
- Focus outlines appear during keyboard focus, as intended, and do not alter the default pointer presentation.

No unintended visual regression was found in the branding, CTA appearance, navigation, service pages, project pages, links, mobile header behavior, inquiry form, or overall layout. This was a rendered visual inspection, not a formal pixel-diff suite with a numerical image-difference threshold.

## Every repository file changed

The Prompt 5 commit changed the following 17 files:

1. `app/about/page.tsx`
   - Replaced the below-the-fold craftsmanship image with `ResponsiveImage` and supplied a layout-specific `sizes` value.

2. `app/contact/page.tsx`
   - Replaced the inappropriate contact introduction `<aside>` with the neutral `.contact-intro` container.

3. `app/globals.css`
   - Improved the muted text token.
   - Added a separate accessible gold foreground token.
   - Removed the global anchor color inheritance override.
   - Added explicit sitewide `:focus-visible` treatment.
   - Enlarged the mobile menu and utility phone hit areas.
   - Updated service/contact semantic-container selectors.
   - Applied the dark-gold token to small foreground numbering.
   - Added narrowly scoped project-gallery geometry rules to preserve image presentation.

4. `app/page.tsx`
   - Converted the homepage hero, featured project, and service-area images to responsive delivery.
   - Marked only the actual homepage LCP hero as high priority/eager.

5. `app/projects/[slug]/page.tsx`
   - Converted project-detail room images to responsive delivery.
   - Added context-sensitive gallery classes for single, wide, and lead images.

6. `app/services/[slug]/page.tsx`
   - Converted the service supporting image to responsive delivery.
   - Replaced the inappropriate service panel `<aside>` with `.service-detail-panel`.

7. `app/services/page.tsx`
   - Converted all services-index images to responsive delivery.

8. `components/inquiry-form.tsx`
   - Changed failed submission feedback to `role="alert"` while retaining `role="status"` for non-error feedback.

9. `components/page-hero.tsx`
   - Converted shared decorative page heroes to responsive, eager, high-priority images while retaining empty alt text and `aria-hidden` semantics.

10. `components/project-gallery.tsx`
    - Converted project-index card images to responsive, lazy-loaded images.

11. `components/responsive-image.tsx`
    - Added the reusable responsive-image marker/component with alt, decorative, loading, priority, async decoding, and `sizes` mechanics.

12. `components/site-footer.tsx`
    - Added intrinsic logo dimensions, lazy loading, and async decoding.

13. `components/site-header.tsx`
    - Added intrinsic logo dimensions and async decoding.
    - Moved the fixed mobile CTA inside the header landmark.

14. `package-lock.json`
    - Recorded the Sharp dependency tree and reproducible dependency resolution.

15. `package.json`
    - Added `sharp` as a development dependency for build-time derivative generation.

16. `scripts/prepare-static-output.mjs`
    - Added source-metadata inspection, non-upscaling responsive derivative generation, `srcset` injection, intrinsic dimensions, marker removal, and output deduplication.
    - Preserved the existing sitemap, route-normalization, IONOS output, and source-asset cleanup responsibilities.

17. `tests/rendered-html.test.mjs`
    - Expanded asset checking to cover every `srcset` candidate.
    - Added responsive-image, no-upscaling, hero priority, below-fold lazy loading, contrast-token, focus, landmark, mobile-target, and form-error assertions.

The commit totals were 804 additions and 38 deletions.

## Build and test results

The full production build and complete repository test suite passed after implementation:

- Production `vinext build`: passed
- Static prerender: passed
- Exported routes: 20, including the custom 404 document
- IONOS static-output preparation: passed
- Responsive derivative generation: passed
- Generated `srcset` candidate existence checks: passed
- No-upscaling checks: passed
- Hero priority and below-the-fold loading checks: passed
- Internal-link checks: passed
- Referenced-asset checks: passed
- Canonical, sitemap, robots, and static-hosting checks: passed
- Structured-data parsing and parity checks retained from the earlier SEO work: passed
- Rendered accessibility-correction assertions: passed
- Complete Node test suite: 17/17 passed

The production build compiled successfully. The previously observed standalone TypeScript-check stall was not treated as a blocker because the production build compiled the application and the complete required test suite passed; no TypeScript error was produced by the production build.

## Dependency and audit advisories

Prompt 5 added one direct development dependency: `sharp` version range `^0.35.3`. It runs only during the post-build step to inspect image metadata and generate static WebP derivatives. It does not add a browser runtime, hosted image service, CDN, or production Node image endpoint.

Dependency-audit remediation was not folded into Prompt 5 because it would broaden the approved performance/accessibility scope and some suggested remediations require framework/tooling version changes. No automatic `npm audit fix`, forced downgrade, or unrelated dependency update was performed.

A fresh advisory query while preserving this report reported 14 vulnerable packages in the installed dependency graph:

- Critical: 0
- High: 9
- Moderate: 4
- Low: 1
- Total: 14

Direct dependencies identified in that current report include:

- `drizzle-kit`: moderate, through older esbuild loader tooling; the audit suggestion is a semver-major change/downgrade and should not be applied blindly.
- `react-server-dom-webpack`: high; a non-major update to 19.2.8 is reported as available.
- `vinext`: high through `image-size`; the audit suggestion points to an older semver-major-incompatible vinext release and requires framework compatibility review.
- `vite`: high; a non-major update is reported as available, but it must be validated against the pinned vinext toolchain.

Transitive findings currently include `@babel/core`, `@esbuild-kit/core-utils`, `@esbuild-kit/esm-loader`, `brace-expansion`, `esbuild`, `fast-uri`, `image-size`, `js-yaml`, `nanoid`, and `postcss`.

Many findings are in development/build tooling, and the deployed site is a static export, which limits production runtime exposure. That does not make the advisories irrelevant. They should receive a separate dependency-maintenance review with a clean build, static export, full test suite, and staging verification after any version changes. The advisory set is time-sensitive and may differ from the package-registry state at the original Prompt 5 implementation time.

## Remaining limitations

- The measurements are controlled synthetic lab results, not field Core Web Vitals. Real-user LCP, CLS, and INP require production traffic and a field-data source such as CrUX, Search Console Core Web Vitals, or a privacy-appropriate RUM system.
- A valid field INP could not be measured before launch. Synthetic event timing and long-task observations are not a substitute for field INP.
- Lighthouse category scores were not produced; direct performance-entry measurements and axe were used instead.
- The results can vary with CPU scheduling, browser version, server behavior, and network conditions despite using the same throttling profile. The large direction and magnitude of the image-led improvements are nevertheless technically explained by the selected responsive resources and reduced transfer totals.
- The live Cloudflare Turnstile and inquiry-form endpoint require a real allowed hostname and live server execution. Static rendering, labels, roles, and form mechanics were tested, but a live Turnstile token and end-to-end production submission were not exercised as part of this repository-only implementation.
- Automated axe testing cannot prove complete accessibility. Manual screen-reader testing, browser zoom/reflow checks, keyboard review across all interactive states, and testing with user-selected contrast/motion settings remain valuable launch QA.
- The visual comparison was a manual rendered comparison, not an automated pixel-diff regression suite.
- The responsive pipeline generates derivatives during every fresh post-build. Build time and deployment size increase, though browser transfer decreases substantially. Generated derivatives must be included when uploading `dist/client` to IONOS.
- The original high-resolution source photographs remain in `public` for project maintenance. The post-build process continues removing non-WebP archival formats from deployment output as before.
- The current npm advisory set requires a separate dependency-maintenance task; it was not safe to mix automated framework/tool upgrades into this focused change.

## Final assessment and recommendation

The Prompt 5 implementation achieved meaningful, measured mobile performance improvements on every image-led representative page while preserving the website’s design and functionality. LCP improved from 7.196 to 0.744 seconds on the homepage, from 5.320 to 1.276 seconds on the representative service page, and from 3.060 to 1.772 seconds on the representative project page under the same throttling conditions. Transfer size fell by 34.1%, 39.7%, and 59.3% respectively. The contact page remained effectively unchanged, as expected for a text-led page without a large hero photograph.

CLS remained zero on all four pages. Axe findings fell from 26, 2, 19, and 3 affected nodes to zero on the four representative pages. The responsive-image solution is maintainable because it is generated from the existing static output, uses source metadata, avoids upscaling, deduplicates derivative work, and requires no manual candidate inventory.

The final recommendation from Technical Prompt 5 was to retain and ship the implementation. It provides clear performance and accessibility benefit without introducing a new framework, CDN, CMS, runtime image architecture, animation library, or visual redesign. Production field monitoring, live Turnstile/form testing, manual assistive-technology review, and a separately scoped dependency-advisory review remain appropriate follow-up work, but none invalidates the measured Prompt 5 improvements.
