const registry = require('./request').registry
const outdated = require('./outdated')

module.exports = function(name) {
  return new Promise(function(resolve, reject) {
    registry(name, true)
    .then(function(data) {
      if (data.name == null) {
        // throw instead reject when chaining
        throw new Error('Invalid package name')
      }
      var arr = []
      if (data.dependencies != null) {
        for (var k in data.dependencies) {
          arr.push({
            name:       k,
            dependency: data.dependencies[k]
          })
        }
      }
      return {
        name:    name,
        version: data.version,
        arr:     arr
      }
    })
    .then(collect)
    .then(resolve)
    .catch(reject)
  })
}

function collect(data) {
  return new Promise(function(resolve, reject) {
    var promises = data.arr.map(function(e) {
      return outdated(e.name, e.dependency)
    })
    Promise.all(promises)
    .then(function(arr) {
      var obj = {
        name:         data.name,
        version:      data.version,
        dependencies: {}
      }
      arr.forEach(function(e) {
        obj.dependencies[e.name] = {
          version:  e.version,
          range:    e.range,
          outdated: e.outdated
        }
      })
      resolve(obj)
    })
    .catch(reject)
  })
}
