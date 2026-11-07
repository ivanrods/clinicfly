import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './modules/auth/routes/auth-routes';

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }));

app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
