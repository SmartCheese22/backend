import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const uri = `${process.env.MONGODB_URI}/${DB_NAME}`;
        console.log("Connecting to MongoDB with URI:", uri);

        const connectionInstance = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`\n MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
}

export default connectDB;
