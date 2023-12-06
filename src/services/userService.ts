import UserModel from '../models/userModel';
import IUser from '../types/userTypes';

const getAllUsers = async (): Promise<IUser[] | null> => {
  try {
    const users = await UserModel.find({}, 'username email fullName age address');
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw new Error('Failed to fetch users');
  }
};

const createUser = async (user: IUser): Promise<IUser | null> => {
  try {
    const createdUser = await UserModel.create(user);
    return createdUser;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw new Error('Failed to create user');
  }
};

const userServices = {
  getAllUsers,
  createUser,
};

export default userServices;

/* import UserModel from '../models/userModel';
import { User } from '../types/userTypes';

const getAllUsers = async (): Promise<User[] | null> => {
  try {
    return await UserModel.find();
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

const getSingleUser = async (userId: number): Promise<User | null> => {
  try {
    return await UserModel.findByUserId(userId);
  } catch (error) {
    throw new Error(`Failed to fetch user with ID: ${userId}`);
  }
};

const updateUser = async (userId: number, updatedUserData: User): Promise<User | null> => {
  if (!(await UserModel.findByUserId(userId))) {
    throw new Error(`User with ID ${userId} not found`);
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { ...updatedUserData, password: undefined },
    { new: true },
  );
  return updatedUser;
};

const deleteUser = async (userId: number) => {
  if (await UserModel.findByUserId(userId)) {
    throw new Error(`User with ID ${userId} not found`);
  }

  return await UserModel.updateOne({ userId }, { isActive: false });
};

const createUser = async (user: User): Promise<User | null> => {
  try {
    return await UserModel.create(user);
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

const userServices = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createUser,
};

export default userServices;
 */
