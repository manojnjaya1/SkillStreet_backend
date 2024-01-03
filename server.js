import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDb from './config/connectDb.js';
import noteRoute from './routes/NoteRoute.js';
import userRoute from './routes/UserRoute.js';
import dotenv from 'dotenv'
dotenv.config();

const app = express();


connectDb();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/notes',noteRoute)
app.use('/api/user',userRoute)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
