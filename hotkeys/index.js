/* global shortcut */
const {app, globalShortcut} = require('electron')
var shortcuts = [
  require('./ctrl-cmd-h'),
  require('./cmd-e'),
  require('./ctrl-n'),
  require('./ctrl-cmd-b'),
  require('./ctrl-cmd-d'),
  require('./ctrl-cmd-p')
]

module.exports = () => {
  app.on('ready', () =>
    shortcuts
      .map(sc => ({
        shortcut: sc,
        success: globalShortcut.register(sc.shortcut, sc.handler)
      }))
      .forEach(result => {
        if (!result.success) {
          console.warn(result.shortcut + ' shortcut did not register')
        }
      })
  )
  app.on('will-exit', globalShortcut.unregisterAll)
}

module.exports.shortcuts = shortcuts
