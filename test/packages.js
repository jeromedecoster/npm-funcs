const fn = require('../packages')
const test = require('tape')

test('packages', { timeout:20000 }, function (t) {

  fn('jeromedecoster')
  .then(function(data) {
    // console.log(data)
    t.deepEqual(data.name, 'jeromedecoster')
    t.deepEqual(Object.keys(data.packages).length == data.count, true)
    t.end()
  })
  .catch(function(err) {
    t.deepEqual(err.code, 'ENOTFOUND', 'error catch ENOTFOUND')
    t.end()
  })
})

test('packages unknown name', { timeout:20000 }, function (t) {

  fn('is-unknown-author-name')
  .catch(function(err) {
    if (err.message == 'Invalid author name') {
      t.deepEqual(err.message, 'Invalid author name', 'Invalid author name catched')
      t.end()
    } else {
      t.deepEqual(err.code, 'ENOTFOUND', 'error catch ENOTFOUND')
      t.end()
    }
  })
})
