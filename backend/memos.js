const path = require("path");
const fs = require("fs");

function makeMemo(homeID, title, content){
    const housePath = path.join(__dirname, 'house.json');

    fs.readFile(housePath, 'utf-8', (error, data) => {
        if (error) {
            console.log('Error reading' + error);
            return res.send({status: "Failed to read"}); 
        }
        let houseInfo = [];
        //If data exists, parse it into an array
        if (data) {
            houseInfo = JSON.parse(data);
        }

        // //Add the new game to the wishlist array
        // wishlist.push(newGame);
        // //Write the updated wishlist back to the file
        // fs.writeFile(wishlistPath, JSON.stringify(wishlist, null, 2), (err) => {
        //     if (error) {
        //         console.log('Error saving wishlist:' + error);
        //         return res.send({status: "Game was not added!"});
        //     }
        //     res.status(201).json({ message: 'Game added to wishlist' });
        // });
    });
}