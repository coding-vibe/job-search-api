import { Request, Response, NextFunction } from "express";
import ApiError from "./apiError";
import httpStatusCodes from "../constants/httpStatusCodes";
import logger from "./logger";

const ERROR_MESSAGE = "Internal server error";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ApiError) {
    const { statusCode, code, message, payload } = err;

    logger.debug(message);
    res.status(statusCode).json({ success: false, message, code, payload });
    return;
  }

  logger.error("Unhandled error:", err);

  res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERROR_MESSAGE,
    code: httpStatusCodes[httpStatusCodes.INTERNAL_SERVER_ERROR],
  });
};

export default errorHandler;
