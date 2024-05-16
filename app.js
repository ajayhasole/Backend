import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import adminRouter from './routes/admin-routes.js'
import bookingsRouter from './routes/booking-routes.js';




dotenv.config();

const PORT = 6800;
const app = express();
app.use(express.json());

app.use('/admin', adminRouter);
app.use('/booking', bookingsRouter);





mongoose.connect(
    `mongodb+srv://sohamingale2000:${process.env.MONGODB_PASSWORD}@cluster.aa3kduh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`
).then(()=>{
    app.listen(`${PORT}`,()=>{
        console.log(`Connected to DB and Server ${PORT} is running`);
    })
}).catch(error=>{
    console.log(error);
})



