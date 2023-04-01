import mongoose from "mongoose";

async function startConnection(): Promise<void> {
    try {
        const mongoDbURI = `${process.env.DB_URL}`;
        await mongoose.connect(mongoDbURI);
        console.log('DATABASE CONNECTION SUCCESSFULLY');
    } catch (error) {
        console.error(error);
        console.log('DATABASE CONNECTION FAILED');
        process.exit(1);
    }
}

startConnection();
