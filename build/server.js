'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _toobusyJs = require('toobusy-js');

var _toobusyJs2 = _interopRequireDefault(_toobusyJs);

var _expressFileupload = require('express-fileupload');

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _email = require('./utils/email');

var _email2 = _interopRequireDefault(_email);

var _metrix = require('./metrix');

var _metrix2 = _interopRequireDefault(_metrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numCPUs = require('os').cpus().length;
// Avto


// import Verification from 'utils/verification';
// global.Verification = Verification;

var app = (0, _express2.default)();

app.use(function (req, res, next) {
  if ((0, _toobusyJs2.default)()) {
    res.send(503, "I'm busy right now, sorry.");
  } else {
    next();
  }
});

app.use('/files', _express2.default.static(_path2.default.resolve('./files')));
app.use((0, _expressFileupload2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use('/', _routes2.default);

process.on('SIGINT', function () {
  server.close();
  _toobusyJs2.default.shutdown();
  process.exit();
});

_mongoose2.default.Promise = _bluebird2.default;
_mongoose2.default.connect(_config2.default.DATABASE, { useMongoClient: true }).then(function (data) {
  if (data) console.log('\x1b[32m%s\x1b[32m', '⚡️  MongoDB is connected');
}).catch(function (e) {
  return console.log('\x1b[31m%s\x1b[31m', e.message);
});

_metrix2.default.init();
_email2.default.init();

if (_cluster2.default.isMaster) {
  console.log('Master ' + process.pid + ' is running');

  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    _cluster2.default.fork();
  }

  //Check if work id is died
  _cluster2.default.on('exit', function (worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  console.log('Worker ' + process.pid + ' started');

  app.get('/cluster', function (req, res) {
    var worker = _cluster2.default.worker.id;
    res.send('Running on worker with id ==> ' + worker);
  });

  _http2.default.createServer(app).listen(_config2.default.PORT, function () {
    console.log('Server is running at ' + _config2.default.PORT);
  });
}