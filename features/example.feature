Feature: Testing

Scenario: Test StringProcessing code
    When I want to test @faker.user and @randomInt
    When I want to test @faker.user and @rnd(100)
    When I want to test @faker.email and @rnd(50,100)
    # @data(fileName, fieldName) - fileName must be under config/${environment}/data
    When I want to load @data(example,test) from json
    When I want to load @data(example,timeout) from json
    When I want to load @data(example,someDataField) from json
    When I want to load @data(example,someDataField) from json

Scenario: Test Assertion works
    Given I am on MacMillanLearning.com
    Then I want assert "btn_login" matches "SIGN IN"
