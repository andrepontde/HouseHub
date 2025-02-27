const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authorise = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JTW_SECRET);
      req.userid = decoded.userid;
      req.houseID = decoded.houseID;
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorised, token failed" });
    }
  } else if (!token) {
    res.status(401).json({ message: "Not authorised, no token" });
  }
};
module.exports = authorise;
