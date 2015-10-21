'use strict'

var app = require('app')
var BrowserWindow = require('browser-window')
var scr = () => require('screen')
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

app.on('ready', () => {
  app.ready = true
  app.windows = scr().getAllDisplays().slice(0, 2)
    .map((display, ix) => {
      var win = new BrowserWindow(Object.assign({}, display.bounds, configs[ix]))
      return win
    })
  app.windows.forEach(win => {
    win.loadUrl('file://' + __dirname + '/loading.html')
    win.on('close', process.exit)
  })
})

module.exports = function open (url) {
  if (!app.ready) return app.on('ready', () => open(url))
  app.windows.forEach(win => win.loadUrl(url))
}
