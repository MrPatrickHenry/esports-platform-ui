Feature: Login

@regression @smoke
Scenario: Verification of Login Function  
Given user on the Login Page
And user enters "email address" with "patrickhenrymcsd@gmail.com"
And user enters "password" with "123456"  
And user click "SIGN IN" button
Then user should see "Tournaments" 