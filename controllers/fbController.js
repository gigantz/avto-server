import path from 'path';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';

import Users from 'models/Users';

import config from 'config';
import checkToken from '../middleware/checkToken';
import { sanitizedObject } from 'utils';

export const facebookSignup = async (req, res, next) => {
  const { facebookId, email, firstname, lastname, facebookToken } = req.body;
  console.log(req.body);
  try {
    const user = await Users.create({
      email,
      firstname,
      lastname,
      facebookToken,
      facebookId,
      userId: uuid.v4()
    });
    const token = jwt.sign({ userId: user.userId }, config.SECRET);
    user.password = undefined;

    res.json({ user, token });
  } catch (error) {
    const loginValue = error.errors.phone || error.errors.email;
    return res.status(400).json({ message: `${loginValue}` });
  }
};

export const facebookLogin = async (req, res, next) => {
  const { facebookId, facebookToken } = req.body;
  console.log(req.body);
  try {
    const user = await Users.findOne({ facebookId });

    const token = jwt.sign({ userId: user.userId }, config.SECRET);
    user.password = undefined;
    res.json({user, token});
  } catch (e) {   
    console.log(e);
    return res.status(400).json({
      status: 400,
      message: 'user_not_in_db' 
    });
  }
};

export default {
  facebookSignup,
  facebookLogin
}