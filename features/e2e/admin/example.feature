Feature: Testing

Scenario: Test StringProcessing code
    When I want to test @faker.user and @randomInt
    When I want to test @faker.user and @rnd(100)
    When I want to test @faker.email and @rnd(50,100)
    Then Verify Successful permission grant message
