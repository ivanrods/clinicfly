import { Router } from 'express';
import appointmentController from '../controllers/appointment-controller';
import authMiddleware from '../../../shared/middlewares/auth-middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', appointmentController.getAll);
router.get('/:id', appointmentController.getById);
router.post('/', appointmentController.create);
router.patch('/:id', appointmentController.update);
router.delete('/:id', appointmentController.remove);

export default router;
