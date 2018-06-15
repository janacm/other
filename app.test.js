const { isValidInput, scheduleFilter } = require('./app');

test('Single days are valid input', () => {
    expect(isValidInput("mon")).toBe(true);
    expect(isValidInput("Tues")).toBe(true);
    expect(isValidInput("wed")).toBe(true);
    expect(isValidInput("thurs")).toBe(true);
    expect(isValidInput("fri")).toBe(true);
    expect(isValidInput("Sat")).toBe(true);
    expect(isValidInput("SUN")).toBe(true);
});

test('Schedule filter works for single days', () => {
    expect(scheduleFilter([["mon", "a"],["tues", "b"]], "mon")).toBe(["a"]);
});