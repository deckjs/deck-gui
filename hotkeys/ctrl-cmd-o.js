var app = require('app')
var fs = require('fs')
var powerpoint = require('../lib/powerpoint')

module.exports = {
  shortcut: 'cmd + ctrl + o',
  handler: powerpoint,
  description: `
    create a powerpoint presentation
  `
}
