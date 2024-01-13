import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {errorHandler} from './middlewares/error.js';
const app = express();
import path from 'path';

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

const __dirname = path.resolve()

// app.use(cors)

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


let indexPath;
let frontendDistPath;

if (process.env.NODE_ENV === 'production') {
  // Paths for production on Render
  indexPath = '/opt/render/project/src/Frontend/dist/index.html';
  frontendDistPath = '/opt/render/project/src/Frontend/dist';
} else {
  // Paths for local development
  indexPath = path.join(__dirname, 'Frontend', 'dist', 'index.html');
  frontendDistPath = path.join(__dirname, 'Frontend', 'dist');
}

app.use(express.static(frontendDistPath));

app.get('*', (req, res) => {
  res.sendFile(indexPath);
});


  console.log('Frontend Dist Path:', frontendDistPath);
  console.log('Index path:', indexPath);
  console.log('Current Working Directory:', __dirname);

//router import
import userRouter from './routes/user.route.js';
import adminRouter from './routes/admin.route.js';


//router dec
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);

app.use(errorHandler)

export { app }