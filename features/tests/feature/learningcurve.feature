Feature: Learning Curve Test
Scenario:
Given I have opened LC "learningCurveUrl"
When I start a quiz
Then I answer a question
And the submit answer buttons appears
And the answer is correct
And finish the test


#### TBD