# :shamrock: cypress-request-polling-example :shamrock:

Hey everyone!

In this code, I provided a request polling example, which is very common in testing applications, especially we do not know about an action's expected time. In these situations, we can check whether the condition is satisfied recursively.

## First Part

In first part which is represented as "Learn the current date information", we are checking the current time from an open-source API which is provided by http://worldtimeapi.org/ and printing it.

## Second Part

We are adding 1 minute to current time. After addition, we recursively check (Every 10 secs) whether "1 added minute" is satisfied. This recursive function has a timeout (which can be calculated as parameter "numberOfRetry*10 sec"); and if timeout is passed; that means update of minute information coming from API is not updated as expected.
