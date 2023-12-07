import mongoose from 'mongoose';

// Use type aliases for primitive types
type Userid = number;
type Username = string;
type Email = string;
type Password = string;
type Age = number;

interface Address {
  street: string;
  city: string;
  country: string;
}

export interface Order {
  productName: string;
  price: number;
  quantity: number;
}

export interface IUser {
  userId: Userid;
  username: Username;
  email: Email;
  password: Password;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: Age;
  hobbies: string[];
  address: Address;
  orders: Order[];
  isActive: boolean;
}

export interface UserModel extends mongoose.Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExist(userId: number): Promise<IUser | null>;
}
