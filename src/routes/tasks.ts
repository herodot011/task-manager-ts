import { Router } from 'express';
import * as taskController from '../controllers/taskController';
import auth from '../middlewares/auth';
import checkRole from '../middlewares/checkRole';

const router = Router();

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.findById);
router.post('/', auth, taskController.createTask);
router.patch('/:id', auth, taskController.updateTask);
router.delete('/:id', auth, checkRole('admin'), taskController.deleteTask);


export default router;