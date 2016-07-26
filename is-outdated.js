const satisfies = require('semver').satisfies
const isRange = require('./is-range')
const valid = require('semver').valid

module.exports = function(version, range) {
  if (valid(version) == null || isRange(range) == false) return
  return satisfies(version, range) === false
}
