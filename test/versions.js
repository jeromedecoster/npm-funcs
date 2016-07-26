const fn = require('../versions')
const test = require('tape')

test('versions', { timeout:10000 }, function (t) {

  fn('is-funcs')
  .then(function(data) {
    // console.log(data)
    t.deepEqual(data.name,                  'is-funcs')
    t.deepEqual(typeof data.latest.version, 'string')
    t.deepEqual(typeof data.latest.date,    'string')
    t.deepEqual(data.count > 5,     true)
    t.deepEqual(data.versions['0.0.0'], '2016-05-27')
    t.deepEqual(Object.keys(data.versions).length > 1, true)
    t.end()
  })
  .catch(function(err) {
    t.deepEqual(err.code, 'ENOTFOUND', 'error catch ENOTFOUND')
    t.end()
  })
})

test('versions latest true', { timeout:10000 }, function (t) {

  fn('is-funcs', true)
  .then(function(data) {
    // console.log(data)
    t.deepEqual(data.name,           'is-funcs')
    t.deepEqual(typeof data.version, 'string')
    t.deepEqual(typeof data.date,    'string')
    t.deepEqual(data.count > 5,      true)
    t.deepEqual(data.versions == undefined, true)
    t.end()
  })
  .catch(function(err) {
    t.deepEqual(err.code, 'ENOTFOUND', 'error catch ENOTFOUND')
    t.end()
  })
})

test('versions unknown package', { timeout:10000 }, function (t) {

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
