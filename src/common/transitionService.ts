import mongoose from "mongoose";
import logger from "./logger";

class TransitionService {
  async run<T>(callback: (session: mongoose.ClientSession) => Promise<T>) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const result = await callback(session);

      await session.commitTransaction();

      return result;
    } catch (error) {
      await session.abortTransaction();
      logger.info(error);
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default TransitionService;
