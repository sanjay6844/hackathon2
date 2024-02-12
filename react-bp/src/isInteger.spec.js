const isInteger = require("./isInteger");

describe("isInteger", () => {
  const integerNumbers = [-10, -1, 0, 1, 10];

  test.each(integerNumbers)("passes for integer value %j", (fixture) =>
    expect(isInteger(fixture)).toBe(true)
  );

  const floatNumbers = [-10.1, -1.1, 0.1, 1.1, 10.1];

  test.each(floatNumbers)("fails for non-integer value %j", (fixture) =>
    expect(isInteger(fixture)).toBe(true)
  );
});
