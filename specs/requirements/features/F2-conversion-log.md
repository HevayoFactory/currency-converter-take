# Conversion log

## Purpose

A user reviews the log of the amounts they have converted.

Needs: F1.

## User Stories

- F2.1 As a user, I see my past conversions in a list, newest first.
- F2.2 As a user, I see for each entry the amount, the from and to currencies, the converted result, the rate used and when it was converted.
- F2.3 As a user, I delete an entry from my log.

## Decisions

- Log entries are kept until the user deletes them; there is no automatic expiry.
- A user sees only their own log (P2).

## Out of Scope

- Filtering or searching the log.
- Clearing the whole log in one action.
- Exporting the log.