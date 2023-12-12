import mongoose from 'mongoose';

// Type aliases for primitive types
type UserId = number;
type Username = string;
type Email = string;
type Password = string;
type Age = number;

// Address interface
interface Address {
  street: string;
  city: string;
  country: string;
}

// Order interface
export interface Order {
  productName: string;
  price: number;
  quantity: number;
}

// User interface
export interface IUser {
  userId: UserId;
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
  orders?: Order[];
  isActive: boolean;
}

export interface UserModel extends mongoose.Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExist(userId: number): Promise<IUser | null>;
}
