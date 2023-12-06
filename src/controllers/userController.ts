import { Request, Response } from 'express';
import userSchemaValidation from '../zod/zod';
import userServices from '../services/userService';

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: {
        code: 500,
        description: 'Something went wrong while fetching users.',
      },
    });
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
    res.json({
      success: true,
      message: 'User created successfully',
      data: createdUser,
    });
  } catch (error) {
    // Handle internal server error
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error || 'Unknown error',
    });
  }
};

const userControllers = {
  getAllUsers,
  createUser,
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
