/* global shortcut */
var app = require('app')
var gs = require('global-shortcut')
var shortcuts = [
  require('./ctrl-cmd-h'),
  require('./cmd-e'),
  require('./ctrl-n'),
  require('./cmd-b'),
  require('./ctrl-cmd-d'),
  require('./ctrl-cmd-p')
]

module.exports = () => {
  app.on('ready', () =>
    shortcuts
      .map(sc => ({
        shortcut: sc,
        success: gs.register(sc.shortcut, sc.handler)
      }))
      .forEach(result => {
        if (!result.success) {
          console.warn(shortcut + ' shortcut did not register')
        }
      })
  )
  app.on('will-exit', gs.unregisterAll)
}

module.exports.shortcuts = shortcuts
