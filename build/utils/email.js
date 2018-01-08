'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mailer = function () {
  function Mailer() {
    (0, _classCallCheck3.default)(this, Mailer);

    this.transporter = null;
    this.defaultOptions = {
      from: '"AvtoBirlik" <orkhan@zemhome.com>', // sender address
      to: 'orkhanjafarovr@mail.ru', // list of receivers
      subject: 'Hello', // Subject line
      text: 'Test', // plain text body
      html: '<b>Test</b>' // html body
    };
  }

  (0, _createClass3.default)(Mailer, [{
    key: 'init',
    value: function init() {
      this.transporter = _nodemailer2.default.createTransport({
        host: 'smtp.zemhome.com',
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'orkhan@zemhome.com',
          pass: 'killme90'
        },
        authMethod: 'NTLM',
        tls: { rejectUnauthorized: false },
        debug: true
      });
    }
  }, {
    key: 'sendMail',
    value: function sendMail() {
      var mailOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultOptions;

      this.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
    }
  }]);
  return Mailer;
}();

;

exports.default = new Mailer();