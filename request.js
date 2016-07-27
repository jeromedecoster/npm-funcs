const https = require('https')

module.exports.registry = function(name, latest) {
  var opts = {
    hostname: 'registry.npmjs.org',
    path:     '/' + name
  }
  if (latest === true) {
    opts.path += '/latest'
  }
  return request(opts)
}

module.exports.dependents = function(name) {
  var opts = {
    hostname: 'skimdb.npmjs.com',
    path:     '/registry/_design/app/_view/dependedUpon?group_level=2' +
              '&startkey=["' + name + '"]&endkey=["' + name + '"%2C{}]'
  }
  return request(opts)
}

module.exports.packages = function(name) {
  var opts = {
    hostname: 'registry.npmjs.org',
    path:     '/-/_view/browseAuthors?group_level=2' +
              '&start_key=["' + name + '"]&end_key=["' + name + '",{}]'
  }
  return request(opts)
}

module.exports.downloads = function(name) {
  var d = new Date
  var day = d.getDate().toString()
  if (day.length == 1) day = '0' + day
  var mon = (d.getMonth() + 1).toString()
  if (mon.length == 1) mon = '0' + mon
  var yea = d.getFullYear().toString()

  var opts = {
    hostname: 'api.npmjs.org',
    path:     '/downloads/range/2000-12-31:' + yea + '-' + mon + '-' + day + '/' + name
  }
  return request(opts)
}

function request(opts) {
  return new Promise(function(resolve, reject) {
    var data = ''
    var req = https.request(opts, function(res) {
      res.on('data', function(d) { data += d })
      res.on('end',  function(d) {
        try {
          resolve(JSON.parse(data))
        } catch(e) {
          reject(new Error('URL request error'))
        }
      })
    })
    req.end()
    req.on('error', reject)
  })
}
