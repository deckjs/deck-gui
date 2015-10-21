var exec = require('child_process').execSync || require('exec-sync')
var editor = require('editor')
var fs = require('fs')
var path = require('path')

module.exports = () => {
  var ed = exec('npm get editor') + ''
 
  var f = path.join(process.cwd(), 'deck.md')

  if (!fs.existsSync(f)) {
    return console.error('Cannot find deck at', f)
  }

  editor(f, {
    editor: ed || process.env.EDITOR
  })
}
