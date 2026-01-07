import express from 'express';
import { ENV } from './config/env.js';
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'

const app = express();

app.use(cors({origin: process.env.FRONTEND_URL}));

app.use(clerkMiddleware()) //auth obj will be attached to the req obj.
app.use(express.json()); //parses json request bodies
app.use(express.urlencoded({ extended: true })); //parses form data (Like HTML Forms)

app.get("/", (req, res) => {
    res.json("Hello, World!");
})

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
})
