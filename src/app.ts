import express, { Request, Response } from 'express';
import cors from 'cors';
import userRouter from './routes/userRoute';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Success loading the application!',
  });
});

export default app;
