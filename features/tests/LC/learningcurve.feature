Feature: Learning Curve Assignment


Scenario: Student Takes a LC Assessment
Given I log into "LCRPUrl" as "student1"
When I view the student landing page for LCRP
When I click on a reading the ebook view opens
And I read the rest of the ebooks the quiz button is shown
Then I can start the assessment
Given I see a question, I can answer it "Correct"
And I see a question, I can answer it "Correct"
And I see a question, I can answer it "Correct"
And I see a question, I can answer it "Correct"
And I see a question, I can answer it "Wrong"
And I see a question, I can open the ebook
And I see a question, I can answer it "Correct"
And I see a question, I can answer it "Correct"
Then I complete 50% of the assignment
And I see a question, I can answer it "Correct"
And I see a question, I can answer it "Correct"
And I see a question, I can answer it "Correct"
And I see a question, I can answer it "Wrong"
And I see a question, I can answer it "Correct"
And I see a question, I can answer it "Correct"
And I see a question, I can answer it "Correct"
And I see a question, I can answer it "Wrong"
Then I complete 100% of the assignment
Given I log into "LCRPUrl" as "instructor"

Scenario: Instructor can see Students work



#### TBD