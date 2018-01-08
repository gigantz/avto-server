'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptAsPromised = require('bcrypt-as-promised');

var _bcryptAsPromised2 = _interopRequireDefault(_bcryptAsPromised);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _mongoose2.default.Schema({
  userId: { type: String, required: true, index: true },
  email: { type: String, index: true, unique: true, uniqueCaseInsensitive: true, sparse: true },
  phone: { type: String, unique: true, index: true, sparse: true },
  password: { type: String },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  aboutme: String,
  countryCode: String,
  city: String,
  ip: String,
  registrationDate: { type: Date, default: Date.now },
  lastLogged: { type: Date, default: Date.now },
  picture: { type: String, default: 'default.png' },
  facebookId: { type: String, unique: true, index: true, sparse: true },
  facebookToken: { type: String },

  emailVerification: Boolean,
  phoneVerification: Boolean,

  deviceData: String,
  online: Boolean,
  active: Boolean,
  claims: Array,
  logs: [{
    type: { type: String, required: true },
    message: { type: String, default: 'NO Message' },
    date: { type: Date, default: Date.now }
  }],
  notifications: Array,
  subscriptions: Array,

  // Stats
  questions: { type: Number, default: 0 },
  answer: { type: Number, default: 0 },
  points: { type: Number, default: 0 },

  // Auto
  autoId: String,
  autoNumber: String,
  autoPhoto: { type: String, default: 'default.png' },
  autoVin: String,
  onsale: Boolean,
  photos: [{
    caption: String,
    url: { type: String, required: true }
  }]
});

schema.plugin(_mongooseUniqueValidator2.default);

schema.pre('save', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(next) {
    var salt, hash;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (this.isModified('password')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', next());

          case 2:
            _context.next = 4;
            return _bcryptAsPromised2.default.genSalt(10);

          case 4:
            salt = _context.sent;
            _context.next = 7;
            return _bcryptAsPromised2.default.hash(this.password, salt);

          case 7:
            hash = _context.sent;


            this.password = hash;
            next();

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

schema.methods.comparePasswords = function (password) {
  return _bcryptAsPromised2.default.compare(password, this.password);
};

exports.default = _mongoose2.default.model('users', schema);