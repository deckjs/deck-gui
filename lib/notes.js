const electron = require('electron')
const {BrowserWindow, app} = electron

module.exports = () => {
  var win = app.windows[0]
  var url = win.getURL()
  if (/^http/.test(url)) {
    return toggle(url)
  }
  win.on('page-title-updated', () => {
    url = win.getURL()
    toggle(url)
  })
}

function toggle (url) {
  if (toggle.open) {
    toggle.win.close()
    toggle.open = false
    return
  }

  var display = electron.screen.getPrimaryDisplay()

  toggle.win = new BrowserWindow({
    'always-on-top': true,
    toolbar: false,
    frame: false,
    width: 612,
    height: 272,
    x: display.bounds.width - 612,
    y: 22
  })

  toggle.win.loadURL(url + '?notes')

  toggle.open = true
}
