Feature: Authentication for Achieve Admin via IAM

    Background:
    

Scenario: Verify Close icon is working fine 
Given I have opened Achieve "loginURL"
And I have logged in as "admin"
When I click on user menu 
And I click on Admin Panel 
And I click on Password reset
And I enter Invalid E-mail Address not regitered in macmillan account
And I click on Reset button
Then I click on Close Icon
When I click on user menu 
And I click on Admin Panel 
And I click on Password reset
Then I enter "admin" which is registered in macmillan account
And I click on Reset button
Then I click on Close Icon
And I sign out of Achieve


Scenario: Verify that using E-mail notification URL user is able to reset using new password
Given I have opened Achieve "ThirdpartyURL"
When I log in as "admin"
When I check E-mail Notification
And I lauch Copied URL
And I enter Password and confirm password fulfilling the validation criteria
And I click on Reset password
Then I click on login button to return to login page
And I have logged in as admin 






