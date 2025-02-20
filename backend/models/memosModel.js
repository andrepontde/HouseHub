const mongoose = require('mongoose');

//Defining the schema for a memo. (This is not done and was more of a test to see how it works and how its saving to the db)
const memoSchema = new mongoose.Schema({
  id: {
    type: String
  },
  title: {
    type: String
  },
  content:{ 
    type : String
  }
});

module.exports =mongoose.model('Memo', memoSchema);//exporting model to be used in routes