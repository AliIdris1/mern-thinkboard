import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("MONGOOSE CONECTED SUCCESFULLY")
    } catch (error) {
        console.error("Error conecting to MONGODB", error)
        process.exit(1); // exit with failure
    }
}