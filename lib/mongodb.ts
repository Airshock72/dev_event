import mongoose from 'mongoose'

// Define the type for our cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the NodeJS global type to include our mongoose cache
declare global {
  var mongoose: MongooseCache | undefined
}

const MONGODB_URI = process.env.MONGODB_URI

// Validate that the MongoDB URI is defined in environment variables
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global cache to store the MongoDB connection.
 * In development, Next.js hot reloading can cause multiple connections
 * to be created, so we cache the connection in the global object.
 */
const cached: MongooseCache = globalThis.mongoose || { conn: null, promise: null }

if (!globalThis.mongoose) {
  globalThis.mongoose = cached
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Reuses existing connection if available to prevent connection pooling issues.
 *
 * @returns {Promise<typeof mongoose>} The Mongoose instance
 */
async function connectToDatabase(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn
  }

  // If no promise exists, create a new connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering to fail fast if not connected
    }

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    // Wait for the connection promise to resolve and cache it
    cached.conn = await cached.promise
  } catch (e) {
    // Reset the promise on error so subsequent calls can retry
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectToDatabase
