import express from 'express';
const router = express.Router();

import auto from './auto';
import auth from './auth';

router.use('/auto', auto);
router.use('/auth', auth);

export default router;