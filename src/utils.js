/** Normalizes a name string to title case. Limitations: apostrophes/hyphens are not treated as word separators (O'Brien -> O'brien), and everything after the first letter of each word is lowercased (McFly -> Mcfly). */
function normalizeName(name) {
  if (typeof name !== 'string') {
    return null;
  }
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return null;
  }
  return trimmed
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

/** Validates the structure of an international phone number (E.164-style): accepts a string or a non-negative finite number (very large numbers passed as `number` may stringify to scientific notation and be rejected — pass them as strings instead); strips a single leading '+' only (a '+' anywhere else returns false); then strips separators matching /[\s.()\-]/g (spaces, dots, parentheses, dashes); returns null for wrong/bad input type (including NaN, Infinity, negatives, booleans, objects, arrays, null, undefined), false for correct type but invalid format, non-integer numbers, or digit count outside 7–15, and true for structurally valid (does not verify that country codes are real). */
function phoneNumberValidator(num) {
  if (typeof num !== 'string' && typeof num !== 'number') {
    return null;
  }
  if (typeof num === 'number' && (isNaN(num) || !isFinite(num) || num < 0)) {
    return null;
  }
  if (typeof num === 'number' && !Number.isInteger(num)) {
    return false;
  }
  let str = String(num);
  if (str.charAt(0) === '+') {
    str = str.slice(1);
  }
  if (str.indexOf('+') !== -1) {
    return false;
  }
  str = str.replace(/[\s.()\-]/g, '');
  if (!/^\d+$/.test(str)) {
    return false;
  }
  if (str.length < 7 || str.length > 15) {
    return false;
  }
  return true;
}

module.exports = { normalizeName, phoneNumberValidator };
