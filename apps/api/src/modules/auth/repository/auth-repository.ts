import User from '../../../shared/database/models/user';
import { RegisterUserDTO } from '../dto/register-dto';

class AuthRepository {
  async findUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  }
  async createUser(userData: RegisterUserDTO) {
    return User.create(userData);
  }
}

export default AuthRepository;
