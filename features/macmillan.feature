# features/simple_math.feature
Feature: Test on MacMillan.com
  In order to automate tests
  as a developer
  I want to build a full feature pageObject

  Scenario: navigate macmillanLearning.com
    Given I am on MacMillanLearning.com
    When I click the login button
    Then I should be on the login screen
    When I enter "<username>" and "<password>"
    When I save a variable "<@save(loginfail, * You need a valid e-mail address and password to log in.)>"
    Then I should get a message that says "<$loginfail>"
