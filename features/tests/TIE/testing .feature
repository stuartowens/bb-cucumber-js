Feature: Authentication for Achieve Admin via IAM

    Background:
        Given I have opened Achieve "loginURL"

    Scenario: tittle
    When I have logged in as "admin"
    Then I search for the "E2E101"
    And I click on open menu
    Then I open the Manage Instructors page on the course named "$course1.name"
    Then I manage instructors on the course and add the "admin" loginUser
    