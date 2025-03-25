const express = require("express");
const router = express.Router();
const ToDoList = require("../models/todolistModel.js");
const authorise = require("../middleware/authorisationMiddleware.js");

// Filter todolist items by dueDate
router.get("/todolists/filter", async (req, res) => {
  try {
    const todolists = await ToDoList.find().sort({ dueDate: -1 }); //this sorts it by the most recent time to latest. this is determind by the -1 and the contents in MongoDBs

    res.json(todolists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new to-do item
router.post("/todolists", authorise, async (req, res) => {
  try {
    const { content, dueDate } = req.body;
    const newToDo = new ToDoList({
      content,
      dueDate,
      taskStatus: false,
      houseID: req.user.houseID,
      userID: req.user.userID,
    });
    await newToDo.save();
    res.status(201).json(newToDo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all to-do items for the current house
router.get("/house", authorise, async (req, res) => {
  try {
    const toDoItems = await ToDoList.find({ houseID: req.user.houseID });
    res.json(toDoItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a specific to-do item by taskID
router.get("/todolist/:taskID", authorise, async (req, res) => {
  try {
    const toDoItem = await ToDoList.findOne({
      taskID: req.params.taskID,
      houseID: req.user.houseID,
    });
    if (!toDoItem) {
      return res.status(404).json({ message: "To-do item not found" });
    }
    res.json(toDoItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a to-do item by taskID
router.put("/todolist/:taskID", authorise, async (req, res) => {
  try {
    const { content, dueDate, taskStatus } = req.body;
    const updatedToDo = { content, dueDate, taskStatus };
    const toDoItem = await ToDoList.findOneAndUpdate(
      { taskID: req.params.taskID, houseID: req.user.houseID },
      updatedToDo,
      { new: true }
    );
    if (!toDoItem) {
      return res.status(404).json({ message: "To-do item not found" });
    }
    res.json(toDoItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a to-do item by taskID
router.delete("/todolist/:taskID", authorise, async (req, res) => {
  try {
    const toDoItem = await ToDoList.findOneAndDelete({
      taskID: req.params.taskID,
      houseID: req.user.houseID,
    });
    if (!toDoItem) {
      return res.status(404).json({ message: "To-do item not found" });
    }
    res.json(toDoItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;