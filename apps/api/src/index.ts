import express from 'express';
import sequelize from './config/database.js';

const app = express();

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Server is starting...');
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
