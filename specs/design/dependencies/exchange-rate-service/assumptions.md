# What the design assumes about the exchange rate service

- The service returns a rate for any pair of the currencies it lists, together with the time the rate was fetched or last updated. *assumed* (F1)
- The service lists its supported currencies with their ISO 4217 codes and names. *assumed* (F1)
- A failure or timeout of the service can be told apart from an unsupported currency. *assumed* (F1)