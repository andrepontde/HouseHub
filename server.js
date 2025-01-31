const express = require("express");
const path = require("path");

const app = express();

const port = 3000;
app.listen(port, async () => {
    console.log(`http://localhost:${port}/`);
});