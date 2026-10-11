# Data model

The only record the product keeps is the conversion log entry, owned by the signed-in user who made it. Exchange rates are fetched live and are not stored apart from the rate copied into each entry.

```mermaid
erDiagram
    USER ||--o{ CONVERSION : "owns"
    USER {
        string sub "identity of the signed-in user, from sign-in"
    }
    CONVERSION {
        string id PK
        string userSub FK "owner, taken from the signed-in identity"
        string fromCurrency "ISO 4217 code"
        string toCurrency "ISO 4217 code"
        decimal amount "positive amount in the from currency"
        decimal result "amount converted into the to currency"
        decimal rate "units of to currency per one unit of from currency"
        datetime rateFetchedAt "when the rate was fetched"
        datetime convertedAt "when the conversion was logged"
    }
```

- `USER` is not stored by the product; the sign-in service holds it and each entry carries its `sub`.
- Entries are only created and deleted, never edited.