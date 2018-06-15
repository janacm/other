'use strict';
const express = require('express');
const _ = require('lodash');
const app = express();
app.get('/', (req, res) => res.send('Schedule Filter App'))

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
 * 1. Day
 * 2. Day hh:mm-hh:mm
 * 3. Day-Day
 * 4. Day-Day hh:mm-hh:mm
 */
function isValidInput(input) {
    var isValid = false;
    input = input.toLowerCase();

    // 1.
    if (_.includes(Object.keys(DaysEnum), input)) {
        isValid = true;
    };
    var r1 = new RegExp('2[0-3]:[0-5][0-9]');
    return isValid;
}

function scheduleFilter(event, datetime){
    var result = []; 
    _.forEach(Events, (event) => {
        if (isValidInput(event[0])){
            if (isDuring(event[0], datetime)) {
                result.push(event[1]);
            }
        }
    })
    return result;
}

module.exports = isValidInput, scheduleFilter;