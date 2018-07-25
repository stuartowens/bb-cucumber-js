Feature: Authentication for Achieve Admin via IAM

Background:
    Given I have opened Achieve "loginURL"

Scenario Outline: Admin able to revoke and then grant a specified role to a newly created user
    When I create an account for '<login>' user
    And If the account exists, log out of Achieve
    And I have opened Achieve "loginURL"
    And I have logged in as "admin"
    And I elect to manage the role of user <login> and grant the role of <role>
    Then Verify Successful permission grant message
    And I sign out of Achieve
    Examples:
    |login             | role              |
    | admin_alt        | "Admin"          |
    |customer_support_1| "Customer Support" |
    |media_producer_1  | "Media Producer"   |
    |instructor_1      | "Instructor"       |
    |paid_accessCC     | "Paid Access Code Creator"  |

##Change the emails to what ever you are using.
