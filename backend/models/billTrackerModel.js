const mongoose = require("mongoose");
const { v4: uuidv4, stringify } = require("uuid");

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
        type:String,
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



billTrackerSchema.methods.toJSON =  function () {
  const bill = this.toObject();

  bill.createdDate = new Date(bill.createdDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  bill.dueDate = new Date(bill.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

//   const populatedBill = await this.model("Bill")
//   .findById(this.billID)
//   .populate({
//     path: "paid.userID",
//     select: "userName",
//     model: "User",
//   });


// bill.paid = Array.isArray(populatedBill.paid)
//   ? populatedBill.paid.map((payment) => ({
//       ...payment,
//       userName: payment.userID?.userName || "Unknown User", // Safely access userName
//       paidDate: new Date(payment.paidDate).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }),
//     }))
//   : [];

return bill;
};
module.exports = mongoose.model("Bill", billTrackerSchema);
