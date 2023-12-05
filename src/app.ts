import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Default route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Success loading the application',
  });
});

export default app;
