import { Router, Request, Response } from 'express';
import { checkSchema, matchedData, validationResult } from 'express-validator';

import createUserSchema, { CreateUserType } from './create-user-schema';
import UserService from './service';
import httpStatusCodes from '../constants/httpStatusCodes';

const usersRouter = Router();

usersRouter.post('/', checkSchema(createUserSchema), async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(httpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    return;
  }

  const data: CreateUserType = matchedData(req);

  try {
    const service = new UserService();
    const result = await service.create(data);

    res.status(httpStatusCodes.CREATED).json(result);
  } catch (e) {
    console.log(e);

    res.sendStatus(httpStatusCodes.UNPROCESSABLE_ENTITY);
  }
});

export default usersRouter;
