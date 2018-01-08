'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _fileManager = require('./fileManager');

var _fileManager2 = _interopRequireDefault(_fileManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Verification = function Verification() {
  var _this = this;

  (0, _classCallCheck3.default)(this, Verification);

  this.addUser = function (id, code) {
    _this.userList.push({ id: id, code: code, exp: Date.now() + 60000 });
    _fileManager2.default.write(__dirname + '/verification.txt', (0, _stringify2.default)(_this.userList));
  };

  this.verify = function (id, code) {
    var list = _this.userList.find(function (i) {
      return i.id === id && i.code === code;
    });
    if (!list) return false;

    if (list.exp >= Date.now()) {
      _this.userList = _this.userList.filter(function (i) {
        return i.id !== id;
      });
      _fileManager2.default.write(__dirname + '/verification.txt', (0, _stringify2.default)(_this.userList));

      console.log(id + ' is verified');
      return true;
    } else {

      _this.userList = _this.userList.filter(function (i) {
        return i.id !== id;
      });
      _fileManager2.default.write(__dirname + '/verification.txt', (0, _stringify2.default)(_this.userList));

      console.log(id + ' is not verified');
      return false;
    }
  };

  this.check = function (id) {
    _this.userList = _this.userList.filter(function (i) {
      return i.id !== id;
    });
    _fileManager2.default.write(__dirname + '/verification.txt', (0, _stringify2.default)(_this.userList));
  };

  this.getList = function () {
    return _this.userList;
  };

  _fileManager2.default.read(__dirname + '/verification.txt').then(function (res) {
    if (!res || !Array.isArray(res)) return false;
    _this.userList = JSON.parse(res) || [];
  });
};

exports.default = new Verification();