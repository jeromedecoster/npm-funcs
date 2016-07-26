const fn = require('../downloads')
const test = require('tape')

test('downloads', { timeout:10000 }, function (t) {

  fn('is-funcs')
  .then(function(data) {
    // console.log(data)
    t.deepEqual(data.name,      'is-funcs')
    t.deepEqual(data.total > 5, true)
    t.deepEqual(data.downloads['2016-05-27'], 31)
    t.deepEqual(Object.keys(data.downloads).length > 20, true)
    t.end()
  })
  .catch(function(err) {
    t.deepEqual(err.code, 'ENOTFOUND', 'error catch ENOTFOUND')
    t.end()
  })
})

test('downloads latest true', { timeout:10000 }, function (t) {

  fn('is-funcs', true)
  .then(function(data) {
    // console.log(data)
    t.deepEqual(data.name,             'is-funcs')
    t.deepEqual(typeof data.date,      'string')
    t.deepEqual(typeof data.downloads, 'number')
    t.deepEqual(data.downloads >= 1,   true)
    t.deepEqual(data.total > 5, true)
    t.end()
  })
  .catch(function(err) {
    t.deepEqual(err.code, 'ENOTFOUND', 'error catch ENOTFOUND')
    t.end()
  })
})

test('downloads unknown package', { timeout:10000 }, function (t) {

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
