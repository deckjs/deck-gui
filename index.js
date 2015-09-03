'use strict';

var path = require('path');
var spawn = require('win-spawn');
var nw = require('nw').findpath();
var app =  path.join(__dirname, 'nw-app');

module.exports = function (url) {

  var stream = spawn(nw, [
    '.',
    url
  ], {
    cwd: path.resolve(__dirname, 'nwapp'),
    env: process.env,
    //stdio: 'inherit'
  });

  return stream;
};