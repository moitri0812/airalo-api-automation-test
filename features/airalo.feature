Feature: Airalo Partner API

  Scenario: Place an order and validate eSIM list
    Given I authenticate with the API
    When I place an order for 6 "merhaba-7days-1gb" eSIMs
    Then the response should have status 200
    When I fetch the eSIM list for "merhaba-7days-1gb" with quantity 6
    Then the response body should have "merhaba-7days-1gb" as eSIMs
    And there should be 6 eSIMs with the "merhaba-7days-1gb" package slug