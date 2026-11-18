# Signal - UI system and design decisions

## Foundations

| Token | Website value | Use |
| --- | --- | --- |
| Paper | #F8F7F4 | Case-study canvas |
| Ink | #211D29 | Narrative text |
| Muted | #625D6C | Supporting copy |
| Line | #DED9E2 | Narrative dividers |
| Purple | #572DCE | Actions, emphasis and active states |
| Purple soft | #EFE9FC | Supporting labels |
| Navy | #121D32 | Demo workspace navigation |
| App canvas | #F5F6FA | Review workspace |

Display typography: Instrument Serif. Interface/body: Geist. Small labels: IBM Plex Mono. Each has a system fallback. The editable Figma workflow uses Inter; font parity between the narrative site and the Figma workflow is not claimed.

## Reusable patterns

| Pattern | States / variants | Purpose |
| --- | --- | --- |
| Action | Primary, secondary, quiet, focus | Establish the next task |
| Navigation | Active / inactive; desktop / narrow | Keep the current workspace clear |
| Status badge | New, escalated, requested, closed | Show the current disposition |
| Evidence panel | Context, metric, profile, missing information | Separate facts, assumptions and unknowns |
| Detail tabs | Selected, unselected, keyboard focus | Move between complementary evidence views |
| Data table | All rows, filtered rows, empty state | Trace aggregates to transactions |
| Decision choice | Selected / unselected | Explain the consequence of each next step |
| Validation message | Missing rationale, incomplete request, blocked closure | Explain what is required before saving |
| Feedback | Saved confirmation, download status | Make the action's result visible |
| Record | Rationale plus evidence snapshot | Preserve the reasoning at the time of the decision |

Figma contains 18 component masters and 17 workflow screens. The website uses CSS classes and rendering functions for corresponding patterns; it is not a framework component library or a Code Connect integration.

## Design rationale

1. **Start with an observation.** Describe the transfer pattern without treating it as wrongdoing.
2. **Expose the calculation.** Let the reviewer check the scenario trigger against source rows.
3. **Keep the customer visible.** Expected activity can change how a pattern is interpreted.
4. **Make uncertainty explicit.** Unverified purpose remains visible before a decision is recorded.
5. **Require reasoning.** Saving needs a rationale; information requests also need an item, reviewer and follow-up date.
6. **Preserve decision context.** Each record captures whether hypothetical supporting evidence had been loaded.

## Evaluation boundary

These are design hypotheses and implementation choices. Technical checks establish that the demonstrated paths function; they do not establish that the design improves review speed, accuracy or regulatory outcomes. Practitioner feedback and participant testing remain pending.
