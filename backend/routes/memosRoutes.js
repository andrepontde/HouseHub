const express = require("express");
const router = express.Router();
const Memo = require("../models/memosModel.js");//inporting file(including mongoose)

//Creating a route for new memo
router.post("/memo", async (req,res) => {
    try{
        const{id, title, content} = req.body;
        const newMemo = new Memo({id, title, content});//creting the memo instance, from data collected from body request
        await newMemo.save(); //saving memo to database using save method from mongoose
        res.status(201).json(newMemo);//response for created memo
    } catch(error) {
        res.status(500).json({error: error.message}); //response for an error
    }
});

//Route to retrieve all memos
router.get("/memo", async (req,res) => {
    try {
        const memos = await Memo.find();//fetching all memos from database
        res.json(memos);//send the memos as a json response
    } catch (error) {
        res.status(500).json({error: error.message}); //response for an error
    }
});

module.exports = router; //export the routes to be used in the server.js










//left this here in case you want to use it

// const path = require("path");
// const fs = require("fs");

// function makeMemo(homeID, title, content){
//     const housePath = path.join(__dirname, 'house.json');

//     fs.readFile(housePath, 'utf-8', (error, data) => {
//         if (error) {
//             console.log('Error reading' + error);
//             return res.send({status: "Failed to read"}); 
//         }
//         let houseInfo = [];
//         //If data exists, parse it into an array
//         if (data) {
//             houseInfo = JSON.parse(data);
//         }

//         // //Add the new game to the wishlist array
//         // wishlist.push(newGame);
//         // //Write the updated wishlist back to the file
//         // fs.writeFile(wishlistPath, JSON.stringify(wishlist, null, 2), (err) => {
//         //     if (error) {
//         //         console.log('Error saving wishlist:' + error);
//         //         return res.send({status: "Game was not added!"});
//         //     }
//         //     res.status(201).json({ message: 'Game added to wishlist' });
//         // });
//     });
// }