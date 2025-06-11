import { Schema } from 'express-validator';

import { MAX_DESCRIPTION_LENGTH } from './models';

const createUserSchema: Schema = {
  email: { isEmail: true, notEmpty: true },
  password: { notEmpty: true },
  jobTitle: { notEmpty: true },
  name: { notEmpty: true },
  aboutMe: { optional: true, isLength: { options: { max: MAX_DESCRIPTION_LENGTH } } },
};

export interface CreateUserType {
  email: string;
  password: string;
  jobTitle: string;
  name: string;
  aboutMe?: string;
}

export default createUserSchema;
