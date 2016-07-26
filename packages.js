const packages = require('./request').packages
const versions = require('./versions')

module.exports = function(name) {
  return new Promise(function(resolve, reject) {
    packages(name)
    .then(function(data) {
      if (data.rows == null || data.rows.length == 0) {
        reject(new Error('Invalid author name'))
      }
      return {
        name: name,
        rows: data.rows
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
      return versions(e.key[1], true)
    })
    Promise.all(promises)
    .then(function(arr) {
      var obj = {
        name: data.name,
        packages: {}
      }
      for (var k in arr) {
        obj.packages[arr[k].name] = arr[k].latest
      }
      obj.count = arr.length
      resolve(obj)
    })
    .catch(reject)
  })
}
