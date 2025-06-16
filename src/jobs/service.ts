import { LikedJobType } from "./create-liked-job-schema";
import { CreateUserType } from "../users/create-user-schema";
import { Job } from "./models";
import LikedJob from "./models";

interface LikedJobCreationType {
  likedJob: LikedJobType;
  user: CreateUserType;
}

class LikedJobService {
  async create({ likedJob, user }: LikedJobCreationType) {
    const { api_id } = likedJob;
    // @ts-ignore
    const userId = user._id;
    const job = await Job.findOne({ api_id }).exec();

    if (!job) {
      await Job.create({ ...likedJob });
    }

    const alreadyLiked = await LikedJob.findOne({
      user_id: userId,
      api_id,
    });

    if (alreadyLiked) {
      throw new Error("Job already liked");
    }

    const likedJobCreated = await LikedJob.create({
      // @ts-ignore
      user: userId,
      job: api_id,
    });

    return likedJobCreated;
  }
}

export default LikedJobService;
