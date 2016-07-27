const isOutdated = require('./is-outdated')
const isRange = require('./is-range')
const version = require('./version')

module.exports = function(name, range) {
  return new Promise(function(resolve, reject) {
    if (isRange(range) == false) {
      throw new Error('Invalid range')
    }
    version(name)
    .then(function(data) {
      var obj = {
        name:     name,
        version:  data.version,
        range:    range,
        outdated: isOutdated(data.version, range)
      }
      resolve(obj)
    })
    .catch(reject)
  })
}
