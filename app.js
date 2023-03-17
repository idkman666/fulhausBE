import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes.js';
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.URI;

app.use(express.json());

app.use('/api/v1', apiRoutes);
mongoose.set("strictQuery", false);
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'fulhaus',
  }).then(() => {
    console.log("DB connected");
    app.listen(port, () => {
        console.log("Server running at Port: 5000");
    })
}).catch((err) => {
    console.log(err);
});


