const fn = require('../dependents')
const test = require('tape')

test('dependents', { timeout:20000 }, function (t) {

  fn('is-funcs')
  .then(function(data) {
    // console.log(data)
    t.deepEqual(data.name,           'is-funcs')
    t.deepEqual(typeof data.version, 'string')
    t.deepEqual(data.count > 2,      true)
    var keys = Object.keys(data.dependents)
    t.deepEqual(keys.length > 1, true)
    t.deepEqual(typeof data.dependents[keys[0]].version,  'string')
    t.deepEqual(typeof data.dependents[keys[0]].range,    'string')
    t.deepEqual(typeof data.dependents[keys[0]].outdated, 'boolean')
    t.end()
  })
  .catch(function(err) {
    t.deepEqual(err.code, 'ENOTFOUND', 'error catch ENOTFOUND')
    t.end()
  })
})

test('dependents unknown package', { timeout:20000 }, function (t) {

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
