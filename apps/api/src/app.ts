import express from 'express';
import routes from './modules/auth/routes/auth-routes';

const app = express();

app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
