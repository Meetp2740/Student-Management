import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {errorHandler} from './middlewares/error.js';
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

// app.use(cors)

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//router import
import userRouter from './routes/user.route.js';
import adminRouter from './routes/admin.route.js';

//router dec
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);

app.use(errorHandler)

export { app }