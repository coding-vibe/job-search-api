import mongoose from 'mongoose';

export default function initDb() {
  return mongoose.connect(process.env.DB_URL as string);
}
