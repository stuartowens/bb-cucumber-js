Feature: Authentication for Achieve via IAM

Scenario: Verify that First Name field and last name validations are working as expected
Given I have opened Achieve "UserCreationUrl"
When I verify the functionality of first name and lastname by not entering 
Then I verify validation message for first name and last name

Scenario: Verify that First Name field and last name validations are working as expected
Given I have opened Achieve "UserCreationUrl"
When I verify the functionality of first name and lastname by entering numbers
Then I verify validation message for first name and last name


Scenario: Verify that First Name field and last name validations are working as expected
Given I have opened Achieve "UserCreationUrl"
When I verify the functionality of first name and lastname by entering symbols
Then I verify validation message for first name and last name


Scenario: Verify that First Name field and last name validations are working as expected
Given I have opened Achieve "UserCreationUrl"
Then I enter the first name, lastname and email address without symbols nad number using the "student" account details 

Scenario: Verify that password field validations are working as expected
Given I have opened Achieve "UserCreationUrl"
When I hover on icon "i"
And I enter password having eight characters not fullfilling the criteria
And I check the error message
And I hover on icon "i"
And I enter password from "student" account having eight character fullfilling the criteria

Scenario: Verify that confirm password field validations are working as expected
Given I have opened Achieve "UserCreationUrl"
When I do not enter text in password field and click on confirm password
And I check the error message of confirm password
And I enter Password and confirm password from "student" account fullfiling all password requirements

Scenario: Verify that Security Question & Answer validations are working as expected without entering the question and answers
Given I have opened Achieve "UserCreationUrl"
And I Select SecurityQuestions from "student" account and I dont answer any questions
Then I Verify Error message is displayed

Scenario: Verify that Security Question & Answer validations are working as expected by fullfilling all the criteria
Given I have opened Achieve "UserCreationUrl"
When I Answer all the three security questions by comparing it to "student" account 
Then I verify the Sign up button is disabled 

Scenario: Verify that Primary Institution or School drop down and field working as expected
Given I have opened Achieve "UserCreationUrl"
Then I verify list of Primary Institutions or schools will display starting with the letter "a"
Then I verify the Sign up is disabled

Scenario: Verify that on selecting a US college in "Primary Institution or School" text box, the application automatically checks the "Opt IN" check box
Given I have opened Achieve "UserCreationUrl"
And I Select "Cottey College" in Primary Institution or School text box
Then I verify the Sign up button is disabled when Primary Institution or School text box

Scenario: Verify that on selecting a Canada College in "Primary Institution or School" text box, the application should not automatically check the "OPT IN" check box
Given I have opened Achieve "UserCreationUrl"
And I Select "University of Toronto" in Primary Institution text box
Then I verify the Sign up button is disabled when canada college is selected

Scenario: Verify that Checkbox "Opt IN" is selectable and E-mail notification should generate
Given I have opened Achieve "UserCreationUrl"
Then I click on checkbox 
Then I verify the Sign up button is disabled when I click on check box


Scenario: Verify that Privacy Notice Link redirects to appropriate page
Given I have opened Achieve "UserCreationUrl"
When I click on privacy notice link 
Then I verify that I am redirected to privacy notice link page


Scenario: Verify that Checkbox 'I have read and agree to the terms of use'
Given I have opened Achieve "UserCreationUrl"
When I click on user agreement checkbox
Then I verify the Sign up button is disabled "Verify that Checkbox 'I have read and agree to the terms of use'"

Scenario: Verify that Terms of use link redirects to appropriate page
Given I have opened Achieve "UserCreationUrl"
When I click on Terms of use link 
Then I verify that I am redirected to terms of use page


Scenario: Verify that without entering all Mandatory Fields (first name)
Given I have opened Achieve "UserCreationUrl"
When User "student" has filled all mandatory fields except first name 
And I verify the Sign up button is disabled "Verify that without entering all Mandatory Fields (first name)"

Scenario: Verify that without entering all Mandatory Fields (lastname)
Given I have opened Achieve "UserCreationUrl"
When User "student" has filled all mandatory fields except last name
And I verify the Sign up button is disabled "Verify that without entering all Mandatory Fields (lastname)"

Scenario: Verify that without entering all Mandatory Fields (password)
Given I have opened Achieve "UserCreationUrl"
When User "student" has filled all mandatory fields except password
And I verify the Sign up button is disabled "Verify that without entering all Mandatory Fields (password)"

Scenario: Verify the Terms of Purchase link directs to the page
Given I have opened Achieve "UserCreationUrl"
When I click on Terms of Purchase 
And I verify that purchase link is directed to Terms of Purchase

Scenario: Verify that without entering all Mandatory Fields (email)
Given I have opened Achieve "UserCreationUrl"
Then User "student" has filled all mandatory fields except email
And I verify the Sign up button is disabled "Verify that without entering all Mandatory Fields (email)"

Scenario: Verify that Piracy Link redirects to appropriate page
Given I have opened Achieve "UserCreationUrl"
When I click on piracy link 
Then I verify that piracy link is directed to piracy page

Scenario: Verify that without entering all Mandatory Fields (institution)
Given I have opened Achieve "UserCreationUrl"
When User "student" has filled all mandatory fields except institution
And I verify the Sign up button is disabled "Verify that without entering all Mandatory Fields (institution)"

Scenario: Verify that Privacy Link redirects to appropriate page
Given I have opened Achieve "UserCreationUrl"
When I click on privacy link 
Then I verify that privacy link is directed to privacy page

Scenario: Verify that without entering all Mandatory Fields (security questions)
Given I have opened Achieve "UserCreationUrl"
Then User "student"  has filled all mandatory fields except security questions and answers 
And I verify the Sign up button is disabled "Verify that without entering all Mandatory Fields (security questions)"

Scenario: Verify that macmillan learning redirects to appropriate page
Given I have opened Achieve "UserCreationUrl"
When I click on macmillan learning link 
Then I verify that macmillan link is directed to macmillan learning page
















