const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
//const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Admin:User@househubdb.8pvzl.mongodb.net/?retryWrites=true&w=majority&appName=HouseHubDB";
const memosRoutes = require('./routes/memosRoutes');//importing file



const app = express();

//Using mongoose to connect to MongoDB
async function connectToDB() {  

  try{
    await mongoose.connect(uri); //connect to MongoDB from the URI
    console.log("Connected to MongoDB"); //logging a successful connection
  } catch(error) {

    console.log("Error connecting to MongoDB: " + error);//logging an unsuccessful connection

  }
}
connectToDB();//calling function to connect

//Middleware to parse JSON
app.use(express.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "..","househub","build")));

// // Catch-all route to serve index.html for React routes
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname,"index.html"));
// });

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});



//the defined routes are accessable through http://localhost:5000/api/memo 
app.use('/api', memosRoutes);





//(leaving this here in case we need it in the future but can delete)


// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("HouseHubDB").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);