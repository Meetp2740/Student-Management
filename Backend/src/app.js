import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error.js';
import path from 'path';

const app = express();

const __dirname = path.resolve();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))

// Serve static files from the 'Frontend/build' directory
app.use(express.static(path.join(__dirname, 'Frontend', 'build')));

// Route all other requests to the index.html file in 'Frontend/build'
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'Frontend', 'build', 'index.html'))
);

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




// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import {errorHandler} from './middlewares/error.js';
// const app = express();
// import path from 'path';

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
// }))


// app.use(express.static(path.join(__dirname, "/Frontend/build")));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/Frontend/build/index.html"))
// );

// console.log(__dirname)

// // app.use(cors)

// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// //router import
// import userRouter from './routes/user.route.js';
// import adminRouter from './routes/admin.route.js';


// //router dec
// app.use('/api/v1/user', userRouter);
// app.use('/api/v1/admin', adminRouter);

// app.use(errorHandler)

// export { app }

