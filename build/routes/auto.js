'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _metrix = require('../metrix');

var _metrix2 = _interopRequireDefault(_metrix);

var _checkToken = require('../middleware/checkToken');

var _checkToken2 = _interopRequireDefault(_checkToken);

var _Users = require('../models/Users');

var _Users2 = _interopRequireDefault(_Users);

var _Auto = require('../models/Auto');

var _Auto2 = _interopRequireDefault(_Auto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/marks', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var model, message;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Auto2.default.aggregate([{ $match: { make_id: { $ne: null } } }, { $sort: { make_id: -1 } }, { $group: { _id: '$make_id', label: { $first: '$make' } } }]);

          case 3:
            model = _context.sent;

            res.json(model);
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            message = _context.t0.message;
            return _context.abrupt('return', next({
              status: 500,
              message: message
            }));

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

router.get('/models/:markId', function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var model, message;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Auto2.default.aggregate([{ $match: { make_id: +req.params.markId } }, { $group: { _id: '$model_id', label: { $first: '$model' } } }]);

          case 3:
            model = _context2.sent;

            res.json(model);
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);
            message = _context2.t0.message;
            return _context2.abrupt('return', next({
              status: 500,
              message: message
            }));

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

router.get('/years/:modelId', function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var model, message;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _Auto2.default.aggregate([{ $match: { model_id: +req.params.modelId } }, { $group: { _id: '$year', label: { $first: '$year' } } }]);

          case 3:
            model = _context3.sent;

            res.json(model);
            _context3.next = 11;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](0);
            message = _context3.t0.message;
            return _context3.abrupt('return', next({
              status: 500,
              message: message
            }));

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}());

router.get('/bodies/:modelId/:year', function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    var model, message;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _Auto2.default.aggregate([{ $match: { model_id: +req.params.modelId, year: +req.params.year } }, { $group: { _id: '$body_id', label: { $first: '$body' } } }]);

          case 3:
            model = _context4.sent;

            res.json(model);
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4['catch'](0);
            message = _context4.t0.message;
            return _context4.abrupt('return', next({
              status: 500,
              message: message
            }));

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}());

router.get('/generations/:modelId/:year/:bodyId', function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res, next) {
    var model, message;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _Auto2.default.aggregate([{ $match: { model_id: +req.params.modelId, year: +req.params.year, body_id: +req.params.bodyId } }, { $group: { _id: '$generation_id', label: { $first: '$generation' } } }]);

          case 3:
            model = _context5.sent;

            res.json(model);
            _context5.next = 11;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5['catch'](0);
            message = _context5.t0.message;
            return _context5.abrupt('return', next({
              status: 500,
              message: message
            }));

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 7]]);
  }));

  return function (_x13, _x14, _x15) {
    return _ref9.apply(this, arguments);
  };
}());

router.get('/trims/:modelId/:year/:bodyId/:generationId', function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res, next) {
    var model, message;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _Auto2.default.aggregate([{ $match: { model_id: +req.params.modelId, year: +req.params.year, body_id: +req.params.bodyId, generation_id: +req.params.generationId } }, { $group: { _id: '$trim_id', label: { $first: '$trim' } } }]);

          case 3:
            model = _context6.sent;

            res.json(model);
            _context6.next = 11;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6['catch'](0);
            message = _context6.t0.message;
            return _context6.abrupt('return', next({
              status: 500,
              message: message
            }));

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 7]]);
  }));

  return function (_x16, _x17, _x18) {
    return _ref11.apply(this, arguments);
  };
}());

router.get('/getid/:modelId/:year/:bodyId/:generationId/:trimId', _checkToken2.default, function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res, next) {
    var model, message;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _Auto2.default.findOne({
              model_id: +req.params.modelId,
              year: +req.params.year,
              body_id: +req.params.bodyId,
              generation_id: +req.params.generationId,
              trim_id: +req.params.trimId
            });

          case 3:
            model = _context7.sent;


            _metrix2.default.dispatch('AUTO_NEW_SELECTED', req.user, model);

            res.json(model);
            _context7.next = 12;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7['catch'](0);
            message = _context7.t0.message;
            return _context7.abrupt('return', next({
              status: 500,
              message: message
            }));

          case 12:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 8]]);
  }));

  return function (_x19, _x20, _x21) {
    return _ref13.apply(this, arguments);
  };
}());

router.get('/one/:autoId', function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res, next) {
    var model, message;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _Auto2.default.findOne({ _id: req.params.autoId });

          case 3:
            model = _context8.sent;


            res.json(model);
            _context8.next = 11;
            break;

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8['catch'](0);
            message = _context8.t0.message;
            return _context8.abrupt('return', next({
              status: 500,
              message: message
            }));

          case 11:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 7]]);
  }));

  return function (_x22, _x23, _x24) {
    return _ref15.apply(this, arguments);
  };
}());

exports.default = router;