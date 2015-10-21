var broadcast = require('../lib/broadcast')

module.exports = {
  shortcut: 'cmd + b',
  handler: broadcast,
  description: `
    broadcast screen into presentation
  `
}