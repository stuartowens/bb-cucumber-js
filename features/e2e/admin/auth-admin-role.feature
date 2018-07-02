Feature: Authentication for Achieve Admin via IAM

Background:
    Given That I have opened the Achieve "loginURL"
    And I have logged in as "admin"

Scenario Outline: Admin able to revoke and then grant a specified role to a newly created user
    When I elect to manage the role of <email_address>
    When I revoke the role of <role>
    When I elect to manage the role of <email_address>
    When I grant the role of <role>
    Then Verify Successful permission grant message
    And I sign out of Achieve
    Examples: 
    |email_address            |role                         |
    |michael.pasko@macmillan.com  | Admin                     |
#    |testuser+ad02@gmail.com  | "Customer Support"          |
#    |testuser+ad03@gmail.com  | "Media Producer"            |
#    |testuser+ad04@gmail.com  | "Instructor"                |
#    |testuser+ad05@gmail.com  | "Paid Access Code Creator"  |

##Change the emails to what ever you are using.
