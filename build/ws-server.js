'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Users = require('./models/Users');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({ port: _config2.default.WS });
var clients = {};

_mongoose2.default.Promise = _bluebird2.default;
_mongoose2.default.connect(_config2.default.DATABASE, function (err) {
  if (!err) {
    console.log('\x1b[32m%s\x1b[32m', '=> MongoDB is connected');
  } else {
    console.log('\x1b[31m%s\x1b[31m', '[!] MongoDB server is dead');
  }
});

function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', function connection(ws) {
  ws.on('message', function (msg) {
    incoming(msg, ws);
  });
});

var interval = setInterval((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var clientId, _clientId, logs;

  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = _regenerator2.default.keys(clients);

        case 1:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 15;
            break;
          }

          clientId = _context.t1.value;

          if (!(clients[clientId] === undefined)) {
            _context.next = 6;
            break;
          }

          delete clients[clientId];
          return _context.abrupt('return', false);

        case 6:
          if (!(clients[clientId] && !clients[clientId].isAlive)) {
            _context.next = 10;
            break;
          }

          clients[clientId].terminate();
          delete clients[clientId];
          return _context.abrupt('return', false);

        case 10:
          ;

          clients[clientId].isAlive = false;
          clients[clientId].ping('', false, true);
          _context.next = 1;
          break;

        case 15:

          console.log('------------------------------------');
          console.log('Online: ' + (0, _keys2.default)(clients).length);
          console.log('------------------------------------');

          _context.t2 = _regenerator2.default.keys(clients);

        case 19:
          if ((_context.t3 = _context.t2()).done) {
            _context.next = 29;
            break;
          }

          _clientId = _context.t3.value;

          if (!(_clientId.indexOf('guest') > -1)) {
            _context.next = 23;
            break;
          }

          return _context.abrupt('return', false);

        case 23:
          _context.next = 25;
          return getLogs(_clientId);

        case 25:
          logs = _context.sent;

          if (logs) clients[_clientId].send(logs);
          _context.next = 19;
          break;

        case 29:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})), _config2.default.WS_INVERVAL);

var CONNECT_ME = "CONNECT_ME";
var DISCONNECT_ME = "DISCONNECT_ME";

var incoming = function incoming(actionJSON, ws) {
  console.log(actionJSON);
  var action = JSON.parse(actionJSON);
  switch (action.type) {
    case CONNECT_ME:
      // console.log(`${action.payload._id} connected`);
      ws.isAlive = true;
      ws.on('pong', heartbeat);
      clients[action.payload.userId] = ws;
      userOnline(action.payload.userId, true, ws);
      break;

    case DISCONNECT_ME:
      // console.log(`${action.payload._id} disconnected`);
      clients[action.payload.userId] = undefined;
      userOnline(action.payload.userId, false, ws);
      break;

    default:
      break;
  }
};

var getLogs = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(userId) {
    var user;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Users2.default.findOne({ userId: userId }, { logs: 1 });

          case 3:
            user = _context2.sent;

            if (!user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt('return', (0, _stringify2.default)({
              type: "WS_LOGS",
              payload: user.logs
            }));

          case 6:
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', false);

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 8]]);
  }));

  return function getLogs(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var userOnline = function userOnline(userId, online, ws) {
  _Users2.default.findOneAndUpdate({ userId: userId }, { online: online }).then(function (res, error) {
    if (res) {
      ws.send((0, _stringify2.default)({
        type: "WS_USER_UPDATES",
        payload: online,
        meta: { prop: 'online' }
      }));
    }
  }).catch(function () {});
};

var usersOnline = function usersOnline(ws) {
  var clientsArray = (0, _keys2.default)(clients);
  _Users2.default.find({ userId: clientsArray }, { userId: 1, firstname: 1, lastname: 1 }).then(function (res, error) {
    if (res) {
      ws.send((0, _stringify2.default)({
        type: "WS_REALTIME",
        payload: res,
        meta: { prop: 'peopleOnline' }
      }));
    }
  }).catch(function () {});
};

var invervalOnlineUsers = setInterval(function () {
  for (var clientId in clients) {
    if (clientId.indexOf('guest') > -1) {
      return false;
    }
    usersOnline(clients[clientId]);
  }
}, 1000);