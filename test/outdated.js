const fn = require('../outdated')
const test = require('tape')

test('outdated should be false', { timeout:20000 }, function (t) {

  var arr = ['*', '< 1', '> 0.2', '> 0.2 < 1', '^0.5']
  t.plan(arr.length * 4)

  arr.forEach(function(e) {
    fn('is-funcs', e)
    .then(function(data) {
      // console.log(data)
      t.deepEqual(data.name,           'is-funcs')
      t.deepEqual(typeof data.version, 'string')
      t.deepEqual(typeof data.range,   'string')
      t.deepEqual(data.outdated,       false)
    })
    .catch(function(err) {
      for (var i = 0; i < 3; i++) {
        t.deepEqual(err.code, 'ENOTFOUND', 'error catch ENOTFOUND')
      }
    })
  })
})

test('outdated should be true', { timeout:20000 }, function (t) {

  var arr = ['< 0.1', '> 2', '^0.1']
  t.plan(arr.length * 4)

  arr.forEach(function(e) {
    fn('is-funcs', e)
    .then(function(data) {
      t.deepEqual(data.name,           'is-funcs')
      t.deepEqual(typeof data.version, 'string')
      t.deepEqual(typeof data.range,   'string')
      t.deepEqual(data.outdated,       true)
    })
    .catch(function(err) {
      for (var i = 0; i < 3; i++) {
        t.deepEqual(err.code, 'ENOTFOUND', 'error catch ENOTFOUND')
      }
    })
  })
})

test('outdated invalid range', function (t) {

  var arr = [undefined, '', ' ', '1.a', '>= 1.1.7 < 2.0.0 || a.b.c', 'a.b.C']
  t.plan(arr.length)

  arr.forEach(function(e) {
    fn('is-funcs', e)
    .catch(function(err) {
      t.deepEqual(err.message, 'Invalid range')
    })
  })
})

test('outdated unknown package', { timeout:20000 }, function (t) {

  fn('is-unknown-package-name', '*')
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
