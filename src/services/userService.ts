import UserModel from '../models/userModel';
import { IUser, Order } from '../types/userTypes';

const getAllUsers = async (): Promise<IUser[] | null> => {
  try {
    const users = await UserModel.find({}, '-_id username email fullName age address');
    return users;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

const getUserById = async (userId: number): Promise<IUser | null> => {
  try {
    const user = await UserModel.findOne(
      { userId },
      '-_id userId username email fullName age hobbies address isActive',
    );

    return user;
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
};

const createUser = async (user: IUser): Promise<IUser | null> => {
  try {
    const createdUser = await UserModel.create(user);
    return createdUser;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

const updateUserById = async (userId: number, newUserData: IUser): Promise<IUser | null> => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { userId },
      { $set: { ...newUserData } },
      { new: true, upsert: true },
    );

    // Ensure that the returned user matches the IUser type
    return user;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

const deleteUserById = async (userId: number): Promise<unknown> => {
  try {
    const user = await UserModel.updateOne(
      { userId },
      { $set: { isActive: false } },
      { new: true, upsert: true },
    );
    return user;
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};

async function addOrdersForSpecificUser(userId: number, ordersData: Order): Promise<unknown> {
  try {
    const result = await UserModel.updateOne(
      { userId },
      {
        $addToSet: {
          orders: { $each: ordersData },
        },
      },
      { upsert: true },
    );

    return result;
  } catch (error) {
    throw new Error('Failed to add orders');
  }
}

async function getOrdersForSpecificUser(userId: number): Promise<Order[] | null> {
  try {
    const orders = await UserModel.aggregate([
      { $match: { userId } },
      { $project: { orders: 1, _id: 0 } },
    ]);

    return orders as Order[] | null;
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
}

async function getSpecificUserOrderWithTotalPrice(
  userId: number,
): Promise<{ totalPrice: number } | null> {
  try {
    const result = await UserModel.aggregate([
      { $match: { userId } },
      {
        $project: {
          totalPrice: { $sum: '$orders.price' },
          _id: 0,
        },
      },
    ]);

    return result[0] || null;
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
}

const userServices = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addOrdersForSpecificUser,
  getOrdersForSpecificUser,
  getSpecificUserOrderWithTotalPrice,
};

export default userServices;
