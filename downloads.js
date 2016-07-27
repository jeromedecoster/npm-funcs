const downloads = require('./request').downloads

module.exports = function(name) {
  return new Promise(function(resolve, reject) {
    downloads(name)
    .then(function(data) {
      if (data.downloads == null || data.downloads.length == 0) {
        throw new Error('Invalid package name')
      }
      var obj = {
        name:      name,
        downloads: {},
        total:     0
      }
      var tmp
      for (var k in data.downloads) {
        tmp = data.downloads[k]
        obj.downloads[tmp.day] = tmp.downloads
        obj.total += tmp.downloads
      }
      resolve(obj)
    })
    .catch(reject)
  })
}
