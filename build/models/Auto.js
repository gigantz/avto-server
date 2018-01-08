'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _mongoose.Schema({
  trim_id: { type: Number, required: true },
  trim: { type: String, required: true },
  trim_ru: { type: String, required: true },
  make_id: { type: Number, required: true },
  make: { type: String, required: true },
  make_ru: { type: String, required: true },
  model_id: { type: Number, required: true },
  model: { type: String, required: true },
  model_ru: { type: String, required: true },
  generation_id: { type: Number, required: true },
  generation: { type: String, required: true },
  generation_ru: { type: String, required: true },
  body_id: { type: Number, required: true },
  body: { type: String, required: true },
  body_ru: { type: String, required: true },
  drive_id: { type: Number, required: true },
  drive: { type: String, required: true },
  drive_ru: { type: String, required: true },
  gearbox_id: { type: Number, required: true },
  gearbox: { type: String, required: true },
  gearbox_ru: { type: String, required: true },
  engine_type_id: { type: Number, required: true },
  engine_type: { type: String, required: true },
  engine_type_ru: { type: String, required: true },
  engine_volume: { type: Number, required: true },
  engine_power: { type: Number, required: true },
  year: { type: Number, required: true },
  image: { type: String, required: true },
  date_update: { type: Date, default: Date.now },
  is_active: { type: Boolean, required: true },
  old_id: Number,
  oil: String
}, { collection: 'auto' });

exports.default = _mongoose2.default.model('auto', schema);