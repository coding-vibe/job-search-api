import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';

import initDb from './db';
import jwtStrategy from './auth/jwt-strategy';
import authRouter from './auth/routes';
import usersRouter from './users/routes';

initDb();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

passport.use('jwt', jwtStrategy);

app.use('/auth', authRouter);
app.use('/users', usersRouter);

export default app;
