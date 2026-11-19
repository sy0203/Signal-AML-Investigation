# Signal website verification

Checked 18 November 2026. This is technical prototype QA, not a usability study or investigator validation.

## Automated checks

`npm test` — six passing tests:

1. The browser dataset agrees with all 16 rows of the downloadable synthetic CSV.
2. Incoming/outgoing totals, eight incoming counterparties, daily bars, ratios and 44/79 minute timing reconcile.
3. Empty rationale and closure without supporting evidence cannot produce a decision record.
4. Information requests require an item, reviewer and a valid follow-up date; impossible dates are rejected.
5. Sequential decisions preserve evidence snapshots, update current status and survive JSON serialization/restoration.
6. Corrupt or incompatible local records safely restore the initial scenario.

The Python standard-library reconciliation script independently compares the same aggregates and timing with SQLite queries. JavaScript syntax checks also pass.

## Browser walkthrough

Checked in the Chromium browser at the normal desktop size and a 390 × 844 mobile viewport:

- Queue search, empty state and clearing filters.
- Customer overview, totals and interactive daily bars.
- Incoming/outgoing filter, newest-first sorting and key-sequence filter.
- Plain-language trigger calculations and missing-information context.
- Empty rationale rejection.
- Escalation saved and reflected after page reload.
- Information request saved with item, owner and due date.
- Closure rejected with unverified purpose, then accepted after explicitly loading hypothetical evidence.
- Decision log shows all three outcomes with the evidence state at each decision.
- JSON log export and filtered CSV export produce downloaded files.
- Arrow-key navigation between detail tabs.
- Reset confirmation restores the initial New alert.
- No page-level horizontal overflow at the checked mobile size; transaction tables use their own horizontal scroll region.
- No errors or warnings captured in the final checked page console.

## Limits

One synthetic customer and one alert. No live model, backend, accounts, document upload, collaboration, actual requests or durable audit trail. Local storage and download behavior depend on the browser. No screen-reader audit, representative user study, broad browser/device matrix, legal assessment or operational AML validation was performed. No claims about review speed, detection effectiveness or business impact follow from these checks.

The practitioner review guide is prepared but has not been run. Original model evaluations are not reproduced and are excluded from this extension's result claims.

## Final publication checks

The final revision preserves typed rationale when changing the selected decision outcome, makes wide data tables keyboard-focusable, and uses the GitHub Pages address as its canonical URL. All three decision paths, reload persistence, filters, exports and narrow layouts are checked again before handoff. Changing `main` now runs verification and publishes the static site automatically.

Final browser results: all three outcomes pass; information-request fields reject missing values; closure rejects unverified evidence and accepts the explicit hypothetical variant; rationale survives outcome changes; saved status survives reload; exported CSV uses the documented True flag; JSON retains the evidence snapshot. At 390px and 768px, page width remains within the viewport. The final checked console has no captured errors or warnings.

## Design presentation refresh — 18 November 2026

Replaced the unsupported-claims table with three demonstrable workflow outcomes. Added the authored Figma iteration board, clearer resource hierarchy, larger editorial type and a matching portfolio feature. At 390px, detail tabs form a two-column group; at 768px, the customer and evidence panels stack without page overflow. Blank rationale rejection, saving escalation and outgoing-transaction filtering were checked in the browser after the refresh. All six domain tests and independent Python/SQL reconciliation pass. No practitioner session was conducted.
