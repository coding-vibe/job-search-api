import { Document, ObjectId } from "mongoose";
import { LikedJobType } from "./create-liked-job-schema";
import User from "../users/models";
import { Job } from "./models";
import LikedJob from "./models";
import TransitionService from "../common/transitionService";

interface LikedJobCreationType {
  likedJob: LikedJobType;
  user: typeof User;
}

class LikedJobService {
  async create({ likedJob, user }: LikedJobCreationType) {
    const { api_id } = likedJob;
    // @ts-ignore
    const userId = user._id;
    const transactionService = new TransitionService();

    const transactionResult = await transactionService.run<Document>(
      async (session) => {
        const job = await Job.findOne({ api_id }).session(session).exec();
        if (!job) {
          await Job.create({ ...likedJob });
        }

        const alreadyLiked = await LikedJob.findOne({
          user_id: userId,
          api_id,
        }).session(session);

        if (alreadyLiked) {
          throw new Error("Job already liked");
        }

        const likedJobCreated = await LikedJob.create({
          user: userId,
          job: api_id,
        });

        return likedJobCreated;
      }
    );

    return transactionResult;
  }
}

export default LikedJobService;
