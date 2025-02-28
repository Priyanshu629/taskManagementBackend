import mongoose from "mongoose";
import { config } from "dotenv";
config();
export const db_connect = () => mongoose.connect(String(process.env.MONGODB_URL)).then(() => {
    console.log("Connected to MongoDB");
}).catch(error => {
    console.log(error.message);
});
