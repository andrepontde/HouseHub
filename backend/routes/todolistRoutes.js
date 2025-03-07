const express = require("express");
const router = express.Router();
const todolist = require("../models/todolistModel.js");
const authorise = require("../middleware/authorisationMiddleware.js");

// Filter todolist items by dueDate
router.get("/todolists/filter", async (req, res) => {
    try {
      const { dueDate } = req.query; 
      const targetDate = new Date(dueDate);
      const todolists = await Todolist.find({// find matching dates
        //a few approches are possible here ill list them beloww and space them with comments
        //first one only sorts by time meaning date would not matter
        dueDate: {
        //in mongoDB $gte is greater or equal to
          $gte: new Date(targetDate.setHours(0, 0, 0, 0)), // first time hours, minutes, seconds, milliseconds
        // $lt is less than 
          $lt: new Date(targetDate.setHours(23, 59, 59, 999)), // second time hours, minutes, seconds, milliseconds
        },
      }).sort({ dueDate: -1 }); //this sorts it by the most recent time to latest. this is determind by the -1 and the fields you would prompt up top
  
      //return 
      res.json(todolists);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//Creating new todolist
router.post("/todolists", authorise, async (req, res) => {
  try {
    const {content, dueDate, userID, taskID} = req.body;

    const newtodolist = new todolist({
      houseID: req.user.houseID,
      userID: req.user.userID,
      content, createDate, dueDate, completeDate, userID, completeUser, status, taskID,
    });

    await newtodolist.save();
    res.status(201).json(newtodolist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//retrieve all todolist items
router.get("/house", authorise, async (req, res) => {
  try {
    const todolists = await todolist .find({ houseID: req.user.houseID });
    res.json(todolists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// retrieve on task by taskID
router.get("/todolist/:taskID", authorise, async (req, res) => {
  try {
    const todolist = await todolist.findOne({ taskID: req.params.taskID });
    if (!todolist) {
      return res.status(404).json({ message: "todolist item not found" });
    }
    res.json(todolist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update to do list by taskID
router.put("/todolist/:taskID", authorise, async (req, res) => {
  try {
    const {content, dueDate, completeDate, completeUser, status, taskID } = req.body;
    const houseID = req.user.houseID;
    const userID = req.user.userID;
    const todolist = await todolist.findOneAndUpdate(
      { taskID: req.params.taskID, houseID, userID },
      { content, dueDate, completeDate, completeUser, status, taskID },
      { new: true }
    );
    res.json(todolist);
    console.log("nah try again" + todolist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete todolist by taskID
router.delete("/todolist/:taskID", authorise, async (req, res) => {
  try {
    const userID = req.user.userID;
    const houseID = req.user.houseID;
    const todolist = await todolist.findOneAndDelete({
      taskID: req.params.taskID,
      houseID,
      userID,
    });
    if (!todolist) {
      return res.status(404).json({ message: "todolist not found" });
    }
    res.json(todolist);
    console.log("list is gone, ADIOS" + todolist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;