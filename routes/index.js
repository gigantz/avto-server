import express from 'express';
const router = express.Router();

import auto from './auto';
import auth from './auth';
import user from './user';
import verify from './verify';
import forum from './forum';

router.use('/auto', auto);
router.use('/auth', auth);
router.use('/user', user);
router.use('/verify', verify);
router.use('/forum', forum);

router.get('/', (req, res) => {
  res.json({
    version: '1.0',
    status: 200,
    message: `I'm okay, bro`
  });
})

export default router;