import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js" ;
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

//ochrana

app.use(cors());

/*app.use(cors({
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));*/

app.use('/books', booksRoute);

app.get("/", (request, response) => {
    return response.status(234).send('ahoj')
})



mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () =>{
            console.log("app is listening");
        });
    })
    .catch((error) => {
        console.log(error);
    });