const cp = require('child_process');
const path = require('path');
const nodemon = require('nodemon');
const pm2 = require('pm2');

function spawn(name, colorcode, script, args) {
  const log = (content) => {
    process.stdout.write(colorcode + name + '> \x1b[0m' + content.toString().replace(/\n$/,'').split('\n').join('\n' + ' '.repeat(name.length+2)) + '\n');
  };
  log('Starting process\n');
  log(script + ' ' + args.join(' ') + '\n');
  const child = cp.spawn(script, args, {
  });
  child.stdout.on('data', function(data) {
    log(data);
  });
  child.stderr.on('data', function(data) {
    log(data);
  });
  child.on('close', function(code) {
    log('Closed with code ' + code + '\n');
  });
  process.on('exit', () => {
    log('Quitting process\n');
    child.kill('SIGTERM');
  });
  process.stdin.on('data', function(data) {
    child.stdin.write(data);
  });
}

if(process.env.NODE_ENV === 'production') {
  spawn('Production Server   ', '\x1b[35m', 'pm2', ['start', 'build/server.js', '-i', 'max']);
} else {
  spawn('Dev Server   ', '\x1b[35m', './node_modules/.bin/nodemon', ['./server.js']);
  // spawn('Dev WSServer   ', '\x1b[35m', './node_modules/.bin/node', ['start', 'server.js', '-i', '0']);
  // nodemon server.js --exec babel-node --presets es2015,stage-2
}