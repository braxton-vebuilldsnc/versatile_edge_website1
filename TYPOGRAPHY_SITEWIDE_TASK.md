# Versatile Edge — Sitewide Typography Normalization

## Scope
Review and normalize typography across the ENTIRE website, not representative pages only. This includes homepage, all service pages, all service-area/city pages, all project pages, services/projects indexes, About, Process, Contact, Privacy where applicable, Renovation Talk landing/article pages, header, footer, cards, CTAs, forms, FAQs, and every shared component.

## Visual reference
Use the approved third screenshot from the Sept. 17 review as the visual hierarchy standard: eyebrow/label -> strong display headline -> substantial readable supporting/body copy. Do not allow normal paragraph content to collapse into tiny UI/meta-sized text beneath large headings.

## Required typography system
Establish a small consistent type scale/tokens for:
- display/H1
- section/H2
- subsection/H3
- lead/supporting copy
- normal body copy
- small/meta/UI copy
- labels/eyebrows/buttons/navigation

Normal body copy should be consistently readable across sections and components. Small text is reserved for genuine UI/meta uses such as navigation, dates, image credits, eyebrow labels, numbering, captions, and compact controls. Eliminate arbitrary component-specific paragraph sizes unless there is a clear semantic/design reason.

## Audit requirements
Inventory every font-size declaration in global CSS and component/page styles. Map each to a semantic typography role. Remove/replace inconsistent values such as the scattered .82/.84/.87/.88/.9rem paragraph rules where they are being used for ordinary explanatory copy. Preserve intentional small UI/meta text.

Do not simply make everything the same size. Preserve hierarchy, but make the hierarchy consistent.

## QA
After implementation:
1. Production build/static export.
2. Enumerate every generated route.
3. Visually QA EVERY route at desktop width and mobile width, not a sample.
4. Specifically inspect every transition from large heading to paragraph/supporting text for disproportionate size drops.
5. Check cards, service-area sections, service detail sections, project stories, About/Process, forms, FAQs, footer, and Renovation Talk.
6. Verify no clipping/overflow/regression caused by increased body sizes.
7. Run broken-link/regression checks and git diff --check.

## Deployment
Do not deploy to production as part of the typography normalization. Review first.