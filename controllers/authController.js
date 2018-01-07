import path from 'path';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';

import Users from 'models/Users';

import config from 'config';
import checkToken from '../middleware/checkToken';
import { sanitizedObject } from 'utils';

import Metrix from 'metrix';
import Mailer from 'utils/email';

export const signUp = async (req, res, next) => {
  try {
    const user = await Users.create({ ...req.body, userId: uuid.v4() });
    const token = jwt.sign({ userId: user.userId }, config.SECRET);
    user.password = undefined;

    if(user.email) {
      console.log('mailing...');
      Mailer.sendMail({
        from: '"AvtoBirlik" <orkhan@zemhome.com>',
        to: user.email,
        subject: 'Xoş gəldin', 
        text: 'Bizə qatıldığın üçün təşəkkür edirik!',
        html: `
          <h1>Əziz ${user.firstname}</h1>
          <p>Bizə qatıldığın üçün təşəkkür edirik!</p>
        `
      });
    }

    res.json({ user, token });
  } catch (error) {
    const loginValue = error.errors && (error.errors.phone || error.errors.email);

    if (loginValue && loginValue.value) {
      return res.status(400).json({ message: `${loginValue.value}` });
    }

    return res.status(400).json({ message: `${error.message}` });
  }
};

export const login = async (req, res, next) => {
  const { password } = req.body;
  user
  let user, result;
 
  try {
    user = await Users.findOne({ phone: req.body.phone || undefined, email: req.body.email || undefined });
    // if(!user.emailVerification) {
    //   global.Verification.check(user.userId);
    //   global.Verification.addUser(user.userId, Math.random().toString().substr(3));
    // }

  } catch (e) {
    console.log(e.message);

    Metrix.dispatch('WRONG_LOGIN_DEFAULT', 'guest', { email: req.body.email, phone: req.body.phone, password });
    return res.json({
      status: 400,
      message: 'wrong_email_password',
    });
  }

  // Password comparing 

  try {
    result = await user.comparePasswords(password);
  } catch (e) {
    Metrix.dispatch('WRONG_LOGIN_DEFAULT', 'guest', { email: req.body.email, phone: req.body.phone, password });

    if(req.body.email) {
      Mailer.sendMail({
        from: '"AvtoBirlik" <orkhan@zemhome.com>',
        to: req.body.email,
        subject: 'Reset password', 
        text: 'Reset your password avtobirlik://forget/json',
        html: `
          <h1>Reset your password</h1>
          <p>Click to <a href="avtobirlik://forget/json">New password</a></p>
        `
      });
    }

    return res.status(400).json({
      status: 400,
      message: 'wrong_email_password'
    });
  }
  
  const token = jwt.sign({ userId: user.userId }, config.SECRET);
  user.password = undefined;

  Metrix.dispatch('LOGIN_DEFAULT', user.userId, { email: user.email });
  
  res.json({user, token});
}

export const emailExists = async (req, res) => {
  const { email } = req.body;

  try {
    if(!email) return false;
    user = await Users.findOne({ email });
    
    res.json({
      status: 200,
      message: 'mail_sent',
    });
    
  } catch (error) {
    console.log(error);
  }
}

export default {
  signUp,
  login,
  emailExists,
}