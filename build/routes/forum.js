'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _forumController = require('../controllers/forumController');

var _checkToken = require('../middleware/checkToken');

var _checkToken2 = _interopRequireDefault(_checkToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/add', _checkToken2.default, _forumController.addSubject);
router.put('/update', _checkToken2.default, _forumController.updateSubject);
router.delete('/delete', _checkToken2.default, _forumController.deleteSubject);

// Public
router.post('/like', _checkToken2.default, _forumController.likeSubject);

exports.default = router;