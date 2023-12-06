import express from 'express';
import userControllers from '../controllers/userController';

const userRouter = express.Router();
// GET all users endpoint http://localhost:5000/api/users/
userRouter.get('/', userControllers.getAllUsers);
// POST a new user endpoint http://localhost:5000/api/users/
userRouter.post('/', userControllers.createUser);

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
