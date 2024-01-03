import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongodb server running on ${mongoose.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

export default connectDb