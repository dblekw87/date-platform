# DATE Responsive Audit - 2026-08-08

## Scope

- Surface: DATE Market Board root page `/`
- Tabs: `market`, `news`, `calendar`, `breaking`, `flow`
- Viewports: desktop `1440x900`, tablet `768x1024`, mobile `390x844`, narrow mobile `320x568`
- Method: Playwright screenshot capture plus DOM overflow scan.

## Result

Overall status: pass with minor density risks.

- Every tab returned HTTP `200`.
- No tab produced browser console errors during capture.
- No viewport produced document-level horizontal scrolling.
- HERO and primary tab navigation rendered consistently on all checked widths.
- Mobile tab/filter overflow candidates are expected horizontal scroll controls, not page-level overflow.

## Step List

1. Desktop market: healthy. HERO, tab bar, market cards, ad slots, and market-flow sections fit cleanly.
2. Desktop news: healthy. News table/list layout fits without horizontal page overflow.
3. Desktop calendar: healthy. Calendar and detail columns fit within the page.
4. Desktop breaking: healthy. Disclosure cards fit and preserve readable hierarchy.
5. Desktop flow: healthy. Dense leader board remains inside the page and detail panel is visible.
6. Tablet market: healthy. HERO, tabs, three-column market cards, ad slots, and market-flow sections fit cleanly.
7. Tablet news: healthy. The headline table stays readable without page-level horizontal overflow.
8. Tablet calendar: healthy. Calendar and upcoming-event columns fit side by side.
9. Tablet breaking: healthy. Disclosure cards keep a two-column grid and readable metadata.
10. Tablet flow: acceptable. Dense leader rows render without document-level horizontal scrolling, but this is the most compressed tablet state.
11. Mobile market: healthy. HERO, two-column market cards, ad slots, and follow-up sections reflow correctly.
12. Mobile news: healthy with expected horizontal filter scrolling. Very long vertical page, but no overlap or page-level x-scroll.
13. Mobile calendar: healthy. Calendar grid and upcoming/detail sections fit in one column.
14. Mobile breaking: healthy with expected horizontal filter scrolling. Cards remain readable.
15. Mobile flow: acceptable. List is readable, but this is the densest mobile tab.
16. Narrow market: healthy. 320px width keeps content inside the page.
17. Narrow news: healthy with expected tab/filter horizontal scrolling.
18. Narrow calendar: healthy. Calendar cells are compact but usable.
19. Narrow breaking: healthy with expected filter horizontal scrolling.
20. Narrow flow: acceptable. One leader-theme badge was flagged around 6px beyond viewport in DOM scan, but page `scrollWidth` stayed equal to viewport width and the screenshot remains readable.

## Minor Risks

- The main mobile tab bar hides the last tabs off-canvas until the user swipes. This is functional, but discoverability depends on the user recognizing horizontal scrolling.
- The news and breaking tabs can become very long on mobile because all items render vertically.
- The flow tab is the highest-density responsive screen. It fits, but the leader rows are close to the practical limit for tablet and 320px mobile.

## Captures

Screenshots are saved in `docs/date/implementation/responsive-audit-2026-08-08/screenshots/`.

The raw diagnostic JSON is saved at `docs/date/implementation/responsive-audit-2026-08-08/responsive-audit-results.json`.
