'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = exports.updateUser = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Users = require('../models/Users');

var _Users2 = _interopRequireDefault(_Users);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _utils = require('../utils');

var _mongoose = require('mongoose');

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateUser = exports.updateUser = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var userId, _req$body, email, phone, firstname, lastname, countryCode, aboutme, autoId, picture, autoPhoto, user, token;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = req.user;
            _req$body = req.body, email = _req$body.email, phone = _req$body.phone, firstname = _req$body.firstname, lastname = _req$body.lastname, countryCode = _req$body.countryCode, aboutme = _req$body.aboutme, autoId = _req$body.autoId, picture = _req$body.picture, autoPhoto = _req$body.autoPhoto;
            _context.prev = 2;
            _context.next = 5;
            return _Users2.default.findOneAndUpdate({ userId: userId }, (0, _utils.sanitizedObject)({
              email: email,
              phone: phone,
              firstname: firstname,
              lastname: lastname,
              countryCode: countryCode,
              aboutme: aboutme,
              autoId: autoId,
              picture: picture,
              autoPhoto: autoPhoto
            }), { runValidators: true, context: 'query' });

          case 5:
            user = _context.sent;
            token = _jsonwebtoken2.default.sign({ userId: userId }, _config2.default.SECRET);

            res.json({ user: user, token: token });
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](2);

            console.log(_context.t0);
            return _context.abrupt('return', res.json({ status: 400, message: _context.t0.message || 'not found' }));

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 10]]);
  }));

  return function updateUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var uploadFile = exports.uploadFile = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var uploadType, random, carphoto, _carphoto$mimetype$sp, _carphoto$mimetype$sp2, _, ext, user, profilePhoto, _profilePhoto$mimetyp, _profilePhoto$mimetyp2, _2, _ext, _user;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            uploadType = req.body.uploadType;
            random = String(Math.random()).substr(2);

            if (!req.files.carphoto) {
              _context2.next = 19;
              break;
            }

            carphoto = req.files.carphoto;
            _carphoto$mimetype$sp = carphoto.mimetype.split('/'), _carphoto$mimetype$sp2 = (0, _slicedToArray3.default)(_carphoto$mimetype$sp, 2), _ = _carphoto$mimetype$sp2[0], ext = _carphoto$mimetype$sp2[1];


            (0, _sharp2.default)(carphoto.data).resize(800).toFile(_path2.default.resolve('./files/users/myauto/' + req.user + '_myauto_' + random + '.' + ext));

            (0, _sharp2.default)(carphoto.data).resize(180, 180).toFile(_path2.default.resolve('./files/users/myauto/thumbs/' + req.user + '_myauto_' + random + '.' + ext));

            _context2.prev = 7;
            _context2.next = 10;
            return _Users2.default.findOneAndUpdate({ userId: req.user }, { autoPhoto: req.user + '_myauto_' + random + '.' + ext });

          case 10:
            user = _context2.sent;

            res.json({
              status: 200,
              photo: req.user + '_myauto_' + random + '.' + ext
            });

            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2['catch'](7);


            res.json({
              status: 500,
              message: 'upload_photo_error'
            });

          case 17:
            _context2.next = 36;
            break;

          case 19:
            if (!req.files.profilePhoto) {
              _context2.next = 35;
              break;
            }

            profilePhoto = req.files.profilePhoto;
            _profilePhoto$mimetyp = profilePhoto.mimetype.split('/'), _profilePhoto$mimetyp2 = (0, _slicedToArray3.default)(_profilePhoto$mimetyp, 2), _2 = _profilePhoto$mimetyp2[0], _ext = _profilePhoto$mimetyp2[1];


            (0, _sharp2.default)(profilePhoto.data).toFile(_path2.default.resolve('./files/users/profile/' + req.user + '_profile_' + random + '.' + _ext));

            _context2.prev = 23;
            _context2.next = 26;
            return _Users2.default.findOneAndUpdate({ userId: req.user }, { picture: req.user + '_profile_' + random + '.' + _ext });

          case 26:
            _user = _context2.sent;

            res.json({
              status: 200,
              photo: req.user + '_profile_' + random + '.' + _ext
            });

            _context2.next = 33;
            break;

          case 30:
            _context2.prev = 30;
            _context2.t1 = _context2['catch'](23);


            res.json({
              status: 500,
              message: 'upload_photo_error'
            });

          case 33:
            _context2.next = 36;
            break;

          case 35:

            res.json({ status: 500, message: 'no_photo' }).end();

          case 36:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[7, 14], [23, 30]]);
  }));

  return function uploadFile(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = {
  updateUser: updateUser
};