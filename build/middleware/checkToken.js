'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  var token = req.body.token || req.headers.token;
  var decodedToken = _jsonwebtoken2.default.decode(token, _config2.default.SECRET);

  if (!decodedToken) {
    console.log(decodedToken);
    return res.json({
      message: 'Token problems'
    });
  }

  req.user = decodedToken.userId;

  return next();
};