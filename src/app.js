import express from 'express'
import {config} from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express(); 
config(); 
app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true
}))

app.use(express.json({
    // limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true, 
    limit: '16kb'
}))

app.use(express.static("public")); 

app.use(cookieParser())


// routes
import userRouter from './routes/user.routes.js'
import expenseRouter from './routes/expense.routes.js'


// routes declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/expenses', expenseRouter); 




export { app }; 