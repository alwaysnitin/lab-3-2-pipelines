const { normalizeName, phoneNumberValidator } = require('../src/utils');

test('normalizeName returns "John Doe" for normal lowercase "john doe"', () => {
  expect(normalizeName('john doe')).toBe('John Doe');
});

test('normalizeName trims leading and trailing whitespace from "  john doe  "', () => {
  expect(normalizeName('  john doe  ')).toBe('John Doe');
});

test('normalizeName collapses multiple internal spaces in "mary   ann" to a single space', () => {
  expect(normalizeName('mary   ann')).toBe('Mary Ann');
});

test('normalizeName converts all-uppercase "MARY ANN" to title case', () => {
  expect(normalizeName('MARY ANN')).toBe('Mary Ann');
});

test('normalizeName converts mixed-case "jOhN dOe" to title case', () => {
  expect(normalizeName('jOhN dOe')).toBe('John Doe');
});

test('normalizeName returns "Alice" for single word "alice"', () => {
  expect(normalizeName('alice')).toBe('Alice');
});

test('normalizeName returns null for empty string ""', () => {
  expect(normalizeName('')).toBe(null);
});

test('normalizeName returns null for whitespace-only string "   "', () => {
  expect(normalizeName('   ')).toBe(null);
});

test('normalizeName returns null for number 42', () => {
  expect(normalizeName(42)).toBe(null);
});

test('normalizeName returns null for null', () => {
  expect(normalizeName(null)).toBe(null);
});

test('normalizeName returns null for undefined', () => {
  expect(normalizeName(undefined)).toBe(null);
});

test('normalizeName returns "O\'brien" for "o\'brien" (apostrophe, known behavior)', () => {
  expect(normalizeName("o'brien")).toBe("O'brien");
});

test('normalizeName returns "Mcfly" for "McFly" (known behavior)', () => {
  expect(normalizeName('McFly')).toBe('Mcfly');
});

test('phoneNumberValidator returns true for E.164 number "+14155552671"', () => {
  expect(phoneNumberValidator('+14155552671')).toBe(true);
});

test('phoneNumberValidator returns true for number with spaces "+44 20 7946 0958"', () => {
  expect(phoneNumberValidator('+44 20 7946 0958')).toBe(true);
});

test('phoneNumberValidator returns true for number with dashes "+49-30-12345678"', () => {
  expect(phoneNumberValidator('+49-30-12345678')).toBe(true);
});

test('phoneNumberValidator returns true for number with dots "+33.1.23.45.67.89"', () => {
  expect(phoneNumberValidator('+33.1.23.45.67.89')).toBe(true);
});

test('phoneNumberValidator returns true for number with parens and dash "+1 (800) 555-0199"', () => {
  expect(phoneNumberValidator('+1 (800) 555-0199')).toBe(true);
});

test('phoneNumberValidator returns true for number without leading plus "14155552671"', () => {
  expect(phoneNumberValidator('14155552671')).toBe(true);
});

test('phoneNumberValidator returns true for minimum 7-digit number "1234567"', () => {
  expect(phoneNumberValidator('1234567')).toBe(true);
});

test('phoneNumberValidator returns true for maximum 15-digit number "123456789012345"', () => {
  expect(phoneNumberValidator('123456789012345')).toBe(true);
});

test('phoneNumberValidator returns true for number type 14155552671', () => {
  expect(phoneNumberValidator(14155552671)).toBe(true);
});

test('phoneNumberValidator returns true for number with space after plus "+ 14155552671"', () => {
  expect(phoneNumberValidator('+ 14155552671')).toBe(true);
});

test('phoneNumberValidator returns false for 6 digits after stripping plus "+123456"', () => {
  expect(phoneNumberValidator('+123456')).toBe(false);
});

test('phoneNumberValidator returns false for 5-digit string "12345"', () => {
  expect(phoneNumberValidator('12345')).toBe(false);
});

test('phoneNumberValidator returns false for 16 digits after stripping plus "+1234567890123456"', () => {
  expect(phoneNumberValidator('+1234567890123456')).toBe(false);
});

test('phoneNumberValidator returns false for 18-digit string "123456789012345678"', () => {
  expect(phoneNumberValidator('123456789012345678')).toBe(false);
});

test('phoneNumberValidator returns false for plus sign in middle "123+4567890"', () => {
  expect(phoneNumberValidator('123+4567890')).toBe(false);
});

test('phoneNumberValidator returns false for second plus sign "+1+2345678901"', () => {
  expect(phoneNumberValidator('+1+2345678901')).toBe(false);
});

test('phoneNumberValidator returns false for letters in string "123abc4567890"', () => {
  expect(phoneNumberValidator('123abc4567890')).toBe(false);
});

test('phoneNumberValidator returns false for alpha mnemonic "+1-800-FLOWERS"', () => {
  expect(phoneNumberValidator('+1-800-FLOWERS')).toBe(false);
});

test('phoneNumberValidator returns false for illegal symbol "123@456789"', () => {
  expect(phoneNumberValidator('123@456789')).toBe(false);
});

test('phoneNumberValidator returns false for empty string ""', () => {
  expect(phoneNumberValidator('')).toBe(false);
});

test('phoneNumberValidator returns false for separators-only string "---"', () => {
  expect(phoneNumberValidator('---')).toBe(false);
});

test('phoneNumberValidator returns false for non-integer float 12345678.9', () => {
  expect(phoneNumberValidator(12345678.9)).toBe(false);
});

test('phoneNumberValidator returns null for null', () => {
  expect(phoneNumberValidator(null)).toBe(null);
});

test('phoneNumberValidator returns null for undefined', () => {
  expect(phoneNumberValidator(undefined)).toBe(null);
});

test('phoneNumberValidator returns null for boolean true', () => {
  expect(phoneNumberValidator(true)).toBe(null);
});

test('phoneNumberValidator returns null for boolean false', () => {
  expect(phoneNumberValidator(false)).toBe(null);
});

test('phoneNumberValidator returns null for object {}', () => {
  expect(phoneNumberValidator({})).toBe(null);
});

test('phoneNumberValidator returns null for array []', () => {
  expect(phoneNumberValidator([])).toBe(null);
});

test('phoneNumberValidator returns null for NaN', () => {
  expect(phoneNumberValidator(NaN)).toBe(null);
});

test('phoneNumberValidator returns null for Infinity', () => {
  expect(phoneNumberValidator(Infinity)).toBe(null);
});

test('phoneNumberValidator returns null for -Infinity', () => {
  expect(phoneNumberValidator(-Infinity)).toBe(null);
});

test('phoneNumberValidator returns null for negative number -14155552671', () => {
  expect(phoneNumberValidator(-14155552671)).toBe(null);
});
