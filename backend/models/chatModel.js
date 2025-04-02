const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new mongoose.Schema({
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
      username: {
        type: String,
        required: true,
        ref: "User",
      },
      message: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    });

module.exports = mongoose.model("Chat", chatSchema);