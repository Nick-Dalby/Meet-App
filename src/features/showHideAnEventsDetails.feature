Feature: Show/Hide An Event's Details

Scenario: An event element is collapsed by default
Given the user is on the main view
When nothing is clicked
Then the event details element should not be visible

Scenario: User can expand an event to see its details
Given the user wants event details
When they click on the event details element
Then the event details element should be visible

Scenario: User can collapse an event to hide its details
Given the user no longer needs to see the event details
When they click on a close button
Then the event details element should not be visible