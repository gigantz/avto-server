'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mongoose = require('mongoose').Mongoose;

// Avto

var mongoose = new Mongoose();

var Metrix = function () {
  function Metrix() {
    var _this = this;

    (0, _classCallCheck3.default)(this, Metrix);

    this.dispatch = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
        var userId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'NOT LOGGED';
        var body = arguments[2];
        var message;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this.db.collection('metrix').insert({
                  event: event,
                  userId: userId,
                  body: body,
                  date: Date()
                });

              case 3:
                _context.next = 10;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context['catch'](0);
                message = _context.t0.message;
                _context.next = 10;
                return _this.db.collection('logs').insert({
                  message: message,
                  event: event,
                  date: Date()
                });

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[0, 5]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    this.getList = function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(userId) {
        var list;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (userId) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', false);

              case 2:
                _context2.prev = 2;
                _context2.next = 5;
                return _this.db.collection('metrix').find({ userId: userId }).limit(30);

              case 5:
                list = _context2.sent;
                return _context2.abrupt('return', list);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](2);

                console.log('can\'t get user activity list', _context2.t0);

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this, [[2, 9]]);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }();
  }

  (0, _createClass3.default)(Metrix, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      mongoose.connect(_config2.default.METRIX_DATABASE, { useMongoClient: true }).then(function (data) {
        if (data) console.log('\x1b[32m%s\x1b[32m', '⚡️  Metrix DB is connected');
        _this2.db = mongoose.connection;

        _this2.db.collection('system').insert({ message: 'Metrix get started at ' + Date() });
      }).catch(function (e) {
        console.log('\x1b[31m%s\x1b[31m', e);
      });
    }
  }]);
  return Metrix;
}();

exports.default = new Metrix();