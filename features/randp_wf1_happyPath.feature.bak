Feature: R&P happy path workflow 1

Background:
    Given That I have opened the Achieve <$env> in the <$browser>

Scenario: Create course in Achieve for "Bookname??" 
    When I elect to login as "mediaProducer1" user
    When save the value <value> to variable <variableName
    |variableName        | value  |
    |courseSuffix        | [@rnd(10)] |
    |course.templateName | R&P HappyPath1-template-[$course1.suffix] |
    |course.name         | R&P E2E HP1-Course-[$course1.suffix] |
    |course.code         | E2E 101 |
    |course.pm           | Read & Practice |
    |course.ISBN         | 9781464199493 |

    And I elect to create a course with the following data:
        |courseType | ProductModel    | courseName              | courseCode        | ISBN           | courseStatus | cancelBtn | saveBtn |
        | Template  | Read & Practice | [$course1.templatename] |  [$course.code]   | [$course.ISBN] | Draft        | NA        | Click   |
    Then I validate that the course "$course1.templatename" is listed in the courses page
    And I will add the following content to the resource page:
        | contentName                                  | 
        | Chapter 1. Introduction and Research Methods |
        | Chapter 1. Background to the Study of Psychology |
        | Chapter 1. The People and the Field |
        | Chapter 2: North America |
    And I create a folder named <folderName> on the resources screen
        | folderName |
        | Chapter 1  |
        | Chapter 2  |

    And I move the activity named <activity> to the folder named <folderName>
        | activityName                                     | folderName |
        | Chapter 1. Introduction and Research Methods     | Chapter 1  |
        | Chapter 1. Background to the Study of Psychology | Chapter 1  |
        | Chapter 1. The People and the Field              | Chapter 1  |
        | Chapter 2: North America                         | Chapter 2  |
    And I reorder the items on the course resource page to be in this order:
        | itemName  |
        | Chapter 1 |
        | Chapter 2 |
    ## This might have to tested for automation feasability.  We may need to rewrite it.
    And I expand the folder named "Chapter 1" on the course resource page
    And I select the activity named "Chapter 1. The People and the Field"
    Then I validate that the "Read and Practice" activity named "Chapter 1. The People and the Field" is opened
    When I close the activity
    And I open the Home page
    Then I validate that the course card named "R&P E2E HappyPath1-randomnumber" exists on the course page with the status of "Draft"

    Scenario: Convert a template from a draft to a Template
    When I elect to login as "mediaProducer1" user
    And I elect to edit the course named "course1.templatename"
    And I elect to update the value of the course to the the following values
    |courseStatus   | activeOnDate   | saveBtn |
    | Template      | @Date('now')   | Click   |
    Then I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"
    And I sign out of Achieve

    Scenario: Assign the course to an instructor
    When I elect to login as "Admin1" user
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

    Scenario: Enroll into course from link
#### BLocked