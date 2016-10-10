'use strict'

const electron = require('electron')
const { BrowserWindow, app } = electron
require('./hotkeys')()
var configs = [
  {
    toolbar: false,
    center: true,
    width: 480,
    height: 342
  },
  {
    toolbar: false,
    fullscreen: true
  }
]

app.commandLine.appendSwitch('enable-usermedia-screen-capturing')

app.on('ready', () => {
  app.ready = true

  app.windows = electron.screen.getAllDisplays().slice(0, 2)
    .map((display, ix) => {
      var win = new BrowserWindow(Object.assign({}, display.bounds, configs[ix]))
      return win
    })

  app.windows.forEach(win => {
    win.loadURL('file://' + __dirname + '/loading.html')
    win.on('close', process.exit)
  })

  console.log('\n\nhelp: cmd + ctrl + h\n')
})

module.exports = function open (url) {
  if (!app.ready) return app.on('ready', () => open(url))
  app.windows.forEach(win => win.loadURL(url))
}
