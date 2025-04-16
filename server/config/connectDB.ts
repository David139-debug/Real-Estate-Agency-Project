import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("radi")
    } catch (err) {
        console.log("Error occurred.");
    }
};

export default connectDB