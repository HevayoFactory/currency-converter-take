# Convert currency

## Purpose

A user converts an amount from one currency to another using real-time exchange rates.

## User Stories

- F1.1 As a user, I enter an amount and pick a "from" and a "to" currency.
- F1.2 As a user, I see the converted amount immediately as I change the amount or either currency, without pressing a button.
- F1.3 As a user, I swap the "from" and "to" currencies in one click.
- F1.4 As a user, I see the exchange rate used and when it was fetched.
- F1.5 As a user, I am told when live rates are unavailable, and no stale result is shown as current.
- F1.6 As a user, each conversion I make is recorded in my conversion log.

## Decisions

- Users can convert between all major world currencies, identified by their ISO 4217 codes, limited to what the rate source supports.
- Amounts must be positive numbers; invalid input shows a message instead of a result.
- A conversion is recorded in the log once the user has settled on a result, not on every keystroke.
- A result counts as settled when the amount and both currencies have not changed for 2 seconds. *assumed*
- The "from" and "to" currencies must differ; choosing the same currency for both shows a message instead of a result, and nothing is logged. *assumed*

## Out of Scope

- Remembering the last-used currency pair.
- Rate history charts.