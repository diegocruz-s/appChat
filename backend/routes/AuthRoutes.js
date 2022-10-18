import express from 'express';
import AuthController from '../controllers/AuthController.js';
import checkAuth from '../helpers/checkAuth.js';

const router = express.Router();

router.post('/', AuthController.register);
router.post('/login', AuthController.login);
router.get('/test', checkAuth, AuthController.test)

export default router;