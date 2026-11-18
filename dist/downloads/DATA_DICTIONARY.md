# Synthetic scenario data dictionary

One fictional customer, C-0184 / Juniper Design. Review window: 7–13 November 2026. All timestamps use the scenario's Eastern Time; the CSV contains local date/time without a UTC offset. All values are CAD.

| Field | Type | Meaning |
| --- | --- | --- |
| id | string | Unique fictional transaction ID, TX-2001 through TX-2016 |
| date | ISO date | Local scenario date |
| time | HH:MM | Local scenario time |
| direction | Incoming / Outgoing | Direction relative to the fictional customer account |
| counterparty | string | Fictional party label; no verified relationship is implied |
| amount | positive integer | Whole CAD value, with no cents in this constructed dataset |
| currency | string | CAD |
| channel | string | Transfer |
| customer | string | Fictional account/customer key C-0184 |
| synthetic | Boolean-like string | True for every record |

## Assumptions outside the CSV

CAD 7,600 weekly baseline; fictional customer business profile; illustrative rule; demo priority; document references; rationale; ownership and follow-up dates. No raw analysis-repository records, model predictions or verified laundering labels are included.

The rule compares incoming value with the assumed weekly baseline, then compares outgoing value within 90 minutes of the last inflow with total incoming review-window value. This is an illustrative trigger, not a calibrated detector or compliance policy.
