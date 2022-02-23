const express = require("express");
const dotenv = require("dotenv").config();
const colors  = require("colors")
const connectDB = require('./db/db')
const port = process.env.PORT || 5000;
const goalRoutes = require('./routes/goalRoutes')
const {errorHandler} = require("./middleware/errorMiddleware")
const app = express();
connectDB();
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use("/api/goals", goalRoutes)
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})