import { model, Schema, Types } from "mongoose";

const JobSchema = new Schema({
  job_id: String,
  job_title: String,
  job_description: String,
  employer_name: String,
  employer_logo: String,
  job_employment_type: String,
  job_location: String,
  job_apply_link: String,
  job_highlights: { Qualifications: [String] },
  job_posted_at: String,
  job_min_salary: Number,
  job_max_salary: Number,
});

export const Job = model("Job", JobSchema);

const LikedJobSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User" },
  job: { type: Types.ObjectId, ref: "Job" },
});

LikedJobSchema.index({ user: 1, job: 1 }, { unique: true });

const LikedJob = model("LikedJob", LikedJobSchema);

export default LikedJob;
