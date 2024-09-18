import mongoose from "mongoose";
import env from 'dotenv';
import { logger } from "../config/logger.js";
env.config();

const url = process.env.DB_URL
mongoose.set('strictQuery', true);

mongoose.connect(url).then(() => {
    logger.info("connected to db")
    // console.log("Database connected successfully");
}).catch((err) => {
    logger.error(err)
    console.log(err);
});
