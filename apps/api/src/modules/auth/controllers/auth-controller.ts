import { Request, Response } from 'express';
import authService from '../services/auth-service';
import { loginSchema, registerSchema } from '../validation/auth-validation';

class authController {
  async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body);
      const result = await authService.login(data.email, data.password);
      return res.status(200).json(result);
    } catch {
      return res.status(401).json({ message: 'E-mail ou senha inválidos' });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const data = registerSchema.parse(req.body);
      await authService.register(data.name, data.email, data.password);
      res.status(201).json({ message: 'User registered successfully' });
    } catch {
      res.status(400).json({ message: 'Registration failed' });
    }
  }
}

export default new authController();
