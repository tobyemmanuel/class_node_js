import express from "express";
import connectToDB from "./config/db.js";
import { register, login } from "./controllers/auth.controller.js"

const app = express()
app.use(express.json())
connectToDB()

app.post('/register', register);
app.post('/login', login);

app.listen(5000, () => {
    console.log('Server running')
})