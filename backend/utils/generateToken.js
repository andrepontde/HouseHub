const jwt = require("jsonwebtoken");

const generateToken = (userID, houseID) => {
    return jwt.sign({ userID, houseID }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken; 