const fn = require('../dependencies')
const test = require('tape')

test('dependencies', { timeout:10000 }, function (t) {

  fn('object-funcs')
  .then(function(data) {
    // console.log(data)
    t.deepEqual(data.name,                                   'object-funcs')
    t.deepEqual(typeof data.latest.version,                  'string')
    t.deepEqual(typeof data.latest.dependencies['is-funcs'], 'string')
    t.deepEqual(data.versions['0.0.0'], {})
    t.deepEqual(Object.keys(data.versions).length > 1, true)
    t.end()
  })
  .catch(function(err) {
    t.deepEqual(err.code, 'ENOTFOUND', 'error catch ENOTFOUND')
    t.end()
  })
})

test('dependencies latest true', { timeout:10000 }, function (t) {

  fn('object-funcs', true)
  .then(function(data) {
    // console.log(data)
    t.deepEqual(data.name,                            'object-funcs')
    t.deepEqual(typeof data.version,                  'string')
    t.deepEqual(typeof data.dependencies['is-funcs'], 'string')
    t.deepEqual(data.versions == undefined, true, 'data.versions')
    t.end()
  })
  .catch(function(err) {
    t.deepEqual(err.code, 'ENOTFOUND', 'error catch ENOTFOUND')
    t.end()
  })
})

test('dependencies unknown package', { timeout:10000 }, function (t) {

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
