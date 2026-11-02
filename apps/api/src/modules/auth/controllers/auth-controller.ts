import { Request, Response } from 'express';
import authService from '../services/auth-service';
import { loginSchema, registerSchema } from '../validation/auth-validation';

class authController {
  async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body);
      const token = await authService.login(data.email, data.password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const data = registerSchema.parse(req.body);
      await authService.register(data.name, data.email, data.password);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Registration failed' });
    }
  }
}

export default new authController();
