import express from 'express';
import MessageControler from '../controllers/MessageController.js';
import checkAuth from '../helpers/checkAuth.js';
const router = express.Router();

router.post('/:id', checkAuth, MessageControler.create);
router.get('/:id', checkAuth, MessageControler.allMessagesGroup);

export default router;