const Workout = require("../models/Workout");

// Add a new workout
const addWorkout = async (req, res) => {
  try {
    const { name, duration, status } = req.body;
    if (!name || !duration) return res.status(400).json({ message: "Name and duration are required" });

    const newWorkout = new Workout({
      userId: req.user.userId,
      name,
      duration,
      status: status || "pending",
    });

    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get all workouts for the logged-in user
const getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.userId });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update a workout
const updateWorkout = async (req, res) => {
  try {
    const { name, duration, status } = req.body;

    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { name, duration, status },
      { new: true }
    );

    if (!updatedWorkout) return res.status(404).json({ message: "Workout not found" });

    res.json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const deletedWorkout = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!deletedWorkout) return res.status(404).json({ message: "Workout not found" });

    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const completeWorkoutStatus = async (req, res) => {
  try {
    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { status: "completed" },
      { new: true }
    );

    if (!updatedWorkout) return res.status(404).json({ message: "Workout not found" });

    res.json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { addWorkout, getMyWorkouts, updateWorkout, deleteWorkout, completeWorkoutStatus };
