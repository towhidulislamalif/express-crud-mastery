import { z } from 'zod';

const orderSchema = z.object({
  productName: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export const userSchemaValidation = z.object({
  userId: z.number().int().positive(),
  username: z.string().min(3).max(30),
  email: z.string().email('Invalid email format.'),
  password: z.string(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number().int().positive(),
  hobbies: z.array(z.string()).default([]),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(orderSchema).default([]),
  isActive: z.boolean().default(true),
});
