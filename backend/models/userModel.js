//username
//password
//role
//house to create Landlord
//houseID to join Tenant
//

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    minlength: 3,
    maxlength: 24,
  },
  userID: {
    type: String,
    require: true,
    default: uuidv4,
    unique: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  age: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  role: {
    type: String,
    require: true,
    enum: ["landlord", "tenant"], // only two roles
  },
  houseID: {
    type: String,
    require: false,
  },
  profileImage: {
    type: String,
    required: false,
    default: "",
  },
  userTheme: {
    type: String,
    required: false,
    default: "default"
  }
});

userSchema.index({ houseID: 1 }); //adding index to houseID for querying

module.exports = mongoose.model("User", userSchema); //exporting model to be used in routes
