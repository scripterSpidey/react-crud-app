import express from 'express';
import dotenv  from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { notFound,errorHandler } from './middlewares/errorMiddleware.js';
import morgan from 'morgan'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import adminRoutes from './routes/adminRoutes.js'



dotenv.config();
connectDB();
const PORT = process.env.PORT || 3000;


const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
  }));

app.use(express.json({limit:'50mb'}));

app.use('/server',express.static('server/'));
app.use(express.urlencoded({limit:'50mb',extended:true}));
app.use(cookieParser());
app.use(morgan("tiny"));
app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)

app.get('/',(req,res)=>{
        res.send('server is online')
})

app.use(notFound);
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log('server is running')
})