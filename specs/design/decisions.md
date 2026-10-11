# Technical decisions

- \[architecture\] Only the API talks to the exchange-rate service; the web app never holds a rate-service credential. *assumed* (F1, F2)
- \[architecture\] The 2-second settle timer runs in the web app, which then asks the API to log the conversion. *assumed* (F1)
- \[data-model\] The log entry keeps the rate and its fetch time as they were when the conversion was logged. *assumed* (F1, F2)
- \[data-model\] Amounts, results and rates are stored as decimals, not floating point. *assumed* (F1, F2)
- \[security\] One role, User, holds every permission; each user reaches only their own log through /me/conversions. *assumed* (F1, F2)
- \[currency-api\] Logging a conversion fetches a fresh rate on the server; the client sends only the amount and the two currencies. *assumed* (F1)
- \[currency-api\] The currency list is one unpaged-in-practice response of up to 200 entries. *assumed* (F1)