const express = require("express");
const router = express.Router();
const House = require("../models/houseModel.js");
const User = require("../models/userModel.js"); // User model import so can update users houseID
const Memo = require("../models/memosModel.js");
const Bill = require("../models/billTrackerModel.js");
const TodoList = require("../models/todolistModel.js");
const authorise = require("../middleware/authorisationMiddleware.js");
const generateToken = require("../utils/generateToken.js");

//create new house
router.post("/create", async (req, res) => {

  try {
    const { name, address, eircode, userID } = req.body;
    const newHouse = new House({name, address, eircode, userID }); // Use uuidv4 for key
    await newHouse.save();
    res.status(201).json(newHouse); // saves to mongoDB
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//get all houses
router.get("/houses", authorise, async (req, res) => {
  try {
    const houses = await House.find(); //finds all houses
    res.json(houses); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get house by Key
router.get("/house", authorise, async (req, res) => {
  try {
    const house = await House.findOne({ houseID: req.user.houseID }); //finds house by key
    if (!house) return res.status(404).json({ message: "House not found" });
    res.json(house); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get a key for a house
router.get("/:houseID/key", authorise, async (req, res) => {  
  try{ 
    const house = await House.findOne({ houseID: req.params.houseID });
    if (!house) {
       return res.status(404).json({ message: "House not found" });
    }
    res.json(house.key);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});
//update house
router.put("/update/:houseID", authorise, async (req, res) => {
  try {
    const { address, eircode, landlord } = req.body;
    const updatedHouse = { address, eircode, landlord };  // update object. retrieve data and send updated data
    const house = await House.findOneAndUpdate(
      { key: req.params.houseID },
      updatedHouse, // replace/update
      { new: true }
    );
    if (!house) return res.status(404).json({ message: "House not found" });
    res.json(house);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete house and all associated data
router.delete("/delete/:houseID", authorise, async (req, res) => {
  try {
    const houseID = req.params.houseID;

    const house = await House.findOne({ houseID: req.params.houseID });
    if (!house) {
      return res.status(404).json({ message: "House not found" });
  }
  if (house.userID !== req.user.userID) {
    return res.status(401).json({ message: "You are not authorised to delete this house" });
  }
    await Memo.deleteMany({ houseID }); // delete all memos by houseID
    await Bill.deleteMany({ houseID }); // delete all bills by houseID
    await TodoList.deleteMany({ houseID }); // delete all todo lists by houseID

    const deletedHouse = await House.findOneAndDelete({ houseID: req.params.houseID }); // delete house by key

    res.json(deletedHouse); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//add tenant to house
router.put("/addTenant/:houseID", authorise, async (req, res) => {
  try{ 
    const userID = req.user.userID;
    // const {key} = req.body;

    const house = await House.findOne({ houseID: req.params.houseID });

    if (!house) { //if house not found
      return res.status(404).json({ message: "House not found" });
    }
    if (house.tenants.includes(userID)) { //if tenant already exists
      return res.status(400).json({ message: "Tenant already exists" });
    }
    // if (house.key !== key) { //if key is invalid
    //   return res.status(400).json({ message: "Invalid key" });
    // }

    house.tenants.push(userID);
    await house.save();
    
     // Update the user's houseID
     await User.findOneAndUpdate(
      { userID: userID },
      { houseID: house.houseID }
    );

    //generate a new token with houseID 
    const token =  generateToken({userID, houseID: house.houseID});
  
    res.json({token});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove a tenant from house
router.put("/removeTenant/:userID", authorise, async (req, res) => {
  try {
    const userToRemoveID = req.params.userID;
    const houseID = req.user.houseID;
    
    if (!houseID) {
      return res.status(400).json({ message: "User is not associated with any house" });
    }
    
    const house = await House.findOne({ houseID: houseID });
    
    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }
    
    // Check if the tenant exists in the house
    if (!house.tenants.includes(userToRemoveID)) {
      return res.status(400).json({ message: "User is not a tenant in this house" });
    }
    
    // Remove tenant from house
    house.tenants = house.tenants.filter(id => id !== userToRemoveID);
    await house.save();
    
    // Update the user's houseID to null
    await User.findOneAndUpdate(
      { userID: userToRemoveID },
      { houseID: null }
    );
    
    res.json({ message: "Tenant removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;