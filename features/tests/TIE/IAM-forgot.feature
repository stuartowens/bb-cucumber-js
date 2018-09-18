Feature: forgot

Background: 

Given I have opened Achieve "signURL"
When I click on sign In button on top right corner 

Scenario: Verify Forgot Password page cancel Button redirects to Sign In Page
When I click on forgot link
When I click on cancel button

Scenario: Verify that forgot password functionality working fine for macmillan accounts
When I click on forgot link
When I enter newly created "instructor_1" emailaddress
And click on reset password button
Then I enter incorrect security answer for one time and correct security answer the second time
|SecurityQuestion        | Answer    |
|security_question       | question1 |
|submit_button           | click     |
|security_question       | answer    |
|submit_button           | click     |
Then I enter the vaue with following data:
When I click on back to login button


Scenario: Verify that forgot password functionality working fine for macmillan accounts
When I click on forgot link
And I enter newly created "instructor_1" emailaddress
And click on reset password button
And I enter incorrect Security questions for three times
|SecurityQuestions       | Answers   |
|security_question       | question1 |
|submit_button           | click     |
|security_question       | question2 |
|submit_button           | click     |
|security_question       | question3 |
|submit_button           | click     |
Then I answer the security questions with following data:

Scenario: Verify that forgot password is showing appropriate message for not registered with macmillan account e-mail address
When I click on forgot link
And I enter the emailaddress of the account which is not registered in macmillan
And click on reset password button

Scenario:Verify Help Link is present on the Forgot password page and redirecting to appropriate page 
When I click on forgot link
And I click on help 
Then I Verify that Help Page is displayed










