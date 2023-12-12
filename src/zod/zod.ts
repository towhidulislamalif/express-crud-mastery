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
  password: z
    .string()
    .refine(
      (val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val),
      'Invalid password. It must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.',
    ),
  fullName: z.object({
    firstName: z
      .string()
      .refine(
        (data) => /^[A-Z][a-z]*$/.test(data),
        'First name must start with an uppercase letter followed by lowercase letters.',
      ),
    lastName: z
      .string()
      .refine(
        (data) => /^[A-Z][a-z]*$/.test(data),
        'Last name must start with an uppercase letter followed by lowercase letters.',
      ),
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
