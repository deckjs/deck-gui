'use strict';

var path = require('path');
var spawn = require('win-spawn');
var nw = require('nw').findpath();
// var nw = require('@deck/gui-app').findpath();
var app =  path.join(__dirname, 'nw-app');

module.exports = function (url) {
process.stdout.write('url ', url);
process.stdout.write('app ', app);
process.stdout.write('cwd ', path.dirname(require.resolve('@deck/gui-app'));
  var stream = spawn(nw, [
    '.',
    url
  ], {
    cwd: path.dirname(require.resolve('@deck/gui-app')),
    env: process.env,
    //stdio: 'inherit'
  });

  return stream;
};