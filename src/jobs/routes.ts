import { Router } from "express";
import passport from "passport";
import httpStatusCodes from "../constants/httpStatusCodes";

const jobRouter = Router();

jobRouter.post(
  "/liked-jobs",
  passport.authenticate("jwt", { session: false }),
  (_, res) => {
    res.sendStatus(httpStatusCodes.NO_CONTENT);
  }
);

export default jobRouter;
