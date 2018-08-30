Feature: R&P happy path workflow 1

   Media Producer creates a course
Background:
    Given I have opened Achieve "loginURL"
 
    Scenario: Create course in Achieve for "Bookname??"
    When I have logged in as "media_producer_1"
    When I click the create_course button to create course
    When save the value to variable
    |variablename        | value    |
    |course_type         | Template |
    |product_model       | Read & Practice |
    |course_name         | TestCourse |
    |learning_Objective  | Introduction to Economics |
    |course_code         | E2E 101 |
    |isbn_number         | 9781464199495 |
    |course_status       | draft |
    
    When I elect to create a course with the following data:
        #|courseType | ProductModel    | courseName              | courseCode        | ISBN           | courseStatus | cancelBtn | saveBtn |
        #| Template  | Read & Practice | [$course.templatename] |  [$course.code]   | [$course.ISBN] | Draft        | NA        | Click   |
    #Then I validate that the course "$course.templatename" is listed in the courses page
    #And I create a folder named <folderName> on the resources screen
    And I create a folder named on the resources screen
        #| folderName |
        #| Chapter 1  |
        #| Chapter 2  |

    Then I will add the following content to the resource page:
        #| contentName                                  | 
        #| Chapter 1. Introduction and Research Methods |
        #| Chapter 1. Background to the Study of Psychology |
        #| Chapter 1. The People and the Field |
        #| Chapter 2: North America |
    
    Then I move the activity named to the folder named
    #And I move the activity named <activity> to the folder named <folderName>
        #| activityName                                     | folderName |
        #| Chapter 1. Introduction and Research Methods     | Chapter 1  |
        #| Chapter 1. Background to the Study of Psychology | Chapter 1  |
        #| Chapter 1. The People and the Field              | Chapter 1  |
        #| Chapter 2: North America                         | Chapter 2  |

    Then I reorder the items on the course resource page to be in this order:
        #| itemName  |
        #| Chapter 1 |
        #| Chapter 2 |
    And I sign out of Achieve

     Scenario: Convert a template from a draft to a Template
     When I have logged in as "media_producer_1"
     When I elect to edit the course named "course1.templatename"
     When save the value to variables 
     |variablesname      | value |
     |Template_status   | Active On Date |
     |Active_Date       | @Date('now')   |
     When I elect to edit the course with the following data:
     #|courseStatus   | activeOnDate   | saveBtn |
     #| Template      | @Date('now')   | Click   |
     #Then I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"
     And I sign out of Achieve

    Scenario: Assign the course to an instructor
    When I have logged in as "admin_alt" 
    When save the value "R&P E2E HP1-Course-[$course1.suffix]" to variable "course1.name"
    And I copy the course named "course1.templatename" to the name "$course1.name"
    And I open the Manage Instructors page on the course named "$course1.name"
    And I manage the instructors on the course and add the "instructor1" loginUser
    And I validate that the Course Specific Link opens the course named "$course1.name"
    And I close the Manage Instructors page

    Scenario: As an instructor, login and mange the course settings and invite students
    When I elect to login as "Instructor1" user
    And I elect to edit the course named "$course1.name"
    And I elect to update the value of the course to the the following values
    |courseStatus         | activeOnDate   | courseEndDate |saveBtn  |
    | Active On Date      | @Date('now')   | @Date('+1m')  | Click   |
    Then I validate that the course card named "$course.name" exists on the course page with the status of "Active"
    Then I capture the invite link and store to variable "inviteLink"
    Then I populate the Invite Students page with the following data:
    | inviteBtn | sendEmailBtn | emailList                     | cancelBtn | sendInvitesBtn |
    | NA        | Click        | "$loginStudent1.email_address"| NA        | Click          |

    Scenario: Enroll into course with link and access code
    Given That I have opened the Achieve [$inviteLink] in the <$browser>
    Then validate that the following information is correct on the Course Access Code page
    |courseName     | courseCode    | Instructor         | accessType      |
    | $course1.name | $course1.code | $instructor1.email | [$course.pm]    |