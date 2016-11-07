const {BrowserWindow} = require('electron')

module.exports = {
  shortcut: 'ctrl + cmd + d',
  handler: toggle,
  description: `
    toggle devtools for a focused window
  `,
  label: 'Toogle devtools'
}

function toggle () {
  (toggle.last = BrowserWindow.getFocusedWindow() || toggle.last)
    .toggleDevTools()
}
