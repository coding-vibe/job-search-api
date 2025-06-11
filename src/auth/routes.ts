import { Router, Request, Response } from 'express';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import passport from 'passport';

import AuthService from './service';
import loginSchema from './login-schema';
import httpStatusCodes from '../constants/httpStatusCodes';

const authRouter = Router();

authRouter.post('/login', checkSchema(loginSchema), async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(httpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const { email, password } = matchedData(req);

    const service = new AuthService();
    const accessToken = await service.login(email, password);

    res.status(httpStatusCodes.OK).json({ accessToken });
  } catch {
    res.status(httpStatusCodes.UNAUTHORIZED).json({ error: 'Invalid email or password' });
  }
});

authRouter.post('/verify', passport.authenticate('jwt', { session: false }), (_, res) => {
  res.sendStatus(httpStatusCodes.NO_CONTENT);
});

export default authRouter;
