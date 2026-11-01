import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AuthRepository from '../repository/auth-repository';

class authService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }
  async login(email: string, password: string) {
    const user = await this.authRepository.findUserByEmail({
      email,
      password,
    } as any);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT secret is not defined');
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      secret || 'default_secret',
      { expiresIn: '1h' },
    );
    return { user: { id: user.id, email: user.email }, token };
  }

  async register(name: string, email: string, password: string) {
    const existingUser = await this.authRepository.findUserByEmail({
      email,
      password,
    } as any);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.authRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });
    {
      return { id: newUser.id, name: newUser.name, email: newUser.email };
    }
  }
}
export default new authService();
