const registry = require('./request').registry

module.exports = function(name) {
  return new Promise(function(resolve, reject) {
    registry(name)
    .then(function(data) {
      if (data.name == null) {
        throw new Error('Invalid package name')
      }
      var version = data['dist-tags'].latest
      var obj = {
        name:    name,
        version: version,
        date:    data.time[version].substr(0, 10),
        count:   Object.keys(data.versions).length
      }
      resolve(obj)
    })
    .catch(reject)
  })
}
