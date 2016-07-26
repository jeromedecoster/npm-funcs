const dependents = require('./request').dependents
const dependencies = require('./dependencies')
const isOutdated = require('./is-outdated')
const versions = require('./versions')

module.exports = function(name) {
  return new Promise(function(resolve, reject) {
    Promise.all([versions(name, true), dependents(name)])
    .then(function(arr) {
      return {
        name:    name,
        version: arr[0].version,
        rows:    arr[1].rows
      }
    })
    .then(collect)
    .then(resolve)
    .catch(reject)
  })
}

function collect(data) {
  return new Promise(function(resolve, reject) {
    var promises = data.rows.map(function(e) {
      return dependencies(e.key[1], true)
    })
    Promise.all(promises)
    .then(function(arr) {
      arr = arr.filter(function(e) {
        return data.name in e.dependencies
      })
      var obj = {
        name:     data.name,
        version:   data.version,
        packages: {}
      }
      var dep
      arr.forEach(function(e) {
        dep = e.dependencies[data.name]
        obj.packages[e.name] = {
          version:    e.version,
          dependency: dep,
          outdated:   isOutdated(data.version, dep)
        }
      })
      obj.count = data.rows.length
      resolve(obj)
    })
    .catch(reject)
  })
}
