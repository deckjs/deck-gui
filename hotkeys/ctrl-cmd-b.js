var broadcast = require('../lib/broadcast')

module.exports = {
  shortcut: 'ctrl + cmd + b',
  handler: broadcast,
  description: `
    broadcast screen into presentation
  `,
  label: 'Broadcast screen'
}
