const registry = require('./request').registry

module.exports = function(name) {
  return new Promise(function(resolve, reject) {
    registry(name, true)
    .then(function(data) {
      if (data.name == null) {
        throw new Error('Invalid package name')
      }
      var obj = {
        name:    name,
        version: data.version
      }
      resolve(obj)
    })
    .catch(reject)
  })
}
