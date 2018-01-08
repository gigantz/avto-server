'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authController = require('../controllers/authController');

var _fbController = require('../controllers/fbController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/sign-up', _authController.signUp);
router.post('/login', _authController.login);
router.post('/check', _authController.emailExists);

router.post('/facebook/sign-up', _fbController.facebookSignup);
router.post('/facebook/login', _fbController.facebookLogin);

exports.default = router;