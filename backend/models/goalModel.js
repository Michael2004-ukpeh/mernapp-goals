const mongoose = require("mongoose")
const Schema = mongoose.Schema
const goalSchema = new Schema({
    text:{
        type: String,
        required:[true, "Please input text"],
        trim:true
    }
},{
    timestamps:true
})

const Goal = mongoose.model("Goal", goalSchema)
module.exports = Goal