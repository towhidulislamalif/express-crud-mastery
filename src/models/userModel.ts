import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import IUser from '../types/userTypes';
import config from '../config/config';

const userSchema = new Schema<IUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    type: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
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
    required: true,
  },
  orders: {
    type: [
      {
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
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

const UserModel = model<IUser>('Users', userSchema);

export default UserModel;
/* import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config/config';
import { User, UserModel } from '../types/userTypes';

const userSchema = new Schema<User, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  hobbies: { type: [String], default: [] },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [
    {
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

// Static method to find a user by their userId
userSchema.statics.findByUserId = async function (userId: number): Promise<User | null> {
  return await this.findOne({ userId });
};

// Pre-save middleware to hash the user's password
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(config.bcryptSalt);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Post-save middleware to remove sensitive information
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.pre('find', async function (next) {
  this.find({ isActive: { $ne: false } });
  next();
});
userSchema.pre('findOne', async function (next) {
  this.find({ isActive: { $ne: false } });
  next();
});

export default model<User, UserModel>('User', userSchema);
 */
