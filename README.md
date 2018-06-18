# About this project
* This is a NodeJS app written in JavaScript (ES6 with CommonJS). Tested using Node v8.9.4. 
* ExpressJS is used for the REST API. 
* Runs on default port localhost:3000
* Unit tests written in Jest 

# Instructions for running from CLI
1) Unzip/clone this Repo

2) Run `node -v` and verify you are running a version compatible with Node v8.9.4

3) Run `npm install` to make sure you have all dependencies
    #) body-parser
    #) express

4) Run `node server.js`  to start the NodeJS Express server

5) Open `localhost:3000` in Google Chrome 

6) You can now make post requests to the endpoint `/scheduleFilter`

# How to send post request to API
You can skip to step 2.2 if you are already familiar sending HTTP requests to a server.

## Sending Requests
There is no front end, so requests need to be made directly to the API. The example below uses Postman.
1) Install Postman from this link:  https://www.getpostman.com/

2) Select the first option, "Request" 
    #) Pick any name, for ex. "Schedule Filter"
    1) Set the request method to POST 
    #) Enter `localhost:3000/scheduleFilter` in the address bar
    3) Enter the following data in the request body
    ```
    {
        "schedule": [ ["mon, tues", {"id": "a"}] ],
        "datetime": "mon"
    }
    ```
    Feel free to add several days to the schedule, i.e. ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"]

