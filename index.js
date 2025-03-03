require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

const app = express();

// Middleware
app.use(express.json()); // Allows JSON data in requests
app.use(cors()); // Enables CORS for cross-origin requests

// Routes
app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    if (require.main === module) {
      app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${process.env.PORT || 4000}`);
      });
    }
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

module.exports = { app, mongoose };
