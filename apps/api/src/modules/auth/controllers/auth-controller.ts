import { Request, Response } from 'express';
import authService from '../services/auth-service';

class authController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      await authService.register(name, email, password);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Registration failed' });
    }
  }
}

export default new authController();
