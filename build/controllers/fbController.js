'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.facebookLogin = exports.facebookSignup = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _Users = require('../models/Users');

var _Users2 = _interopRequireDefault(_Users);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _checkToken = require('../middleware/checkToken');

var _checkToken2 = _interopRequireDefault(_checkToken);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var facebookSignup = exports.facebookSignup = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var _req$body, facebookId, email, firstname, lastname, facebookToken, user, token, loginValue;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, facebookId = _req$body.facebookId, email = _req$body.email, firstname = _req$body.firstname, lastname = _req$body.lastname, facebookToken = _req$body.facebookToken;

            console.log(req.body);
            _context.prev = 2;
            _context.next = 5;
            return _Users2.default.create({
              email: email,
              firstname: firstname,
              lastname: lastname,
              facebookToken: facebookToken,
              facebookId: facebookId,
              userId: _uuid2.default.v4()
            });

          case 5:
            user = _context.sent;
            token = _jsonwebtoken2.default.sign({ userId: user.userId }, _config2.default.SECRET);

            user.password = undefined;

            res.json({ user: user, token: token });
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](2);
            loginValue = _context.t0.errors.phone || _context.t0.errors.email;
            return _context.abrupt('return', res.status(400).json({ message: '' + loginValue }));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 11]]);
  }));

  return function facebookSignup(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var facebookLogin = exports.facebookLogin = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var _req$body2, facebookId, facebookToken, user, token;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, facebookId = _req$body2.facebookId, facebookToken = _req$body2.facebookToken;

            console.log(req.body);
            _context2.prev = 2;
            _context2.next = 5;
            return _Users2.default.findOne({ facebookId: facebookId });

          case 5:
            user = _context2.sent;
            token = _jsonwebtoken2.default.sign({ userId: user.userId }, _config2.default.SECRET);

            user.password = undefined;
            res.json({ user: user, token: token });
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2['catch'](2);

            console.log(_context2.t0);
            return _context2.abrupt('return', res.status(400).json({
              status: 400,
              message: 'user_not_in_db'
            }));

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 11]]);
  }));

  return function facebookLogin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = {
  facebookSignup: facebookSignup,
  facebookLogin: facebookLogin
};