import { Router } from 'express';
import doctorController from '../controllers/doctor-controller';
import authMiddleware from '../../../shared/middlewares/auth-middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', doctorController.getAll);
router.get('/:id', doctorController.getById);
router.post('/', doctorController.create);
router.patch('/:id', doctorController.update);
router.delete('/:id', doctorController.remove);

export default router;
