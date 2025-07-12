import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

// Connection state management
const connection = {
  isConnected: false,
  isConnecting: false,
};

// Connection options for better performance and security
const connectionOptions = {
  maxPoolSize: 10, // Maximum number of connections in the pool
  minPoolSize: 2, // Minimum number of connections in the pool
  serverSelectionTimeoutMS: 5000, // Timeout for server selection
  socketTimeoutMS: 45000, // Socket timeout
  bufferCommands: false, // Disable mongoose buffering
  maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
  retryWrites: true,
  w: 'majority', // Write concern
  readPreference: 'secondaryPreferred', // Read from secondary if available
};

// Graceful shutdown handler
const gracefulShutdown = async () => {
  console.log('Received SIGINT/SIGTERM. Closing MongoDB connection...');
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
};

// Connection event handlers
const setupConnectionHandlers = () => {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
    connection.isConnected = true;
    connection.isConnecting = false;
  });

  mongoose.connection.on('error', error => {
    console.error('MongoDB connection error:', error);
    connection.isConnected = false;
    connection.isConnecting = false;
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
    connection.isConnected = false;
    connection.isConnecting = false;
  });

  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
    connection.isConnected = true;
  });

  // Graceful shutdown handlers
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
};

export const connectDB = async () => {
  // Return existing connection if already connected
  if (connection.isConnected) {
    console.log('Using existing MongoDB connection');
    return mongoose.connection;
  }

  // Prevent multiple simultaneous connection attempts
  if (connection.isConnecting) {
    console.log('MongoDB connection already in progress, waiting...');
    return new Promise((resolve, reject) => {
      const checkConnection = () => {
        if (connection.isConnected) {
          resolve(mongoose.connection);
        } else if (!connection.isConnecting) {
          reject(new Error('Connection failed'));
        } else {
          setTimeout(checkConnection, 100);
        }
      };
      checkConnection();
    });
  }

  if (!MONGODB_URI) {
    const error = new Error('MONGODB_URI is not defined');
    console.error('Database connection error:', error.message);
    throw error;
  }

  try {
    connection.isConnecting = true;
    console.log('Connecting to MongoDB...');

    // Setup connection event handlers
    setupConnectionHandlers();

    // Connect to MongoDB
    const db = await mongoose.connect(MONGODB_URI, connectionOptions);

    connection.isConnected = db.connections[0].readyState === 1;
    connection.isConnecting = false;

    console.log(
      `MongoDB connected to ${db.connection.host}:${db.connection.port}`
    );
    return db;
  } catch (error) {
    connection.isConnected = false;
    connection.isConnecting = false;
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Check if database is connected
export const isDBConnected = () => {
  return connection.isConnected && mongoose.connection.readyState === 1;
};

// Get connection status
export const getConnectionStatus = () => {
  return {
    isConnected: connection.isConnected,
    isConnecting: connection.isConnecting,
    readyState: mongoose.connection.readyState,
  };
};

// Health check function
export const healthCheck = async () => {
  try {
    if (!isDBConnected()) {
      await connectDB();
    }

    // Simple ping to verify connection
    await mongoose.connection.db.admin().ping();
    return { status: 'healthy', timestamp: new Date().toISOString() };
  } catch (error) {
    console.error('Database health check failed:', error);
    return {
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
};
