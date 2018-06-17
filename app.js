"use strict";
/* jshint -W117 */
/* jshint -W097 */

var express = require('express');
const app = express();
app.get('/', mw_scheduleFilter);

// Middleware function for root REST API 
function mw_scheduleFilter(req, res) {
    res.json(scheduleFilter(req.body));
}

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
 * Case 3. Day, Day
 * Case 4. Day-Day
 * Case 5. Day-Day hh:mm-hh:mm
 * 
 * Note, its expected that comma separated days are split before 
 * passing to this function. 
 */
function isValidInput(input) {
    var isValid = false;
    input = input.toLowerCase().trim();

    // Case 1. Single day
    if (isValidDay(input)) {
        isValid = true;

        // Case 2. Day + hours
    } else if (new RegExp('.*[0-2][0-3]:[0-5][0-9]-[0-2][0-3]:[0-5][0-9]').test(input)) { // contains a 24h time range
        console.log("Case 2: Day + hours");
        var dayAndTimeInput = input.split(" ");
        dayAndTimeInput = dayAndTimeInput.map(str => str.trim());
        if (dayAndTimeInput.length > 0) {
            var twentyFourHourTimeFormat = new RegExp('[0-2][0-3]:[0-5][0-9]-[0-2][0-3]:[0-5][0-9]'); // time 
            isValid = isValidDay(dayAndTimeInput[0]) && twentyFourHourTimeFormat.test(dayAndTimeInput[1]);
        }

        // Case 3. Multiple time ranges
    } else if (input.indexOf(",") > 0) {
        var timeRanges = input.split(",");
        timeRanges = timeRanges.map(str => str.trim());
        if (Array.isArray(timeRanges) && timeRanges.length > 1) {
            var foundValidDay = false;
            for (var timeRange of timeRanges) {
                if (isValidDay(timeRange) && !foundValidDay) {
                    isValid = true;
                    foundValidDay = true;
                }
            }
        }
    } else {
        console.log("Error: Unknown input format");
    }

    return isValid;
}

function isValidDay(input) {
    if (Object.keys(DaysEnum).indexOf(input) != -1) { // To do: handle case where 
        return true;
    }
}

/*
 * @param t1 : Time range.
 *  Sample input: "mon"
 *  Sample input: "mon, wed"
 *  Sample input: "mon 11:30"
 * 
 * @param t2 : Time range. Sample: "mon" 
 * 
 * Checks if t2 is during t1 
 * 
 */
function isDuring(t1, t2) {
    if (t1 == t2) return true; //base case 
}

/*
 * @param schedule : an array of arrays. Each sub array contains ["String of time ranges", {id : "char"}]
 * @param datetime : a datetime to filter on 
 */
function scheduleFilter(schedule, datetime) {
    var result = [];

    for (var timeRangesAndEvent of schedule) {
        timeRangesAndEvent[0] = timeRangesAndEvent[0].replace(/\|/g, ','); // replace all columns | with commas 
        var individualTimeRanges = timeRangesAndEvent[0].split(","); // in case of multiple timeRanges
        var isDuringAtLeastOneTimeRange = false;

        for (var individualTimeRange of individualTimeRanges) {
            if (isValidInput(individualTimeRange) && !isDuringAtLeastOneTimeRange) {
                if (isDuring(individualTimeRange, datetime)) {
                    result.push(timeRangesAndEvent[1].id);
                    isDuringAtLeastOneTimeRange = true; // no need to continue checking rest of time ranges
                }
            }
        }

        // for (var oneTimeRange of individualTimeRanges) {
        //     if (isValidInput(oneTimeRange) && !isDuringAtLeastOneTimeRange) {
        //         if (isDuring(oneTimeRange, datetime)) {
        //             result.push(timeRangesAndEvent[1].id);
        //             isDuringAtLeastOneTimeRange = true; // no need to continue checking rest of time ranges
        //         }
        //     }
        // }
    }
    return result;
}

exports.isValidInput = isValidInput;
exports.scheduleFilter = scheduleFilter;