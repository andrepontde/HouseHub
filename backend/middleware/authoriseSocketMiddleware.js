const jwt = require("jsonwebtoken");

const socketAuthorise = (socket, next) => {
    if (!socket.handshake.auth || !socket.handshake.auth.token) {
        return next(new Error("Authentication error"));
    }
    const token = socket.handshake.auth.token;
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded; // Attach the user data to the socket object
        next(); // proceed
    } catch (error) {
        return next(new Error("Authentication error"));
    }
};

module.exports = socketAuthorise; //exporting middleware 