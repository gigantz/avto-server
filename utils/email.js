import nodemailer from 'nodemailer';

class Mailer {
  constructor() {
    this.transporter = null;
    this.defaultOptions = {
      from: '"AvtoBirlik" <orkhan@zemhome.com>', // sender address
      to: 'orkhanjafarovr@mail.ru', // list of receivers
      subject: 'Hello', // Subject line
      text: 'Test', // plain text body
      html: '<b>Test</b>' // html body
    };
  }

  init() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.zemhome.com',
      port: 2525,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'orkhan@zemhome.com',
          pass: 'killme90'
      },
      authMethod:'NTLM',
      tls: {rejectUnauthorized: false},
      debug:true
    });
  }

  sendMail(mailOptions = this.defaultOptions){
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  }
};

export default new Mailer;