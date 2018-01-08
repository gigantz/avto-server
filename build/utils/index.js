"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sanitizedObject = exports.sanitizedObject = function sanitizedObject(body) {
  var obj = {};
  for (var prop in body) {
    if (body[prop]) {
      obj[prop] = body[prop];
    }
  }
  return obj;
};

exports.default = sanitizedObject;