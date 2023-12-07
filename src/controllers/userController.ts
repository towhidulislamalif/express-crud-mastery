import { Request, Response } from 'express';
import userSchemaValidation from '../zod/zod';
import userServices from '../services/userService';
import UserModel from '../models/userModel';
import { Order } from '../types/userTypes';

const handleSuccess = <T>(res: Response, message: string, data: T): void => {
  res.status(200).json({ success: true, message, data });
};

const handleNotFound = (res: Response, message: string): void => {
  res.status(404).json({
    success: false,
    message,
    error: { code: 404, description: message },
  });
};

const handleServerError = (res: Response, error: Error): void => {
  console.error('Internal server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: {
      code: 500,
      description: 'Something went wrong.',
      details: error.message,
    },
  });
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userServices.getAllUsers();

    if (!users?.length) {
      handleNotFound(res, 'Users not found');
      return;
    }

    handleSuccess(res, 'Users fetched successfully!', users);
  } catch (error) {
    handleServerError(res, error as Error);
  }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: number = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
      handleNotFound(res, 'User not found');
      return;
    }

    if (!(await UserModel.isUserExist(userId))) {
      handleNotFound(res, 'User not found');
      return;
    }

    const user = await userServices.getUserById(userId);

    handleSuccess(res, 'User fetched successfully!', user);
  } catch (error) {
    handleServerError(res, error as Error);
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = req.body;

    // Validate user input
    const validationResult = userSchemaValidation.safeParse(newUser);

    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        error: validationResult.error.issues[0].message,
      });
      return;
    }
    // Create user in the database
    const createdUser = await userServices.createUser(validationResult.data);

    // Send success response
    handleSuccess(res, 'User created successfully!', createdUser);
  } catch (error) {
    handleServerError(res, error as Error);
  }
};

const updateUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: number = parseInt(req.params.userId, 10);
    const newUserData = req.body;

    if (isNaN(userId)) {
      handleNotFound(res, 'User not found');
      return;
    }

    if (!(await UserModel.isUserExist(userId))) {
      handleNotFound(res, 'User not found');
      return;
    }

    const updatedUser = await userServices.updateUserById(userId, newUserData);

    handleSuccess(res, 'User updated successfully!', updatedUser);
  } catch (error) {
    handleServerError(res, error as Error);
  }
};

const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: number = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
      handleNotFound(res, 'User not found');
      return;
    }

    if (!(await UserModel.isUserExist(userId))) {
      handleNotFound(res, 'User not found');
      return;
    }

    const user = await userServices.deleteUserById(userId);
    handleSuccess(res, 'User deleted successfully!', user);
  } catch (error) {
    handleServerError(res, error as Error);
  }
};

// ! some modifications needed
const addOrdersForSpecificUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const ordersData: Order = req.body;
    const userId = parseInt(req.params.userId);
    if (!(await UserModel.isUserExist(userId))) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
      return;
    }
    const orders = await userServices.addOrdersForSpecificUser(userId, ordersData);
    res.json({
      success: true,
      message: 'Orders fetched successfully!',
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Something went wrong while fetching orders.',
      },
    });
  }
};

const getOrdersForSpecificUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    if (!(await UserModel.isUserExist(userId))) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
      return;
    }
    const orders = await userServices.getOrdersForSpecificUser(userId);
    res.json({
      success: true,
      message: 'Orders fetched successfully!',
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Something went wrong while fetching orders.',
      },
    });
  }
};

const getSpecificUserOrderWithTotalPrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    if (!(await UserModel.isUserExist(userId))) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
      return;
    }
    const totalPrice = await userServices.getSpecificUserOrderWithTotalPrice(userId);
    res.json({
      success: true,
      message: 'Total price calculated successfully!',
      data: totalPrice,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Something went wrong while fetching orders.',
      },
    });
  }
};

const userControllers = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addOrdersForSpecificUser,
  getOrdersForSpecificUser,
  getSpecificUserOrderWithTotalPrice,
};

export default userControllers;

/* import { Request, Response } from 'express';
import userSchemaValidation from '../zod/zod';
import userServices from '../services/userService';

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userServices.getAllUsers();

    if (!users || users.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Users not found!',
        error: {
          code: 404,
          description: 'Users not found!',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await userServices.getSingleUser(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const updatedUserData = req.body;
    const user = await userServices.updateUser(userId, updatedUserData);
    console.log(user);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await userServices.deleteUser(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
      return;
    }
    res.json({
      success: true,
      message: 'User deleted successfully!',
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = req.body;
    const validationResult = userSchemaValidation.safeParse(newUser);

    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        error: validationResult.error.issues[0].message,
      });
      return;
    }

    const createdUser = await userServices.createUser(validationResult.data);

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: createdUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const userControllers = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createUser,
};

export default userControllers;
 */
