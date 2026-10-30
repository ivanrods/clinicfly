import { resquest, response } from 'express';
import authService from '../services/auth-service';

class authController {
  async login(req: resquest, res: response) {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  async register(req: resquest, res: response) {
    try {
      const { email, password } = req.body;
      await authService.register(email, password);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Registration failed' });
    }
  }
}

export default authController;
