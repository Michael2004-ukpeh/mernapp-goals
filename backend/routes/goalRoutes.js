const express = require("express");
const router = express.Router();
const {
    getGoals,
    postGoals,
    updateGoals,
    deleteGoals
} = require("../controllers/goalControllers");
router.route('/').get(getGoals).post(postGoals);


router.route('/:id').delete(deleteGoals).put(updateGoals);









module.exports = router