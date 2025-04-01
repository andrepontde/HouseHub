const jwt = require("jsonwebtoken");

const generateToken = (userID, houseID, username) => {
    return jwt.sign({ userID, houseID, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken; 