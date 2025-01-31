const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
// app.get("/", (req,res) =>{
//     res.render("../househub/public/index")
// })
app.listen(port, async () => {
    console.log(`http://localhost:${port}/`);
});