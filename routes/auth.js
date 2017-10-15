import express from 'express';
import path from 'path';
import Users from 'models/Users';
import jwt from 'jsonwebtoken';
import config from 'config';
import publicIp from 'public-ip';

const router = express.Router();


router.post('/sign-up', async (req, res, next) => {  
  try {
    const ipAddress = await publicIp.v4();
    const user = await Users.create({ ...req.body, ip: ipAddress });
    res.json(user);
  } catch ({ message }) {
    return res.status(400).json({ message });
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await Users.findOne({ email });

  if (!user) {
    return res.status(400).json({
      status: 400,
      message: 'wrong_email_password' // User is not found
    });
  }

  try {
    const result = await user.comparePasswords(password);
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'wrong_email_password'
    });
  }

  try {
    const ipAddress = await publicIp.v4();
    const log = {
      type: 'LOGGED',
      message: `${ipAddress ? ipAddress : 'no_ip'}`,
      date: new Date(),
    };

    const userSave = await Users.findOneAndUpdate({
      _id: user.id
    },{
      lastLogged: new Date(),
      $push: { logs: log },
    });
    } catch ({ message }) {
      return res.status(404).json({
        status: 404,
        message
      });
    }
  
    const token = jwt.sign({ _id: user._id }, config.SECRET);
    user.password = undefined;
    res.json({user, token});
});

export default router;