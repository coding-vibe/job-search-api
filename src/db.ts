import mongoose from 'mongoose';

export default async function initDb() {
  try {

    await mongoose.connect(process.env.DB_URL as string);
    console.log('Database connected successfully');
  } catch (error) {
    console.log(error);

  }
}
