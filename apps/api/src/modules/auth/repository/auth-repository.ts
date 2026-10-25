import User from '../../../shared/database/models/user.js';

class AuthRepository {
  constructor() {
    this.user = User;
  }
  async findUserByEmail(email) {
    return await this.user.findOne({ where: { email } });
  }
  async createUser(userData) {
    return await this.user.create(userData);
  }
}

export default AuthRepository;
