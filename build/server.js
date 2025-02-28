import express from "express";
import { config } from "dotenv";
import { db_connect } from "./db/connection.js";
import taskRouter from "./routes/task.route.js";
import cors from "cors";
config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//connecting to database
db_connect();
app.use("/api/tasks", taskRouter);
// listening to the server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
