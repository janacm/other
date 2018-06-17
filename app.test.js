var isValidInput = require('./app').isValidInput;
var scheduleFilter = require('./app').scheduleFilter;

test('Single days are valid input', () => {
    expect(isValidInput("mon")).toEqual(true);
    expect(isValidInput("Tues")).toEqual(true);
    expect(isValidInput("wed")).toEqual(true);
    expect(isValidInput("thurs")).toEqual(true);
    expect(isValidInput("fri")).toEqual(true);
    expect(isValidInput("Sat")).toEqual(true);
    expect(isValidInput("SUN")).toEqual(true);
});

test('Schedule filter works for single days', () => {
    expect(scheduleFilter([
        ["mon", { "id": "a" }],
        ["tues",{ "id": "b" }]
    ], "mon")).toEqual(["a"]);

    expect(scheduleFilter([
        ["mon", { "id": "a" }],
        ["tues",{ "id": "b" }]
    ], "tues")).toEqual(["b"]);

    expect(scheduleFilter([
        ["wed", { "id": "a" }],
        ["tues",{ "id": "b" }]
    ], "Sat")).toEqual([]);
});

test('Multiple comma separated days are valid input', () => {
    expect(isValidInput("mon,Tues")).toEqual(true);
});

test('Multiple comma separated days and spaces, are valid input', () => {
    expect(isValidInput("wed, fri")).toEqual(true);
    expect(isValidInput("thurs, sat, sun")).toEqual(true);
});

test('Schedules with multiple days can be filtered on a single day', () => {
    expect(scheduleFilter([
        ["fri, tues", {"id": "a"}],
        ["mon,wed", {"id": "b"}],
        ["fri,wed", {"id": "b"}],
    ], "fri")).toEqual(["a", "b"]);

    expect(scheduleFilter([
        ["tues, fri", {"id": "x"}],
        ["mon,wed", {"id": "y"}],
        ["fri,wed", {"id": "y"}],
    ], "tues")).toEqual(["x"]);

    expect(scheduleFilter([
        ["tues, fri", {"id": "x"}],
        ["mon,wed", {"id": "y"}],
        ["fri,wed", {"id": "y"}],
    ], "sat")).toEqual([]);
});

test('Days with hour ranges are valid input', () => {
    expect(isValidInput("wed 01:01-02:03")).toEqual(true);
    expect(isValidInput("thurs 11:30-23:09")).toEqual(true);
});


test('Schedules with hour ranges are valid input', () => {
    expect(scheduleFilter([
        ["wed 01:01-02:03", {"id": "a"}],
        ["mon,wed", {"id": "b"}],
        ["fri,wed", {"id": "b"}],
    ], "wed 01:02")).toEqual(["a", "b"]);
});

// To do: Final test case: schedule filter works with the example given in the requirements PDF
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