'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

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

var _checkToken = require('../middleware/checkToken');

var _checkToken2 = _interopRequireDefault(_checkToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Verification from 'utils/verification';

var router = _express2.default.Router();

router.get('/email/:code', _checkToken2.default, function (req, res) {
  if (!req.params.code) {
    return res.status(500).send('not_validated');
  }

  if (global.Verification.verify(req.user, req.params.code)) {
    return res.status(200).end('verified');
  }

  res.status(400).send('error');
});

exports.default = router;