import { sign, verify } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

import User from '../users/models';

class AuthService {
  private static readonly saltRounds = 10;
  private static readonly secret: string = process.env.JWT_SECRET as string;

  hashPassword(password: string) {
    return hash(password, AuthService.saltRounds);
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await compare(password, user.password as string);

    if (!isValid) {
      throw new Error('Invalid password');
    }

    return sign({ email: user.email }, AuthService.secret);
  }

  async verityToken(token: string) {
    try {
      verify(token, AuthService.secret);

      return true;
    } catch {
      return false;
    }
  }
}

export default AuthService;
