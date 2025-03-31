const express = require("express");
const router = express.Router();
const Bill = require("../models/billTrackerModel.js");
const authorise = require("../middleware/authorisationMiddleware.js");

//create a bill
router.post("/create", authorise, async (req, res) => {
  try {
    const { title, desc, dueDate, amount } = req.body;
    const houseID = req.user.houseID;
    const userID = req.user.userID;
    const newBill = new Bill({
      title,
      desc,
      dueDate,
      amount,
      houseID,
      userID,
    });
    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

//get all bills for a house
router.get("/house", authorise, async (req, res) => {
  try {
    const bills = await Bill.find({ houseID: req.user.houseID });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

// get bills for a user
router.get("/user", authorise, async (req, res) => {
  try {
    const bills = await Bill.find({ userID: req.user.userID });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

// update a bill
router.put("/update/:billID", authorise, async (req, res) => {
  try {
    const { title, desc, dueDate, amount } = req.body;
    const houseID = req.user.houseID;
    const userID = req.user.userID;
    const bill = await Bill.findOneAndUpdate(
      { billID: req.params.billID, houseID, userID },
      { title, desc, dueDate, amount },
      { new: true }
    );
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

//delete a bill
router.delete("/delete/:billID", authorise, async (req, res) => {
  try {
    const billID = req.params.billID
    const bill = await Bill.findOneAndDelete({
      _id: billID
    });
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

//pay a bill
router.post("/pay/:billID", authorise, async (req, res) => {
  try {
    const { amountPaid } = req.body;
    const userID = req.user.userID;
    const username = req.user.username;
    const bill = await Bill.findOne({ _id: req.params.billID });

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    if (amountPaid > bill.amount || amountPaid <= 0) {
      return res.status(400).json({ message: "Enter a valid amount" });
    }

    //updating the paid array
    bill.paid.push({ userID, amountPaid, username});
    console.log(userID);

    bill.amount -= amountPaid; //updating the amount after payment

    await bill.save();
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

module.exports = router;
