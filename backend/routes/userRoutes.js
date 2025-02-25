const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");

//route ro creating user
router.post("/registration", async (req, res) => {
  try {
    const { username, firstName, lastName, email, age, password, role } =
      req.body; //taking data from body request
    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      age,
      password,
      role,
    }); //creating instance of user from data collected
    await newUser.save(); //saving user to db
    res.status(201).json(newUser); //response for created user
  } catch (error) {
    res.status(500).json({ error: error.message }); //response for error
  }
});

//route to retrieve all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(); //fetching all users from db
    res.json(users); //send the users as a json response
  } catch (error) {
    res.status(500).json({ error: error.message }); //response for an error
  }
});

//route to retieve a specific user
router.get("/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }); //fetching a user by username from db
    if (!user) {
      //if user not found
      return res.status(404).json({ message: "User not found" }); //response for user not found
    }
    res.json(user); //send the user as a json response
  } catch (error) {
    res.status(500).json({ error: error.message }); //response for an error
  }
});

//route to handle user login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body; //taking username and password from body request
    const user = await User.findOne({ username }); //fetching a user by username from db
    if (!user) {
      //if user not found
      return res.status(404).json({ message: "User not found" }); //response for user not found
    }
    const isMatch = user.password === password; //checking if password matches
    if (!isMatch) {
      //if password does not match
      return res.status(400).json({ message: "Invalid credentials" }); //response for invalid credentials
    }
    res.json(user); //send the user as a json response
  } catch (error) {
    res.status(500).json({ error: error.message }); //response for an error
  }
});

//route to update a user
router.put("user/:username", async (req, res) => {
  try {
    const { username, firstName, lastName, email, age, password, role } =
      req.body; //taking data from body request
    const updatedUser = {
      username,
      firstName,
      lastName,
      email,
      age,
      password,
      role,
    }; //creating new updated user
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      updatedUser,
      { new: true }
    ); //updating previous user by username from db
    if (!user) {
      //if user not found
      return res.status(404).json({ message: "User not found" }); //response for user not found
    } 
    res.json(user); //send the updated user as a json response
  } catch (error) {
    res.status(500).json({ error: error.message }); //error response
  }
});

//route to delete user
router.delete("/user/:username", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username: req.params.username }); //deleting a user by id from db
    if (!user) {
      //if user not found
      return res.status(404).json({ message: "User not found" }); //response for user not found
    }
    res.json(user); //send the deleted user as a json response
  } catch (error) {
    res.status(500).json({ error: error.message }); //error response
  }
});

module.exports = router; //exporting the routes
