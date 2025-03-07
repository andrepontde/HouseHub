const express = require("express");
const router = express.Router();
const House = require("../models/houseModel.js");
const User = require("../models/userModel.js"); // User model import so can update users houseID
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
router.get("/:houseID", authorise, async (req, res) => {
  try {
    const house = await House.findOne({ key: req.params.houseID }); //finds house by key
    if (!house) return res.status(404).json({ message: "House not found" });
    res.json(house); 
  } catch (error) {
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

//delete house
router.delete("/delete/:houseID", authorise, async (req, res) => {
  try {
    const house = await House.findOneAndDelete({ key: req.params.key }); // delete house by key
    if (!house) return res.status(404).json({ message: "House not found" });
    res.json(house);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//add tenant to house
router.put("/:houseID/addTenant", authorise, async (req, res) => {
  try{ 
    const userID = req.user.userID;
    const {key} = req.body;

    const house = await House.findOne({ houseID: req.params.houseID });

    if (!house) { //if house not found
      return res.status(404).json({ message: "House not found" });
    }
    if (house.tenants.includes(userID)) { //if tenant already exists
      return res.status(400).json({ message: "Tenant already exists" });
    }
    if (house.key !== key) { //if key is invalid
      return res.status(400).json({ message: "Invalid key" });
    }

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

module.exports = router;