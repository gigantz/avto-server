'use strict';

var cp = require('child_process');
var path = require('path');
var nodemon = require('nodemon');
var pm2 = require('pm2');

function spawn(name, colorcode, script, args) {
  var log = function log(content) {
    process.stdout.write(colorcode + name + '> \x1b[0m' + content.toString().replace(/\n$/, '').split('\n').join('\n' + ' '.repeat(name.length + 2)) + '\n');
  };
  log('Starting process\n');
  log(script + ' ' + args.join(' ') + '\n');
  var child = cp.spawn(script, args, {});
  child.stdout.on('data', function (data) {
    log(data);
  });
  child.stderr.on('data', function (data) {
    log(data);
  });
  child.on('close', function (code) {
    log('Closed with code ' + code + '\n');
  });
  process.on('exit', function () {
    log('Quitting process\n');
    child.kill('SIGTERM');
  });
  process.stdin.on('data', function (data) {
    child.stdin.write(data);
  });
}

if (process.env.NODE_ENV === 'production') {
  spawn('Production Server   ', '\x1b[35m', 'pm2', ['start', 'build/server.js', '-i', 'max']);
} else {
  spawn('Dev Server   ', '\x1b[35m', './node_modules/.bin/nodemon', ['./build/server.js']);
  // spawn('Dev WSServer   ', '\x1b[35m', './node_modules/.bin/node', ['start', 'server.js', '-i', '0']);
  // nodemon server.js --exec babel-node --presets es2015,stage-2
}