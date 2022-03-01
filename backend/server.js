const express = require("express");
const dotenv = require("dotenv").config();
const path =require('path')
const colors  = require("colors")
const connectDB = require('./db/db')
const port = process.env.PORT || 5000;
const goalRoutes = require('./routes/goalRoutes')
const userRoutes = require("./routes/userRoutes")
const {errorHandler} = require("./middleware/errorMiddleware")
const app = express();
connectDB();
app.use(express.json())
app.use(express.urlencoded({extended:false}));

//Routes
app.use("/api/goals", goalRoutes)
app.use("/api/users", userRoutes)

// server frontend
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) =>{
        return res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
    })
}else{
    app.get('/', (req, res) =>{
        return res.send('Please set to production')
    })
}
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})