const isOutdated = require('./is-outdated')
const versions = require('./versions')
const isRange = require('./is-range')

module.exports = function(name, range) {
  return new Promise(function(resolve, reject) {
    if (isRange(range) == false) {
      reject(new Error('Invalid range'))
    }
    versions(name, true)
    .then(function(data) {
      resolve(isOutdated(data.version, range))
    })
    .catch(reject)
  })
}
