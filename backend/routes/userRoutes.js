const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");


//route ro creating user
router.post("/registration", async (req, res)=> {
    try{
        const {username, firstName, lastName, email, age, password, role} = req.body; //taking data from body request
        const newUser = new User({username, firstName, lastName, email, age, password, role}); //creating instance of user from data collected
        await newUser.save();//saving user to db
        res.status(201).json(newUser); //response for created user
    } catch (error) {
        res.status(500).json({error: error.message}); //response for error
    }
});

//route to retrieve all users
router.get("/registration", async (req,res) => {
    try {
        const users = await User.find(); //fetching all users from db
        res.json(users); //send the users as a json response
    } catch (error) {
        res.status(500).json({error: error.message}); //response for an error
    }
});

//route to retieve a specific user
router.get("/registration/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id); //fetching a user by object id from db
        res.json(user); //send the user as a json response
    } catch (error) {
        res.status(500).json({error: error.message}); //response for an error
    }
});

//route to update a user
router.put("registration/:id", async (req, res) => {
    try {
        const {username, firstName, lastName, email, age, password, role} = req.body; //taking data from body request
        const updatedUser = {username, firstName, lastName, email, age, password, role}; //creating new updated user
        const user = await User.findByIdAndUpdate(req.params.id, updatedUser, {new: true}); //updating previous user by id from db
        res.json(user);//send the updated user as a json response
    } catch (error) {
        res.status(500).json({error: error.message});//error response 
    }
});

//route to delete user
router.delete("/registration/:id", async (req, res) => {
    try{const user = await User.findByIdAndDelete(req.params.id); //deleting a user by id from db
    res.json(user);//send the deleted user as a json response
    } catch (error) {
        res.status(500).json({error: error.message});//error response
    }
});



module.exports = router;//exporting the routes