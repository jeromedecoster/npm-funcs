const fn = require('../is-outdated')
const test = require('tape')

test('is-outdated', function (t) {

  t.deepEqual(fn('0.5.1', '^0.2'),           true)
  t.deepEqual(fn('0.5.1', '^0.6'),           true)
  t.deepEqual(fn('0.5.1', '^0.5.2'),         true)
  t.deepEqual(fn('0.5.1', '^0.2 || ^0.6'),   true)
  t.deepEqual(fn('0.5.1', '<0.3.0'),         true)
  t.deepEqual(fn('0.5.1', '>=0.2.0 <0.3.0'), true)

  t.deepEqual(fn('0.5.1', '*'),            false)
  t.deepEqual(fn('0.5.1', '^0.2 || *'),    false)
  t.deepEqual(fn('0.5.1', '>0.1'),         false)
  t.deepEqual(fn('0.5.1', '^0.2 || >0.1'), false)
  t.deepEqual(fn('0.5.1', '^0.5'),         false)
  t.deepEqual(fn('0.5.1', '^0.5.1'),       false)
  t.deepEqual(fn('0.5.1', '>=0.2.0'),      false)
  t.deepEqual(fn('0.5.1', '>0.2 <1'),      false)
  t.deepEqual(fn('0.5.1', '0.5.x'),        false)
  t.deepEqual(fn('0.5.1', '0.5.*'),        false)
  t.deepEqual(fn('0.5.1', '0.5'),          false)
  t.deepEqual(fn('0.5.1', '~0.5'),         false)
  t.deepEqual(fn('0.5.1', '^0.5'),         false)
  t.deepEqual(fn('0.5.1', '>=0.2.0 || <0.3.0'), false)
  t.end()
})

test('is-outdated bad argument', function (t) {

  t.deepEqual(fn(),            undefined)
  t.deepEqual(fn('0.5.1'),     undefined)
  t.deepEqual(fn('0.5.1', ''), undefined)
  t.deepEqual(fn('0.5.1', '^0.2 || ~*'),   undefined)
  t.deepEqual(fn('a.b.c', '^0.2 || ^0.6'), undefined)
  t.end()
})
