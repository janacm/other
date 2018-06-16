'use strict';
const express = require('express');
const _ = require('lodash');
const app = express();
app.get('/', mw_scheduleFilter)
app.listen(3000, function () {
    console.log("Express server listening on port 3000");
});

// Middleware function for root REST API 
function mw_scheduleFilter(req, res){
    res.json(scheduleFilter(req.body));
}
// Sample schedule 
const s1 = [
    ["Mon,Sun 11:30-21:00", { "id": "a" }],
    ["Tues-Thurs 12:00-13:00 | Sun 04:00-08:00", { "id": "b" }],
    ["Mon-Wed,Fri 01:00-22:00 | Thurs 15:00-16:00 | Sat-Sun 10:00-24:00", { "id": "c" }],
    ["Wed 00:00-24:00", { "id": "d" }],
    ["Mon-Sat", { "id": "e" }],
    ["Tues 05:00-05:20 | Mon-Wed 05:30-12:00", { "id": "f" }],
    ["Sat,Sun 00:01-00:02 | Fri-Sat 0:30-17:00", { "id": "g" }]
];

var DaysEnum = Object.freeze({
    "mon": 1,
    "tues": 2,
    "wed": 3,
    "thurs": 4,
    "fri": 5,
    "sat": 6,
    "sun": 7,
});


/*
 * Validates that input meets any one of the following options:
 * Case 1. Day
 * Case 2. Day hh:mm-hh:mm
 * Case 3. Day-Day
 * Case 4. Day-Day hh:mm-hh:mm
 * 
 * Note, its expected that comma separated days are split before 
 * passing to this function. 
 */
function isValidInput(input) {
    var isValid = false;
    input = input.toLowerCase();

    // Case 1. Single day
    isValid = isValidDay(input); 

    // Case 2. Day + time 
    var twentyFourHourTimeFormat = new RegExp('... [0-2][0-3]:[0-5][0-9]'); // time 

    return isValid;
}

function isValidDay(input) {
    if (_.includes(Object.keys(DaysEnum), input)) {
       return true;
    }
}

/*
 * @param t1 : Time range. Sample: "mon"
 * @param t2 : Time range. Sample: "mon" 
 * 
 * Checks if t2 is during t1 
 * 
 */
function isDuring(t1, t2) {
    if (t1 == t2) return true; //base case 
}

function scheduleFilter(schedule, datetime) {
    var result = []; 
    schedule = schedule.replace(/|/g ,','); // replace all columns | with commas 
    
    for (var event of schedule) {
        if (isValidInput(event[0])) {
            if (isDuring(event[0], datetime)) {
                result.push(event[1]);
            }
        }
    }
    return result;
}

exports.isValidInput = isValidInput;
exports.scheduleFilter = scheduleFilter;