import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import authRoutes from './modules/auth/routes/auth-routes';
import patientRoutes from './modules/patients/routes/patient-routes';
import { errorMiddleware } from './shared/middlewares/error-middleware';

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }));

app.use(authRoutes);
app.use('/patients', patientRoutes);
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
