const fn = require('../dependencies')
const test = require('tape')

test('dependencies', { timeout:20000 }, function (t) {

  fn('object-funcs')
  .then(function(data) {
    // console.log(data)
    t.deepEqual(data.name,           'object-funcs')
    t.deepEqual(typeof data.version, 'string')
    var keys = Object.keys(data.dependencies)
    t.deepEqual(keys.length > 0, true, 'keys.length > 0')
    var key = keys[0]
    t.deepEqual(typeof data.dependencies[key].version,  'string',  '[key].version')
    t.deepEqual(typeof data.dependencies[key].range,    'string',  '[key].range')
    t.deepEqual(typeof data.dependencies[key].outdated, 'boolean', '[key].outdated')
    t.end()
  })
  .catch(function(err) {
    console.log(err)
    t.deepEqual(err.code, 'ENOTFOUND', 'error catch ENOTFOUND')
    t.end()
  })
})

test('dependencies unknown package', { timeout:20000 }, function (t) {

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
