Feature: Specify Number Of Events

Scenario: When user hasn't specified a number, 32 is the default number
Given the user is on the main view
When a number of events has not been specified
Then the default number of events will be 32

Scenario: User can change the number of events they want to see
Given a user specifies a number of events to see
When they input or select this number
Then their specified number of events will be listed