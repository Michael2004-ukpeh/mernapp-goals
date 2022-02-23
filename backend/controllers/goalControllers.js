const asyncHandler = require("express-async-handler")
const Goal  = require("../models/goalModel")



const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({})
    res.status(200).json( goals )
})

const postGoals = asyncHandler(async(req, res) => {
    const {text} = req.body;
    
    if(!text) {
        res.status(400)
        throw new Error("Please add a text field")
    }
    const goal = await Goal.create({
        text: text
    })
    res.status(200).json({goal})
})

const updateGoals = asyncHandler(async(req, res) => {
    const {id} = req.params;
    const {text} = req.body
    const goal = await Goal.findById(id);
    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
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
    const deletedGoal  = await Goal.findByIdAndDelete(id)
    res.status(200).json({id: req.params.id })
})

module.exports = {
    getGoals,
    postGoals,
    updateGoals,
    deleteGoals
}