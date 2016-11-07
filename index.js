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

var shortcuts = [
  require('./hotkeys/ctrl-cmd-h'),
  require('./hotkeys/cmd-e'),
  require('./hotkeys/ctrl-n'),
  require('./hotkeys/ctrl-cmd-b'),
  require('./hotkeys/ctrl-cmd-d'),
  require('./hotkeys/ctrl-cmd-p')
]

const actionsSubmenu = shortcuts.map(short => ({
  label: short.label,
  accelerator: short.shortcut,
  click: short.handler
}))

const actions = {
  label: 'Actions',
  submenu: actionsSubmenu
}

app.on('ready', () => {
  app.ready = true

  const {Menu, MenuItem} = electron
  const menu = Menu.getApplicationMenu()
  const actionsMenu = new MenuItem(actions)
  menu.insert(menu.items.length - 1, actionsMenu)

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
