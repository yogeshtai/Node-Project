import express from "express";
import env from "dotenv";
import http from "http";
import './utils/dbConnect.js';
import cors from "cors";

env.config();

const port = process.env.PORT
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());

import { errorHandler, notFoundError } from "./middleware/errorHandler.js";
import { logger } from "./config/logger.js";
import router from './routes/index.js';

app.use('/api', router);
app.use('*', notFoundError);
app.use(errorHandler);

server.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});