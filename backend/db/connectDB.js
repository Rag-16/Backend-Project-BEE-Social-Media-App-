import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // TO AVOID WARNINGS IN THE CONSOLE
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);       
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);       
    }
};

export default connectDB;
