import mongoose from "mongoose";

export const DatabaseConnection = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {

            console.log("Database connection established");
        }).catch(err => {
            console.log("Error connecting to Mongoose", err);
        })

    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
    }
}