# Currency Converter

## Problem Statement

People who need to convert an amount between currencies have to look up current exchange rates by hand and then remember or note down what they converted. Stale rates give wrong amounts, and there is no record of past conversions.

## Solution

A web app where a signed-in user converts an amount from one currency to another using real-time exchange rates, and every conversion is kept in a personal log they can review.

## Actors

- User: a signed-in person who converts amounts and views their own conversion log.

## Features

- F1 [Convert currency](features/F1-convert-currency.md)
- F2 [Conversion log](features/F2-conversion-log.md)

## Product-wide

See [Product-wide](product-wide.md).

## Out of Scope

- Moving or exchanging real money.
- Anonymous or shared logs.

## Open Questions

1. Which exchange-rate service must provide the real-time data, if any? deferred — the user has no preference; chosen at design.

