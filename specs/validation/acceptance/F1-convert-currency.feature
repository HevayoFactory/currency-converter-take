Feature: F1 Convert currency

  @story-F1.1 @story-F1.2
  Rule: The converted amount appears as soon as the amount or a currency is entered, without pressing a button

    Scenario: Converting dollars to euros
      Given Dana is signed in on the convert page
      When Dana enters "100" as the amount, picks "USD" as from and "EUR" as to
      Then a converted amount in "EUR" is shown

    Scenario: Changing the target currency updates the result
      Given Dana has converted "100" from "USD" to "EUR"
      When Dana changes the "to" currency to "JPY"
      Then the shown result is in "JPY"

  @story-F1.1
  Rule: Only a positive amount can be converted

    @negative
    Scenario: A zero amount is not converted
      Given Dana is signed in on the convert page
      When Dana enters "0" as the amount, picks "USD" as from and "EUR" as to
      Then no converted amount is shown
      And Dana's conversion log has no new entry

    @negative
    Scenario: The same currency cannot be both from and to
      Given Dana is signed in on the convert page
      When Dana enters "50" as the amount, picks "GBP" as from and "GBP" as to
      Then no converted amount is shown
      And Dana's conversion log has no new entry

  @story-F1.3
  Rule: The two currencies can be swapped in one click

    Scenario: Swapping dollars and euros
      Given Dana has "USD" as from and "EUR" as to
      When Dana swaps the currencies
      Then "EUR" is the from currency and "USD" is the to currency

  @story-F1.4
  Rule: The rate used and when it was fetched are shown with every result

    Scenario: A result shows its rate and fetch time
      Given Dana has converted "100" from "USD" to "EUR"
      Then the rate used for "USD" to "EUR" is shown
      And the time the rate was fetched is shown

  @story-F1.5
  Rule: When live rates are unavailable no result is shown as current

    @negative
    Scenario: Rates cannot be fetched
      Given live rates are unavailable
      When Dana enters "100" as the amount, picks "USD" as from and "EUR" as to
      Then Dana is told live rates are unavailable
      And no converted amount is shown

  @story-F1.6
  Rule: A conversion is logged once the result has settled, not on every keystroke

    Scenario: A settled conversion appears in the log
      Given Dana has an empty conversion log
      When Dana converts "250" from "USD" to "EUR" and leaves the inputs unchanged for 2 seconds
      Then Dana's conversion log has exactly one entry

    @negative
    Scenario: Typing an amount digit by digit logs one entry
      Given Dana has an empty conversion log
      When Dana types "1", "12" and then "125" as the amount without pausing, from "USD" to "EUR", and then waits 2 seconds
      Then Dana's conversion log has exactly one entry
