'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.likeSubject = exports.deleteSubject = exports.updateSubject = exports.addSubject = undefined;

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

var _Subject = require('../models/Subject');

var _Subject2 = _interopRequireDefault(_Subject);

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

var addSubject = exports.addSubject = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var _req$body, title, body, categoryId, user, author, subject;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, body = _req$body.body, categoryId = _req$body.categoryId, user = req.user;
            _context.prev = 1;
            _context.next = 4;
            return _Users2.default.findOne({ userId: user });

          case 4:
            author = _context.sent;
            _context.prev = 5;
            _context.next = 8;
            return _Subject2.default.create({
              subjectId: _uuid2.default.v4(),
              author: author._id,
              authorId: author.userId,
              categoryId: categoryId,
              title: title,
              body: body
            });

          case 8:
            subject = _context.sent;
            return _context.abrupt('return', res.json(subject));

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](5);

            console.log(_context.t0);
            return _context.abrupt('return', res.json({
              status: 500,
              message: _context.t0.message
            }));

          case 16:
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t1 = _context['catch'](1);
            return _context.abrupt('return', res.json({
              status: 500,
              message: 'user_not_found'
            }));

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 18], [5, 12]]);
  }));

  return function addSubject(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var updateSubject = exports.updateSubject = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var _req$body2, subjectId, title, body, categoryId, authorId, subject;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, subjectId = _req$body2.subjectId, title = _req$body2.title, body = _req$body2.body, categoryId = _req$body2.categoryId, authorId = req.user;
            _context2.prev = 1;
            _context2.next = 4;
            return _Subject2.default.findOneAndUpdate({ authorId: authorId, subjectId: subjectId }, (0, _utils.sanitizedObject)({
              categoryId: categoryId,
              title: title,
              body: body
            }), {
              new: true
            });

          case 4:
            subject = _context2.sent;

            if (!subject) {
              _context2.next = 9;
              break;
            }

            res.json(subject);
            _context2.next = 10;
            break;

          case 9:
            throw new Error(subjectId + ' is not found');

          case 10:
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2['catch'](1);
            return _context2.abrupt('return', res.json({
              status: 500,
              message: 'subject_not_found'
            }));

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 12]]);
  }));

  return function updateSubject(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteSubject = exports.deleteSubject = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var subjectId, authorId, subject, message;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            subjectId = req.body.subjectId, authorId = req.user;
            _context3.prev = 1;
            _context3.next = 4;
            return _Subject2.default.findOneAndRemove({ authorId: authorId, subjectId: subjectId });

          case 4:
            subject = _context3.sent;


            if (subject) {
              res.json({
                message: 'subject_removed_successfully'
              });
            } else {
              res.json({
                message: 'subject_already_removed'
              });
            }
            _context3.next = 12;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](1);
            message = _context3.t0.message;

            res.json({
              status: 500,
              message: message
            });

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 8]]);
  }));

  return function deleteSubject(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var likeSubject = exports.likeSubject = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var subjectId, userId, subject, message;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            subjectId = req.body.subjectId, userId = req.user;
            _context4.prev = 1;
            _context4.next = 4;
            return _Subject2.default.findOneAndUpdate({ subjectId: subjectId,
              subscribers: {
                $not: {
                  $elemMatch: { userId: userId }
                }
              }
            }, {
              $inc: { likes: 1 },
              $addToSet: { subscribers: { userId: userId } }
            }, { new: true });

          case 4:
            subject = _context4.sent;

            if (!subject) {
              _context4.next = 9;
              break;
            }

            res.json(subject);
            _context4.next = 13;
            break;

          case 9:
            _context4.next = 11;
            return _Subject2.default.findOneAndUpdate({ subjectId: subjectId,
              subscribers: {
                $elemMatch: { userId: userId }
              }
            }, {
              $inc: { likes: -1 },
              $pull: { subscribers: { userId: userId } }
            }, { new: true });

          case 11:
            subject = _context4.sent;


            res.json(subject);

          case 13:
            _context4.next = 19;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4['catch'](1);
            message = _context4.t0.message;

            res.json({
              status: 500,
              message: message
            });

          case 19:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[1, 15]]);
  }));

  return function likeSubject(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

exports.default = {
  addSubject: addSubject,
  updateSubject: updateSubject,
  deleteSubject: deleteSubject,
  likeSubject: likeSubject
};