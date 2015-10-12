'use strict'

var path = require('path')
var spawn = require('win-spawn')
var nw = require('nw').findpath()

module.exports = function (url) {
  var stream = spawn(nw, [
    '.',
    url
  ], {
    cwd: path.dirname(require.resolve('@deck/gui-app')),
    env: process.env
  })

  return stream
}
