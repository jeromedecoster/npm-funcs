const validRange = require('semver').validRange

const spaces = /\s*/g
// operator then '*' or 'x'
const reg1 = /[<>~^][*x]/gi
// starts or ends with '||'
const reg2 = /(^\|\||\|\|$)/g
// '*.*' '*.x' '*.1' etc...
const reg3 = /(?:^|[^\.])[*x]\.[*x\d]/gi

module.exports = function(range) {
  if (typeof range != 'string') return false
  var str = range.replace(spaces, '')
  if (str.length == 0) return false
  if (str.match(reg1)) return false
  if (str.match(reg2)) return false
  if (str.match(reg3)) return false

  return validRange(range) != null
}
