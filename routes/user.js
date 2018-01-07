import express from 'express';
import { updateUser, uploadFile } from 'controllers/userController';
import checkToken from '../middleware/checkToken';

const router = express.Router();

router.put('/update', checkToken, updateUser);
router.post('/upload', checkToken, uploadFile);

export default router;