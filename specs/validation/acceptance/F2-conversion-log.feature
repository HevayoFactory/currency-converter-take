Feature: F2 Conversion log

  @story-F2.1
  Rule: The log lists the signed-in user's conversions, newest first

    Scenario: Two conversions listed newest first
      Given Dana has logged "100" "USD" to "EUR" and then "80" "GBP" to "JPY"
      When Dana opens her conversion log
      Then the "GBP" to "JPY" entry is listed above the "USD" to "EUR" entry

  @story-F2.2
  Rule: Each entry shows the amount, currencies, result, rate and time of conversion

    Scenario: An entry shows all its details
      Given Dana has logged "250" "USD" to "EUR"
      When Dana opens her conversion log
      Then the entry shows "250", "USD", "EUR", the converted result, the rate used and when it was converted

  @story-F2.1
  Rule: Only the owner can see a log entry

    @negative
    Scenario: Another user's conversions are not listed
      Given Dana has logged "100" "USD" to "EUR"
      When Omar, who has logged nothing, opens his conversion log
      Then Omar's conversion log has no entries

  @story-F2.3
  Rule: A user can delete an entry from their own log

    Scenario: Deleting one entry
      Given Dana has logged "100" "USD" to "EUR" and "80" "GBP" to "JPY"
      When Dana deletes the "GBP" to "JPY" entry
      Then Dana's conversion log has exactly one entry
      And that entry is the "USD" to "EUR" conversion

    @negative
    Scenario: Entries are not removed on their own
      Given Dana logged "100" "USD" to "EUR" earlier
      When Dana opens her conversion log later
      Then the "USD" to "EUR" entry is still listed
