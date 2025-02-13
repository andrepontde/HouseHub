const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "client/build")));

// Catch-all route to serve index.html for React routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../househub/build", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});




//memos section


//Login test
app.post('/memo', (req, res) => {

});
