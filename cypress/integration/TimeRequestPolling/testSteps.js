import {When, Then} from "cypress-cucumber-preprocessor/steps";


When("Learn the current date information", () => {
    cy.learnCurrentTime().then(currentTime => {
        cy.log(currentTime);
    });
    
})

Then("Add one minute to current date and check recursively is the time has come", () => {
    cy.addOneMinuteToCurrentTime().then(result => {
        cy.pollRequestToCheckOneMinute(20,result)
    });
})