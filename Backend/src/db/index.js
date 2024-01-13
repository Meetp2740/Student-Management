import mongoose from "mongoose";
import { DB_NAME } from '../contstants.js'

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_DB}`, {
            
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }

}

export default connectDb;