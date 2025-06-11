import { CreateUserType } from './create-user-schema';
import User from './models';
import AuthService from '../auth/service';

class UserService {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async create(payload: CreateUserType) {
    const { password, ...userData } = payload;
    const hashedPassword = await this.authService.hashPassword(password);

    return User.create({ ...userData, password: hashedPassword });
  }
}

export default UserService;
