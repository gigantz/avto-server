'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var schema = new Schema({
  subjectId: { type: String, require: true, index: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  auto: { type: Schema.Types.ObjectId, ref: 'auto' },
  categoryId: { type: Number, required: true },
  subscribers: [{
    userId: String,
    subscribedAt: { type: Date, default: Date.now }
  }],
  author: { type: Schema.Types.ObjectId, ref: 'users' },
  likes: { type: Number, default: 0 },
  postDate: { type: Date, default: Date.now },

  answers: [{
    authorId: { type: String, required: true },
    authorFullName: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 }
  }]
});

exports.default = _mongoose2.default.model('subjects', schema);