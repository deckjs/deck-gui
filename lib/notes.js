var app = require('app')
var BrowserWindow = require('browser-window')
var scr = () => require('screen')

module.exports = () => {
  var win = app.windows[0]
  var url = win.getUrl()
  if (/^http/.test(url)) { 
   return toggle(url)
  }
  win.on('page-title-updated', () => {
    url = win.getUrl()
    toggle(url)
  })
}

function toggle (url) {

  if (toggle.open) {
    toggle.win.close()
    toggle.open = false
  }

  var display = scr().getPrimaryDisplay()

  toggle.win = new BrowserWindow({
    'always-on-top': true,
    toolbar: false,
    frame: false,
    width: 612,
    height: 272,
    x: display.bounds.width - 612,
    y: 22
  })

  toggle.win.loadUrl(url + '?notes')

  toggle.open = true
}
