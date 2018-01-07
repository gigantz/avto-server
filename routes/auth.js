import express from 'express';
import { signUp, login, emailExists } from 'controllers/authController';
import { facebookSignup, facebookLogin } from 'controllers/fbController';

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/login', login);
router.post('/check', emailExists);

router.post('/facebook/sign-up', facebookSignup);
router.post('/facebook/login', facebookLogin);

export default router;