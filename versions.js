const registry = require('./request').registry

module.exports = function(name) {
  return new Promise(function(resolve, reject) {
    registry(name)
    .then(function(data) {
      if (data.name == null) {
        throw new Error('Invalid package name')
      }
      var obj = {
        name:     name,
        versions: {},
        count:    Object.keys(data.versions).length
      }
      for (var k in data.versions) {
        obj.versions[k] = data.time[k].substr(0, 10)
      }
      resolve(obj)
    })
    .catch(reject)
  })
}
