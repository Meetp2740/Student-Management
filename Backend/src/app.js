import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error.js';
import path from 'path';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

const __dirname = path.resolve();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Router imports
import userRouter from './routes/user.route.js';
import adminRouter from './routes/admin.route.js';

// Router setup
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);

app.use(errorHandler);

export { app }