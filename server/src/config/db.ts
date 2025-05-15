import mongoose, { type Mongoose } from "mongoose";

const connectDB = async (): Promise<Mongoose> => {
    try {
        const url = process.env.MONGO_URL;
        if (!url) throw new Error("No MONGO_URL in .env file");
        console.log("DB connection success");
        return await mongoose.connect(url);
    } catch (error: any) {
        console.log(error.message);
        throw error;
    }
};

export default connectDB;
