import express from 'express';
import mongoose from 'mongoose';

import router from './authRouter.js';

const PORT = process.env.PORT || 6000;

const app = express();

app.use(express.json())
app.use('/auth', router)

async function startServer() {
    try {
        await mongoose.connect('mongodb://localhost:27017')
        app.listen(PORT, () => console.log('server started'))
    } catch (error) {
        console.log(error)
    }
}

startServer()
