# Signal — AML investigation workflow

A synthetic, interactive portfolio project by Seyoung Yoo, built with AI assistance. It connects an AML-style alert to customer context, transaction evidence, an understandable trigger and a recorded next step.

**Live project:** https://signal-aml-seyoung-yoo.kindblossom2.chatgpt.site

**Portfolio:** https://seyoungyoo.ca/ · **Author profile:** https://github.com/sy0203

## Try it

1. Choose **Try the interactive demo**, then **Review alert**.
2. Compare the customer profile, daily incoming values and the transaction timeline.
3. Open **Why this alert?** to trace each scenario rule to its calculation.
4. Record an escalation or an information request. Closure is blocked until the hypothetical supporting-evidence scenario is loaded.
5. Open **Decision log** to inspect or export records. **Reset demo** clears this prototype's local records.

All case content is fictional. Information requests are not sent. Decisions are saved only in the current browser using localStorage; this is not an operational audit trail. The app has no backend or connected model. It never reads banking accounts or uploads decisions.

## Run locally

Use a current Node.js release with built-in test support. No dependencies or build step are required.

```sh
npm test
npm run dev
```

Open http://127.0.0.1:4321 in a browser. Opening index.html directly through file:// will not load ES modules correctly. For other static hosting, publish the contents of `dist/`.

Google Fonts supplies Geist, Instrument Serif and IBM Plex Mono. System fallbacks are defined if fonts cannot load. No analytics or advertising scripts are included.

## What is included

- `dist/index.html` — case-study narrative, results, research status and downloads
- `dist/app.js` — queue, transaction filters, explanation, decision form, local history and exports
- `dist/domain.js` — calculations, outcome validation and saved-state parsing
- `dist/data.js` — 16 authored synthetic transactions
- `dist/styles.css` — responsive layout, focus states and reduced-motion support
- `dist/downloads/` — synthetic CSV, reconciliation script, SQL, dictionary, review kit and visual case study
- `tests/domain.test.mjs` — data agreement, timing, totals, blocked closure, request validation and persistence

The downloadable source archive excludes itself to avoid recursive packaging. Its source-download link therefore targets the hosted project's archive when run locally.

## Reproducible scenario results

| Measure | Result |
| --- | --- |
| Incoming transfers | 14, CAD 19,600 |
| Incoming counterparties | 8 |
| Outgoing transfers | 2, CAD 17,800 |
| Outgoing / incoming | 90.8163% |
| Weekly incoming / assumed CAD 7,600 baseline | 2.5789× |
| Outgoing timing after final inflow | 44 and 79 minutes |

The fictional RM-02 rule combines incoming value above 2× baseline with at least 80% outgoing within 90 minutes of the final incoming transfer. The ratio does not prove the same funds moved or establish wrongdoing.

To reproduce the Python checks, place `synthetic_transactions.csv` beside `reconcile.py`, then run it using Python 3. The SQL file documents equivalent scenario queries.

## Relationship to the IMI project

Signal is an independent, synthetic design and frontend extension of the analytical question explored in an IMI Big Data Challenge with Scotiabank. The original team work and this concept are separate stages. Public aggregate context comes from Seyoung's supplied resume and existing portfolio. Original notebooks, confidential documentation and source transactions are not included.

Original model-performance figures are omitted from this extension until split and threshold provenance are consistently documented. The original models are not re-run here. Do not describe Signal as a deployed ML detector or use the synthetic calculations as model-performance evidence.

## Design and evaluation

- [Editable Figma case study](https://www.figma.com/design/dkEoiSYV0oFdGOOTforATu?node-id=18-859)
- [Figma prototype](https://www.figma.com/proto/dkEoiSYV0oFdGOOTforATu/Signal-AML?node-id=3-1977&scaling=scale-down&page-id=0%3A1)
- [Case study PDF](dist/downloads/Signal_Case_Study.pdf)
- [Practitioner review kit](dist/downloads/INVESTIGATOR_REVIEW.md)

Technical verification is documented in `VERIFICATION.md`. No investigator interview or usability study has been completed. No improvement in review time, detection quality or false-positive rate is claimed. Intended audience: initial alert-review analysts. Organizational policy, permissions, privacy, document handling, accessibility with assistive technology and regulatory suitability need additional validation before any operational use.

## Credits

Project framing and portfolio direction: Seyoung Yoo. Design, synthetic scenario, documentation and code developed with AI assistance. Original IMI analytics: team challenge context; individual contributions should be described only where personally supportable. No affiliation or endorsement is implied by the extension.
