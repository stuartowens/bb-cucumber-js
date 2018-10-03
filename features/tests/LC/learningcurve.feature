Feature: Learning Curve Assignment

Scenario: Start a History Test
Given I have opened LC "learningCurveUrl" "history"
Then I see the reading list

Scenario: Compelete Chuck Norris Test
Given I have opened LC "learningCurveUrl" "Norris"
When I start a quiz
Then I answer a question
And the submit answer buttons appears
And the answer is correct
And get to the midway point of a test and continue
And finish the test

#### TBD