import { Router } from 'express';
import patientController from '../controllers/patient-controller';
import authMiddleware from '../../../shared/middlewares/auth-middleware';

const router = Router();

router.use(authMiddleware);

router.get('/:id', patientController.getById);
router.post('/', patientController.create);
router.patch('/:id', patientController.update);
router.delete('/:id', patientController.remove);

export default router;
