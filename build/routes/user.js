'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('../controllers/userController');

var _checkToken = require('../middleware/checkToken');

var _checkToken2 = _interopRequireDefault(_checkToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.put('/update', _checkToken2.default, _userController.updateUser);
router.post('/upload', _checkToken2.default, _userController.uploadFile);

exports.default = router;