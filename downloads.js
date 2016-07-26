const downloads = require('./request').downloads

module.exports = function(name, latest) {
  return new Promise(function(resolve, reject) {
    downloads(name)
    .then(function(data) {
      if (data.downloads == null || data.downloads.length == 0) {
        reject(new Error('Invalid package name'))
      }
      var obj = {
        name: name
      }
      var total = 0
      var arr = []
      var tmp
      for (var k in data.downloads) {
        tmp = data.downloads[k]
        arr.push({
          date:      tmp.day,
          downloads: tmp.downloads
        })
        total += tmp.downloads
      }
      var last = arr[arr.length - 1]
      if (latest === true) {
        obj.date = last.date
        obj.downloads = last.downloads
      } else {
        obj.downloads = {}
        arr.forEach(function(e, i, a) {
          obj.downloads[e.date] = e.downloads
        })
        obj.latest = {
          date:      last.date,
          downloads: last.downloads
        }
      }
      obj.total = total
      resolve(obj)
    })
    .catch(reject)
  })
}
