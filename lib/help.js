var BrowserWindow = require('browser-window')
var shortcuts = () => require('../hotkeys').shortcuts

module.exports = () => {
  var win = new BrowserWindow({
    'always-on-top': true,
    toolbar: false,
    center: true,
    width: 400,
    height: 400
  })

  var html = `
    <style>
      body {background: #ddd}
      table {width: 100%; padding: 0}
      tr td {
        color: #eee;
        padding: .25em;
      }
      tr:nth-child(odd) td {
        background: #BBB
      }
      tr:nth-child(even) td {
        background: #888
      }
      .links {
        margin: 0;
        position: absolute;
        bottom: .25em;
        right: .34em;
      }
      h2 {
        margin: 0;
        margin-top: .5em;
      }
    </style>
    <title> Deck Help </title>
    <table cellpadding=0>
      <tr>
        <th>Shortcut</th>
        <th>Description</th>
      </tr>
        ${shortcuts().map(sc => {
          return `
            <tr>
              <td>${sc.shortcut}</td>
              <td><i>${sc.description}</i></td>
            </tr>
          `
        }).join('')}
    </table>
    <p class=links>
      <a href='http://github.com/nearform/deck-app' target='_blank'>
        github repo
      </a>
    </p>
    <h2> Credits </h2>
    <p> Sponsored by <a href='http://nearform.com'> nearForm </a> </p>
    <h3> Contributors </h3>
    <ul><li>David Mark Clements</li><li>Mihai Dima</li><li>Cristian Kiss</li></ul>

  `
  var uri = 'data:text/html;base64,' + Buffer(html).toString('base64')

  win.loadUrl(uri)
}
