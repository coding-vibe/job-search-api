import { Schema } from "express-validator";

const createLikedJobSchema: Schema = {
  api_id: { notEmpty: true },
  title: { notEmpty: true },
  description: { notEmpty: true },
  employer_name: { notEmpty: true },
  employer_logo: { notEmpty: true },
  employment_type: { notEmpty: true },
  location: { notEmpty: true },
  apply_link: {
    notEmpty: true,
    isURL: {
      errorMessage: "Must be a valid URL",
    },
  },
  highlights: {
    notEmpty: true,
    isObject: true,
  },
  posted_at: {
    notEmpty: true,
  },
  min_salary: {
    notEmpty: true,
    isNumeric: {
      errorMessage: "Must be a number",
    },
  },
  max_salary: {
    notEmpty: true,
    isNumeric: {
      errorMessage: "Must be a number",
    },
  },
};

export interface LikedJobType {
  api_id: string;
  title: string;
  description: string;
  employer_name: string;
  employer_logo: string | null;
  employment_type: string;
  location: string;
  apply_link: string;
  highlights: { Qualifications: string[] };
  posted_at: string;
  min_salary: number | null;
  max_salary: number | null;
}

export default createLikedJobSchema;
