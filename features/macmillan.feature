# features/simple_math.feature
Feature: Test on MacMillan.com
  In order to automate tests
  as a developer
  I want to build a full feature pageObject

  Scenario: navigate macmillan.com
    Given I am on MacMillan.com
    When I click the Home link
    Then I should be on the home page
