import express from 'express';
import { addSubject, updateSubject, deleteSubject, likeSubject } from '../controllers/forumController';
import checkToken from '../middleware/checkToken';

const router = express.Router();

router.post('/add', checkToken, addSubject);
router.put('/update', checkToken, updateSubject);
router.delete('/delete', checkToken, deleteSubject);

// Public
router.post('/like', checkToken, likeSubject);

export default router;