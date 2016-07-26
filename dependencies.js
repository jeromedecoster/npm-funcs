const registry = require('./request').registry

module.exports = function(name, latest) {
  return new Promise(function(resolve, reject) {
    registry(name)
    .then(function(data) {
      if (data.name == null) {
        reject(new Error('Invalid package name'))
      }
      var obj = {
        name: name
      }
      var arr = []
      for (var k in data.versions) {
        arr.push({
          version: k,
          dependencies: data.versions[k].dependencies || {}
        })
      }
      var last = arr[arr.length - 1]
      if (latest === true) {
        obj.version = last.version,
        obj.dependencies = last.dependencies
      } else {
        obj.versions = {}
        arr.forEach(function(e, i, a) {
          obj.versions[e.version] = e.dependencies
        })
        obj.latest = {
          version: last.version,
          dependencies : last.dependencies
        }
      }
      resolve(obj)
    })
    .catch(reject)
  })
}
