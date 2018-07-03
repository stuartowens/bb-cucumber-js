# features/simple_math.feature
Feature: Test on MacMillan.com
  In order to automate tests as a developer
  I want to build a full feature pageObject

  Scenario: navigate macmillanLearning.com and attempt to login with a bad username and password
    Given I am on MacMillanLearning.com
    When I click the login button
    Then I should be on the login screen
    When I enter "testUsername" and "testPassword"
    When I click by id "btn_signin" button
    Then I should get a message that says "Invalid username or password"

 # Scenario: navigate macmillanLearning.com
 #   Given I am on MacMillanLearning.com
 #   When I click the login button
    
