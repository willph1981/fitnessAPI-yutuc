const express = require("express");
const { addWorkout, getMyWorkouts, updateWorkout, deleteWorkout, completeWorkoutStatus } = require("../controllers/workoutController");
const { verifyToken } = require("../auth");

const router = express.Router();

router.post("/addWorkout", verifyToken, addWorkout);
router.get("/getMyWorkouts", verifyToken, getMyWorkouts);
router.put("/updateWorkout/:id", verifyToken, updateWorkout);
router.delete("/deleteWorkout/:id", verifyToken, deleteWorkout);
router.patch("/completeWorkoutStatus/:id", verifyToken, completeWorkoutStatus); 

module.exports = router;

