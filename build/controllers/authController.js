'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailExists = exports.login = exports.signUp = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _metrix = require('../metrix');

var _metrix2 = _interopRequireDefault(_metrix);

var _email = require('../utils/email');

var _email2 = _interopRequireDefault(_email);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signUp = exports.signUp = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var _user, token, loginValue;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Users2.default.create((0, _extends3.default)({}, req.body, { userId: _uuid2.default.v4() }));

          case 3:
            _user = _context.sent;
            token = _jsonwebtoken2.default.sign({ userId: _user.userId }, _config2.default.SECRET);

            _user.password = undefined;

            if (_user.email) {
              console.log('mailing...');
              _email2.default.sendMail({
                from: '"AvtoBirlik" <orkhan@zemhome.com>',
                to: _user.email,
                subject: 'Xoş gəldin',
                text: 'Bizə qatıldığın üçün təşəkkür edirik!',
                html: '\n          <h1>\u018Fziz ' + _user.firstname + '</h1>\n          <p>Biz\u0259 qat\u0131ld\u0131\u011F\u0131n \xFC\xE7\xFCn t\u0259\u015F\u0259kk\xFCr edirik!</p>\n        '
              });
            }

            res.json({ user: _user, token: token });
            _context.next = 16;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);
            loginValue = _context.t0.errors && (_context.t0.errors.phone || _context.t0.errors.email);

            if (!(loginValue && loginValue.value)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt('return', res.status(400).json({ message: '' + loginValue.value }));

          case 15:
            return _context.abrupt('return', res.status(400).json({ message: '' + _context.t0.message }));

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 10]]);
  }));

  return function signUp(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var login = exports.login = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var password, user, result, token;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            password = req.body.password;

            user;
            user = void 0, result = void 0;
            _context2.prev = 3;
            _context2.next = 6;
            return _Users2.default.findOne({ phone: req.body.phone || undefined, email: req.body.email || undefined });

          case 6:
            user = _context2.sent;
            _context2.next = 14;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](3);

            console.log(_context2.t0.message);

            _metrix2.default.dispatch('WRONG_LOGIN_DEFAULT', 'guest', { email: req.body.email, phone: req.body.phone, password: password });
            return _context2.abrupt('return', res.json({
              status: 400,
              message: 'wrong_email_password'
            }));

          case 14:
            _context2.prev = 14;
            _context2.next = 17;
            return user.comparePasswords(password);

          case 17:
            result = _context2.sent;
            _context2.next = 25;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t1 = _context2['catch'](14);

            _metrix2.default.dispatch('WRONG_LOGIN_DEFAULT', 'guest', { email: req.body.email, phone: req.body.phone, password: password });

            if (req.body.email) {
              _email2.default.sendMail({
                from: '"AvtoBirlik" <orkhan@zemhome.com>',
                to: req.body.email,
                subject: 'Reset password',
                text: 'Reset your password avtobirlik://forget/json',
                html: '\n          <h1>Reset your password</h1>\n          <p>Click to <a href="avtobirlik://forget/json">New password</a></p>\n        '
              });
            }

            return _context2.abrupt('return', res.status(400).json({
              status: 400,
              message: 'wrong_email_password'
            }));

          case 25:
            token = _jsonwebtoken2.default.sign({ userId: user.userId }, _config2.default.SECRET);

            user.password = undefined;

            _metrix2.default.dispatch('LOGIN_DEFAULT', user.userId, { email: user.email });

            res.json({ user: user, token: token });

          case 29:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 9], [14, 20]]);
  }));

  return function login(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var emailExists = exports.emailExists = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var email;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            email = req.body.email;
            _context3.prev = 1;

            if (email) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt('return', false);

          case 4:
            _context3.next = 6;
            return _Users2.default.findOne({ email: email });

          case 6:
            user = _context3.sent;


            res.json({
              status: 200,
              message: 'mail_sent'
            });

            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3['catch'](1);

            console.log(_context3.t0);

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 10]]);
  }));

  return function emailExists(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = {
  signUp: signUp,
  login: login,
  emailExists: emailExists
};