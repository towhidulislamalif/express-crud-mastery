import mongoose from 'mongoose';
import app from './app';
import config from './config/config';

async function connectToDatabase() {
  try {
    await mongoose.connect(config.mongodb as string);
    // eslint-disable-next-line no-console
    console.log('Connected to the database');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error connecting to the database');
    process.exit(1);
  }
}

function startServer() {
  const PORT = config.port;
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${PORT}`);
  });
}

async function main() {
  await connectToDatabase();
  startServer();
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled error:', error);
  process.exit(1);
});
