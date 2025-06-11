import { model, Schema } from 'mongoose';

export const MAX_DESCRIPTION_LENGTH = 500;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  jobTitle: { type: String, required: true },
  name: { type: String, required: true },
  aboutMe: { type: String, required: false, maxLength: MAX_DESCRIPTION_LENGTH },
});

const User = model('User', UserSchema);

export default User;
