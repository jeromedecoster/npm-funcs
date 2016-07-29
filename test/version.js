const fn = require('../version')
const test = require('tape')

test('version', { timeout:20000 }, function (t) {

  fn('is-funcs')
  .then(function(data) {
    // console.log(data)
    t.deepEqual(data.name,           'is-funcs')
    t.deepEqual(typeof data.version, 'string')
    t.deepEqual(Object.keys(data).length, 2)
    t.end()
  })
  .catch(function(err) {
    t.deepEqual(err.code, 'ENOTFOUND', 'error catch ENOTFOUND')
    t.end()
  })
})

test('versions unknown package', { timeout:20000 }, function (t) {

  fn('is-unknown-package-name')
  .catch(function(err) {
    if (err.message == 'Invalid package name') {
      t.deepEqual(err.message, 'Invalid package name', 'Invalid package name catched')
      t.end()
    } else {
      t.deepEqual(err.code, 'ENOTFOUND', 'error catch ENOTFOUND')
      t.end()
    }
  })
})
