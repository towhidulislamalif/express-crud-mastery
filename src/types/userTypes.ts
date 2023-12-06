interface IUser {
  userId: number;
  username: string;
  email: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders: {
    productName: string;
    price: number;
    quantity: number;
  }[];
  isActive: boolean;
}
export default IUser;
/* import { Model } from 'mongoose';

export interface User {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders: {
    productName: string;
    price: number;
    quantity: number;
  }[];
}

export interface UserModel extends Model<User> {
  // eslint-disable-next-line no-unused-vars
  findByUserId(userId: number): Promise<User | null>;
  // eslint-disable-next-line no-unused-vars
}
 */
