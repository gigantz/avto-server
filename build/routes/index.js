'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auto = require('./auto');

var _auto2 = _interopRequireDefault(_auto);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _verify = require('./verify');

var _verify2 = _interopRequireDefault(_verify);

var _forum = require('./forum');

var _forum2 = _interopRequireDefault(_forum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/auto', _auto2.default);
router.use('/auth', _auth2.default);
router.use('/user', _user2.default);
router.use('/verify', _verify2.default);
router.use('/forum', _forum2.default);

router.get('/', function (req, res) {
  res.json({
    version: '1.0',
    status: 200,
    message: 'I\'m okay, bro'
  });
});

exports.default = router;