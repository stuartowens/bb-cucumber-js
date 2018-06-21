Feature: Authentication for Achieve Admin via IAM

Background:
    Given That I have opened the Achieve "baseURL"
    And I have logged in as "adminUser"
    
Scenario Outline: Admin able to grant a specified role to a newly created user 
    When I elect to manage the role of <email_address>
    And I grant the role of <role>
    Then Verify Successful permission grant message
    And I sign out of Achieve
    Examples: 
    |email_address            |role                         |
    |testuser+ad01@gmail.com  | "Admin"                     |
#    |testuser+ad02@gmail.com  | "Customer Support"          |
#    |testuser+ad03@gmail.com  | "Media Producer"            |
#    |testuser+ad04@gmail.com  | "Instructor"                |
#    |testuser+ad05@gmail.com  | "Paid Access Code Creator"  |

##Change the emails to what ever you are using.