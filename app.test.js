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
    expect(scheduleFilter([["mon", "a"],["tues", "b"]], "mon")).toEqual(["a"]);
    expect(scheduleFilter([["mon", "a"],["tues", "b"]], "tues")).toEqual(["b"]);
    expect(scheduleFilter([["wed", "a"],["tues", "b"]], "Sat")).toEqual([]);
});

test('Multiple comma separated days are valid input', () => {
    expect(isValidInput("mon,Tues")).toEqual(true);
    expect(isValidInput("wed, fri")).toEqual(true);
    expect(isValidInput("thurs, sat, sun")).toEqual(true);
});