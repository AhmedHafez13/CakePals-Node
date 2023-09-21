import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserAttributes } from './user.types';

export interface UserDocument extends Document, UserAttributes {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface UserModel extends Model<UserDocument> {}

const userSchema: Schema<UserDocument, UserModel> = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

const UserModel = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default UserModel;
