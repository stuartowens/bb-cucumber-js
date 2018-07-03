Feature: Testing

Scenario: Test StringProcessing code
    When I want to test @faker.user and @randomInt
    When I want to test @faker.user and @rnd(100)
    When I want to test @faker.email and @rnd(50,100)
    Then Verify Successful permission grant message
    # @data(fileName, fieldName) - fileName must be under config/${environment}/data
    When I want to load @data(example,test) from json
    When I want to load @data(example,timeout) from json
    When I want to load @data(example,someDataField) from json
