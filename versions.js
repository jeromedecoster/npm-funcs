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
          date:    data.time[k].substr(0, 10)
        })
      }
      var last = arr[arr.length - 1]
      if (latest === true) {
        obj.version = last.version
        obj.date = last.date
      } else {
        obj.versions = {}
        arr.forEach(function(e, i, a) {
          if (latest === true && i != a.length - 1) return
          obj.versions[e.version] = e.date
        })
        obj.latest = {
          version: last.version,
          date:    last.date
        }
      }
      obj.count = arr.length
      resolve(obj)
    })
    .catch(reject)
  })
}
