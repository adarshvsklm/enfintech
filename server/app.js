import express from 'express';

import mongoose from 'mongoose';
import cors from 'cors'
import userRouter from './Routes/user.js'


const app = express();
const db = mongoose.connection

app.use(cors({origin: true}))
app.use(express.json())

app.use('/',userRouter)


try {
    mongoose.connect('mongodb://localhost:27017/enfinTech')

    db.on('error', console.error.bind(console, 'connection error'));

    db.once('open', function () {
        console.log('Connected successfully');
    })
} catch (err) {
    console.log(err);
}




app.listen(8000,()=>{
    console.log('listening on port 8000');
})