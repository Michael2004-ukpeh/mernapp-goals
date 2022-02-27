const asyncHandler = require("express-async-handler")
const Goal  = require("../models/goalModel")
const User = require("../models/userModel")


const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json( goals )
})

const postGoals = asyncHandler(async(req, res) => {
    const {text} = req.body;
    
    if(!text) {
        res.status(400)
        throw new Error("Please add a text field")
    }
    const goal = await Goal.create({
        text: text,
        user:req.user.id
    })
    res.status(200).json({goal})
})

const updateGoals = asyncHandler(async(req, res) => {
    const {id} = req.params;
  
    const goal = await Goal.findById(id);
    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }
    const user = await User.findById(req.user.id);
    // Check for user
    if(!user){
       res.status(401)
       throw new Error("User not found")
    }
    //  Make sure the logged in user matches the goal uset
    if (goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')

    }
    const updatedGoal = await Goal.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true
    }
        );
    res.status(200).json({ updatedGoal })
})

const deleteGoals = asyncHandler(async(req, res) => {
    const {id} = req.params
    const{body} = req.body

    const goal = await Goal.findById(id);
    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }
    const user = await User.findById(req.user.id);
    // Check for user
    if(!user){
       res.status(401)
       throw new Error("User not found")
    }
    //  Make sure the logged in user matches the goal uset
    if (goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')

    }
    const deletedGoal  = await Goal.findByIdAndDelete(id)
    res.status(200).json({id: req.params.id })
})

module.exports = {
    getGoals,
    postGoals,
    updateGoals,
    deleteGoals
}