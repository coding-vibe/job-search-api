import mongoose from "mongoose";
import logger from "./common/logger";

export default async function initDb() {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    logger.info("Database connected successfully");
  } catch (error) {
    logger.info(error);
  }
}
