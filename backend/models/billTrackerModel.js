const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

//createdate, bill(an array?), tile, desc, duedate, amount, houseid, userid, paid, paiddate, billid,
const billTrackerSchema = new mongoose.Schema({
  billID: {
    type: String,
    required: true,
    unique: false,
    default: uuidv4,

  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  houseID: {
    type: String,
    required: true,
    ref: "House",
  },
  userID: {
    type: String,
    required: true,
    ref: "User",
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  paid: [
    {
      userID: {
        type: String,
        required: true,
        ref: "User",
      },
      amountPaid: {
        type: Number,
        required: true,
      },
      paidDate: {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
  ]
});


module.exports = mongoose.model("Bill", billTrackerSchema);
