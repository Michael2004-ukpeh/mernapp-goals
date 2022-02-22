const asyncHandler = require("express-async-handler")

const getGoals = asyncHandler(async(req, res) => {
    res.status(200).json({ message: "Get  goals" })
})

const postGoals = asnycHandler(async(req, res) => {
    const {text} = req.body;
    if(!text) {
        res.status(400)
        throw new Error("Please add a text field")
    }
    res.status(200).json({ message: "Set goals" })
})

const updateGoals = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` })
})

const deleteGoals = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` })
})

module.exports = {
    getGoals,
    postGoals,
    updateGoals,
    deleteGoals
}