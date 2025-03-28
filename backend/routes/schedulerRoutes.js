const express = require("express");
const router = express.Router();
const RecurringTask = require("../models/schedulerModel");
const House = require("../models/houseModel");
const User = require("../models/userModel"); // Assuming a user model exists
const authorise = require("../middleware/authorisationMiddleware.js");

// Create a new recurring task
router.post("/tasks", authorise, async (req, res) => {
  try {
    const { taskName, frequency, nextDueDate, currentAssignedUser } = req.body;
    const houseID = req.user.houseID;

    const newTask = new RecurringTask({
      taskName,
      frequency,
      nextDueDate,
      houseID,
      currentAssignedUser,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all recurring tasks for a house
router.get("/tasks", authorise, async (req, res) => {
  try {
    const tasks = await RecurringTask.find({ houseID: req.user.houseID });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a recurring task
router.put("/tasks/:taskID", authorise, async (req, res) => {
  try {
    const { taskName, frequency, nextDueDate } = req.body;
    const updatedTask = await RecurringTask.findOneAndUpdate(
      { taskID: req.params.taskID, houseID: req.user.houseID },
      { taskName, frequency, nextDueDate },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a recurring task
router.delete("/tasks/:taskID", authorise, async (req, res) => {
  try {
    const deletedTask = await RecurringTask.findOneAndDelete({
      taskID: req.params.taskID,
      houseID: req.user.houseID,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Complete a recurring task
router.post("/tasks/:taskID/complete", authorise, async (req, res) => {
  try {
    const { taskID } = req.params;
    const userID = req.user.userID;

    const task = await RecurringTask.findOne({ taskID, houseID: req.user.houseID });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Fetch tenants from the house
    const house = await House.findOne({ houseID: req.user.houseID });
    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }

    const tenants = house.tenants;
    if (!tenants.includes(userID)) {
      return res.status(403).json({ message: "You are not authorized to complete this task" });
    }

    // Mark the current task as completed
    task.lastCompletedBy = userID;
    task.completed = true;
    await task.save();

    // Determine the next user and next due date
    const currentIndex = tenants.indexOf(userID);
    const nextIndex = (currentIndex + 1) % tenants.length;
    const nextUser = tenants[nextIndex];

    let daysToAdd = 0;
    if (task.frequency === "daily") {
      daysToAdd = 1;
    } else if (task.frequency === "weekly") {
      daysToAdd = 7;
    } else if (task.frequency === "monthly") {
      const currentDate = new Date(task.nextDueDate);
      const nextMonth = currentDate.getMonth() + 1;
      const nextDate = new Date(currentDate.setMonth(nextMonth));
      task.nextDueDate = nextDate;
      daysToAdd = 0; // No need to add days manually for monthly
    }

    if (daysToAdd > 0) {
      task.nextDueDate = new Date(task.nextDueDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    }

    // Create a new task with updated information
    const newTask = new RecurringTask({
      taskName: task.taskName,
      frequency: task.frequency,
      nextDueDate: task.nextDueDate,
      houseID: task.houseID,
      currentAssignedUser: nextUser,
      completed: false,
    });

    await newTask.save();

    res.json({ message: "Task completed and new task created", nextUser, nextDueDate: task.nextDueDate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get("/users", authorise, async (req, res) => {
  try {
    const users = await User.find({}, "userID username"); // Fetch userID and username only
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
