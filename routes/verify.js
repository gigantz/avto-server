import express from 'express';
import path from 'path';
import Users from 'models/Users';
import jwt from 'jsonwebtoken';
import config from 'config';
import uuid from 'uuid';
import { sanitizedObject } from 'utils';
import checkToken from '../middleware/checkToken';

// import Verification from 'utils/verification';

const router = express.Router();

router.get('/email/:code', checkToken, (req, res) => {
  if(!req.params.code) {
   return res.status(500).send('not_validated');
  }

  if(global.Verification.verify(req.user, req.params.code)) {
    return res.status(200).end('verified');
  }

  res.status(400).send('error');
})



export default router;