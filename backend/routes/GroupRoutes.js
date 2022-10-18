import express from 'express';
import GroupController from '../controllers/GroupController.js';
import checkAuth from '../helpers/checkAuth.js';
const router = express.Router();

router.post('/', checkAuth, GroupController.create);
router.get('/', checkAuth, GroupController.allGroupsUser);
router.delete('/:id', checkAuth, GroupController.delete)

export default router;