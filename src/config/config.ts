import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file in the current working directory
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Define and export configuration constants
const config = {
  port: process.env.PORT || 5000, // Default to port 3000 if not provided in .env
  mongodb: process.env.MONGODB_URL,
  bcryptSalt: process.env.BCRYPT_SALT,
};

export default config;
