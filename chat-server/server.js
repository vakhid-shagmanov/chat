import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import router from './authRouter.js';

const PORT = process.env.PORT || 6000;

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/auth', router)

async function startServer() {
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`server started : ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

startServer()
