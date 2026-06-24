const { validateAge } = require('../src/validator');

test('validateAge returns true for a valid age of 25', () => {
  expect(validateAge(25)).toBe(true);
});
