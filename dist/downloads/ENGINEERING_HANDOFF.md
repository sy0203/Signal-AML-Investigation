# Signal - engineering handoff

## Scope

One fictional case, ALT-1042 / customer C-0184. The Figma file documents 17 presentation states; the website implements the workflow with editable fields and browser-local persistence. They are complementary artifacts, not identical implementations.

Figma: https://www.figma.com/design/dkEoiSYV0oFdGOOTforATu?node-id=18-859

## Review flow

Queue -> customer and alert overview -> transactions / rule explanation -> decision -> local record -> updated queue.

| Outcome | Required input | Evidence condition | Resulting status |
| --- | --- | --- | --- |
| Escalate | Rationale, 30-3,000 characters | None | Escalated |
| Request information | Rationale, requested item, responsible reviewer, valid follow-up date | None | Information requested |
| Close | Rationale | Explicitly loaded hypothetical supporting evidence | Closed |

The follow-up date must be a real calendar date on or after the scenario review date, 14 November 2026. The demo does not enforce an actual institutional service-level agreement.

## Data and state

- `dist/data.js` holds the same 16 records as the public CSV. Amounts are positive integers; direction determines inflow/outflow. Currency is CAD.
- All scenario transaction times use Eastern Standard Time (UTC-05:00).
- `calculate()` in `domain.js` derives incoming/outgoing totals, counterparties, daily bars and outflow timing.
- `validateDecision()` supplies form errors. `addDecision()` returns a new state rather than mutating the input.
- `signal-aml-demo-v1` is the localStorage key. State includes a version, current hypothetical evidence flag and ordered decision records.
- Each record captures ID, outcome, rationale, actual browser save time, demo reviewer and evidence flag. Information requests add item, responsible reviewer and due date.
- The latest record determines the queue status. Previous records retain their own evidence snapshot.
- The form draft stays in memory while switching views. A reload restores saved decisions, not unsaved drafts.
- Invalid or incompatible saved JSON restores the initial scenario. If storage is unavailable, the page reports session-only storage and offers export.
- Reset affects only this prototype's storage key. The browser asks for confirmation first.

## Interaction states

Queue search and status filters have an explicit empty state and clear action. Transaction direction, search, sort and key-sequence filters can be combined. CSV export uses the currently visible rows. The chart exposes per-day totals through buttons with accessible labels and a status message.

The decision form shows inline errors and moves focus to them. Supported saves update the status, show confirmation and append a record. Closure without evidence remains blocked. Loading evidence explicitly changes the scenario; the referenced example documents are fictional, not downloadable bank records.

Arrow, Home and End keys move between case tabs. Focus outlines, associated labels, a skip link, reduced motion and native modal reset are included. Screen-reader and broad cross-browser audits remain outstanding.

## Responsive implementation

The surrounding case study uses a serif display face and a neutral/purple palette. The application uses a navy workspace and dense, labelled evidence panels. Layout breakpoints are 1,100, 850 and 600 CSS pixels. At narrow widths the sidebar becomes a horizontal navigation bar, review columns stack, and wide tables scroll within their containers.

## Verification

Run `npm test` for the six domain/data tests. Run `python dist/downloads/reconcile.py` for independent Python/SQLite reconciliation. See `VERIFICATION.md` for browser checks and limits.

## Before an operational implementation

Real use would require authenticated reviewers, authorized customer access, server-side validation, durable decision/event storage, concurrency handling, evidence/document provenance, actual request delivery, institution-specific review policy, permission design and additional accessibility/domain validation. Those are future integration requirements, not implemented features.

The prototype deliberately provides no model endpoint or numerical probability of wrongdoing. Its displayed priority is illustrative. Do not map the fictional rule directly to a production AML policy.
