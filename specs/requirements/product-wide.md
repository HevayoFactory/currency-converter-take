# Product-wide

Rules that apply to more than one feature.

## Requirements

- P1 Users sign in via SSO through Thunder; every feature requires a signed-in user. \[org default\] Applies to: all.
- P2 A user can only see their own conversions. Applies to: F1, F2.
- P3 Exchange rates are real-time, from a third-party exchange-rate service. Applies to: F1.
- P4 A conversion is shown in under 2 seconds. Applies to: F1. *assumed*

## Decisions

- Exchange rates: capability only (real-time rate data); no provider named yet.