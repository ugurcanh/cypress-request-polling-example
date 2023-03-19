//This command GETs current time by using free API provided by http://worldtimeapi.org/
Cypress.Commands.add("learnCurrentTime", () => {
    //Sending the request as London timezone
    cy.request({
        method: "GET",
        url: "http://worldtimeapi.org/api/timezone/Europe/Istanbul"
    }).then(response => {
        return cy.wrap("Current time is: " + response.body.datetime );
    })
});

//This command gets current time, fetches minute information inside and adds 1 and returns
Cypress.Commands.add("addOneMinuteToCurrentTime", () => {
    //Sending the request as London timezone
    cy.request({
        method: "GET",
        url: "http://worldtimeapi.org/api/timezone/Europe/Istanbul"
    }).then(response => {
        //Fetch current minute information
        let currentMinute = response.body.datetime.substring(14, 16);
        
        return cy.wrap(parseInt(currentMinute) + 1);
    })
});

//This command sends request for every 10 seconds recursively and gets current time information.
//It compares minutes information and checks whether minute information is updated as expected.
//numberOfRetry is the parameter that how many times request would be send.
//expectedMinute is the minute information that is expected.
Cypress.Commands.add("pollRequestToCheckOneMinute", (numberOfRetry, expectedMinute) => {

     //Since this is a recursive function, it needs a base condition
    if(numberOfRetry === 0){
      //If base condition is provided, it means expectedMinutes cannot be reached; so we should expect it as false and fail  
      expect(false).to.be.true;  
    }
    cy.wait(10000);
    //Sending the request as London timezone
    cy.request({
        method: "GET",
        url: "http://worldtimeapi.org/api/timezone/Europe/London"
    }).then(response => {
        //If expected minute information is provided by API response, we should expect a PASS condition
        if(parseInt(response.body.datetime.substring(14, 16)) === expectedMinute){
            expect(true).to.be.true;
        }
        else{
            //If expected minute information is not provided, we should try again with one decreased numberOfTrial parameter till base condition is satisfied.
            cy.pollRequestToCheckOneMinute(numberOfRetry-1, expectedMinute);
        }
    })

    
    
})