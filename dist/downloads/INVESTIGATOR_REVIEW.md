# Signal: investigator review guide

**Status:** Prepared 18 November 2026. No participant sessions or investigator feedback have been collected. This is a session plan, not research findings.

**Primary audience:** People with experience reviewing financial-crime alerts, AML operations, or financial investigations. Record the participant's broad role, relevant responsibilities and approximate experience; avoid identifying their employer unless they agree and it is necessary.

**Research question:** What information does a reviewer need before deciding whether this alert deserves further investigation?

**Duration:** 25–30 minutes. Begin with one contact; if available, seek 1–3 experienced participants. This is a practical qualitative starting point, not a representative sample or a claim of saturation.

## Invitation draft for you to send

> I am developing a portfolio prototype called Signal, an AML alert-review workspace. Could you spend about 30 minutes reviewing a fictional case and telling me which information is useful, missing or misleading? It uses synthetic transactions and is not connected to a financial system. I am seeking feedback on the review workflow and interface, and I will not ask you to share customer information, confidential cases or internal rules. With your permission, I would take notes and describe your broad experience anonymously in the case study. Would you be comfortable helping?

No invitation has been sent by the assistant. You can adapt and send this to the contact you mentioned.

## Before the session

1. Open the [Figma file](https://www.figma.com/design/dkEoiSYV0oFdGOOTforATu?node-id=3-1977) and select **01 · Alert queue**.
2. Click **Present**. Rehearse the escalation and information-request paths once using START_HERE.md.
3. Open review-observations.csv in a text editor or spreadsheet tool. Use a participant code such as P01.
4. Arrange screen sharing or an in-person review. A screen-share session works without changing the file's sharing settings. If you later send a prototype link, choose its audience and permissions yourself.
5. Ask permission to take notes. Ask separately before recording audio/video or using a quote with attribution. If they decline recording, take only the notes they permit.
6. Start the participant in the queue. Keep the decision examples hidden until they form their own initial view.

## Opening script · 3 minutes

Say:

> This is a fictional investigation workspace for a design portfolio. I am evaluating the information and workflow. Please think aloud about what you need, what you understand, and what you would question. There are no real accounts or customers. Some interactions are fixed examples: outcome choices load preset text, and saving moves to a demonstration record. I am interested in your own reasoning before you read the example rationale. Please avoid confidential information from your work.

Ask: “In broad terms, what types of alerts or investigations have you reviewed?” Record the answer and the participant's consent preferences.

## Tasks and neutral prompts

### A. Prioritize and explain · 5 minutes

Give the task: “You have just opened this queue. Which alert would you look at first, and what information helps you choose?”

Then ask them to open ALT-1042. If they choose another row first, record that choice before directing them to the case used in this prototype.

Observe whether they use priority alone, consider ownership and status, or need other context. Do not tell them the score's meaning in advance.

Prompts after their initial response:

- “What does 92/100 mean to you?”
- “Explain why you think this alert appeared.”
- “Which parts are observations, and which are assumptions?”
- “What could make this pattern reasonable?”

### B. Investigate the sequence · 5 minutes

Give the task: “Use the transaction view to establish what happened around the last incoming transfer. Tell me what you can and cannot conclude.”

Observe whether they locate TX-2014, TX-2015 and TX-2016, compare the amounts, and understand the 44- and 79-minute intervals. The correct arithmetic is in START_HERE.md; do not read it aloud before the participant investigates.

Prompts:

- “Which customer context would change your interpretation?”
- “What comparison period would you trust for a baseline, and why?”
- “Which counterparty details or supporting documents would you need?”
- “Is any wording implying a relationship between the transfers that the data do not establish?”

### C. Choose and document a next step · 7 minutes

Before they click an outcome, ask: “At this point, what next step would you take? What should the rationale contain?”

Then give the task: “Show how you would record that next step. Read the saved record and tell me what happens next and who owns it.”

Let them choose escalation or more information. If they choose closure, let them encounter the disabled save. Ask what evidence they expect to support closure before showing **Explore closure with evidence**. Explain that this button switches to a hypothetical follow-up rather than providing real documents.

Observe:

- Whether the preset rationale influences their decision or conflicts with their own explanation.
- Whether they understand what saving does and the difference between an information task and an actual sent request.
- Whether they can locate the record again from the updated queue.
- Whether the disabled closure is useful or imposes an unsuitable workflow assumption.

Prompts:

- “What would the next reviewer need from this record?”
- “What is missing from the ownership or follow-up information?”
- “Where would you preserve the evidence and remaining uncertainty?”
- “Would a different decision structure better match your work?”

### D. Challenge and debrief · 5–7 minutes

- “Which information would you need before this could be useful in your work?”
- “Which labels or explanations overstate what is actually known?”
- “Which three changes would most improve the review?”
- “What should I test after making those changes?”

Do not request their employer's detection thresholds, confidential investigation methods, internal policy, or real transaction records.

## How to take useful notes

Use one row per observation. Separate the participant's words and behaviour from your interpretation. Record assistance explicitly, for example, “Completed after I pointed out the Transactions tab.”

Use descriptive task outcomes: **independent**, **completed with help**, **not completed**, or **not attempted**. In a small study, report raw counts and participant context; avoid broad success-rate or business-impact claims.

Suggested high-value observations include score interpretation, recognition of uncertainty, finding the last inflow/outflows, evidence needed for closure, and understanding ownership after saving.

## Turn feedback into a reviewable design change

1. Pick one consequential observation with a concrete note or quote.
2. Duplicate the relevant frame and preserve the original.
3. State the hypothesis: “Moving the unknowns beside the trigger may help reviewers notice the missing commercial explanation.”
4. Make the smallest change that tests the hypothesis.
5. Re-run the relevant task with the same participant or another suitable reviewer; record the audience and assistance again.
6. Present the before, observation, change, and follow-up evidence together in the case study.

## Case-study reporting template

> I reviewed Signal with [actual number] participant(s) who had [broad relevant experience]. Sessions lasted [actual duration] and used synthetic data and a fixed Figma prototype. I observed [specific behaviour] during [task]. [Number] participant(s) needed help at [point], and [number] interpreted [element] as [meaning]. I changed [design detail] because [evidence]. In a follow-up with [actual audience/number], I observed [actual result].
>
> These sessions provided qualitative feedback on information needs, navigation and explanation. The sample was [limitations, including familiarity or convenience recruitment]. Preset rationale and hypothetical evidence limited the decision task. This work did not test detection accuracy, model calibration, regulatory compliance, production accessibility, security, or operational impact.

Keep brackets as prompts until you have real evidence. If there is no follow-up, say so directly. An expert opinion is domain feedback; a task observation is usability evidence. Report both accurately without treating either as proof of real-world effectiveness.
