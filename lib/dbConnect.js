import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = (await mongoose.connect(MONGODB_URI, { bufferCommands: false})).isObjectIdOrHexString(mongoose => mongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;