import User from '../../../shared/database/models/user';
import { LoginUserDTO } from '../dto/login-dto';
import { RegisterUserDTO } from '../dto/register-dto';

class AuthRepository {
  async findUserByEmail(useData: LoginUserDTO) {
    return User.findOne({ where: { email: useData.email } });
  }
  async createUser(userData: RegisterUserDTO) {
    return User.create(userData as any);
  }
}

export default AuthRepository;
