import express from 'express';
import userControllers from '../controllers/userController';

const userRouter = express.Router();

// GET all users endpoint http://localhost:5000/api/users/
userRouter.get('/', userControllers.getAllUsers);

// GET a single user by userId endpoint http://localhost:5000/api/users/:userId
userRouter.get('/:userId', userControllers.getUserById);

// POST a new user endpoint http://localhost:5000/api/users/
userRouter.post('/', userControllers.createUser);

// Update a single user by userId endpoint http://localhost:5000/api/users/:userId
userRouter.put('/:userId', userControllers.updateUserById);

// Delete a single user by userId endpoint http://localhost:5000/api/users/:userId
userRouter.delete('/:userId', userControllers.deleteUserById);

// ! some modifications needed
// Add new product to order endpoint http://localhost:5000/api/users/:userId/orders
userRouter.put('/:userId/orders', userControllers.addOrdersForSpecificUser);

// Get all orders for a specific user endpoint http://localhost:5000/api/users/:userId/orders
userRouter.get('/:userId/orders', userControllers.getOrdersForSpecificUser);

// Calculate the Total Price of Orders for a Specific User endpoint http://localhost:5000/api/:userId/orders/total-price
userRouter.get('/:userId/orders/total-price', userControllers.getSpecificUserOrderWithTotalPrice);

export default userRouter;
/* import express from 'express';
import userControllers from '../controllers/userController';

const userRouter = express.Router();

// GET all users
userRouter.get('/', userControllers.getAllUsers);

// GET a single user by ID
userRouter.get('/:userId', userControllers.getSingleUser);

// Update a single user by ID
userRouter.put('/:userId', userControllers.updateUser);

// Delete a user
userRouter.delete('/:userId', userControllers.deleteUser);

// POST a new user
userRouter.post('/', userControllers.createUser);

export default userRouter;
 */
