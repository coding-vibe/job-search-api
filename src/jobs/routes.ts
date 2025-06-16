import { Router, Request, Response } from "express";
import passport from "passport";
import { checkSchema, matchedData, validationResult } from "express-validator";
import createLikedJobSchema from "./create-liked-job-schema";
import { LikedJobType } from "./create-liked-job-schema";
import { CreateUserType } from "../users/create-user-schema";
import httpStatusCodes from "../constants/httpStatusCodes";
import LikedJobService from "./service";

const jobRouter = Router();

jobRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkSchema(createLikedJobSchema),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(httpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const likedJob: LikedJobType = matchedData(req.body);
    // @ts-ignore
    const user: CreateUserType = req.user;

    const service = new LikedJobService();
    const result = await service.create({ likedJob, user });
    res.status(httpStatusCodes.CREATED).json(result);
  }
);

export default jobRouter;
