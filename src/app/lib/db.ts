import mongoose, { ConnectOptions } from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async (): Promise<typeof mongoose> => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI environment variable is not defined");
    }
    return await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions);
};

export default connectDB;