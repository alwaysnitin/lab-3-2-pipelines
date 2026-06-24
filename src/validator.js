/** Valid age = integer in [0, 120] (120 = practical human longevity cap). */
function validateAge(age) {
  if (typeof age !== 'number' || Number.isNaN(age)) {
    return false;
  }
  if (!Number.isInteger(age)) {
    return false;
  }
  return age >= 0 && age <= 120;
}

module.exports = { validateAge };
