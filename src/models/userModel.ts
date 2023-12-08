import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config/config';
import { IUser, UserModel } from '../types/userTypes';

const userSchema = new mongoose.Schema<IUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    type: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    _id: false,
    required: true,
  },
  age: { type: Number, required: true },
  hobbies: { type: [String] },
  address: {
    type: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    _id: false,
    required: true,
  },
  orders: {
    type: [
      {
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        _id: false,
      },
    ],
    required: true,
  },
  isActive: { type: Boolean, default: true },
});

// Pre-save middleware to hash the user's password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(config.bcryptSalt);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error as Error);
  }
});
// Post-save middleware to remove sensitive information
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  this.select('-password -orders');
  next();
});

userSchema.pre('find', function (next) {
  this.find({ isActive: { $ne: false } });
  this.select('-_id username email fullName age address');
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isActive: { $ne: false } });
  this.select('-_id userId username email fullName age hobbies address isActive');
  next();
});

// Add a static method to the schema to check if a user exists by userId
userSchema.statics.isUserExist = async function (userId: number): Promise<IUser | null> {
  return await UserModel.findOne({ userId });
};

const UserModel = mongoose.model<IUser, UserModel>('Users', userSchema);

export default UserModel;
