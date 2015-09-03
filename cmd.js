#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));
argv._[0] = argv._[0] || 'http://0.0.0.0:2000';
require('./index.js')(argv._[0]);

