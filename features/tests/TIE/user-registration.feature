Feature: Authentication for Achieve via IAM

    Background:
    Given I have opened Achieve "signURL"
    When I click on sign In button on top right corner 

Scenario: Verify that First Name field validations are working as expected
When I click on create an ac
And I enter firstname with numbers
And I enter firstname with symbols
And I enter firstname without symbols and numbers
And I Verify that Sign Up button should be disabled

