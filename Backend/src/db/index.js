import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB, {
    
        });
        
        // Log the IP address and port
        console.log(`Connecting to MongoDB from IP: ${conn.connection.host}:${conn.connection.port}`);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`MongoDB Connection ID: ${conn.connection.id}`);
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

export default connectDb;
