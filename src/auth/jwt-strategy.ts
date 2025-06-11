import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../users/models';

const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string,
  },
  async (payload, done) => {
    const { email } = payload;

    const user = await User.findOne({ email });

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  },
);

export default jwtStrategy;
