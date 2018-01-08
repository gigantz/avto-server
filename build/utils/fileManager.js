'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

var read = function read(path) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf8';
    return new _promise2.default(function (res, rej) {
        fs.readFile(path, opts, function (err, data) {
            if (err) rej(err);else res(data);
        });
    });
};

var write = function write(path, data) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf8';
    return new _promise2.default(function (res, rej) {
        fs.writeFile(path, data, opts, function (err) {
            if (err) rej(err);else res();
        });
    });
};

module.exports = {
    read: read,
    write: write
};