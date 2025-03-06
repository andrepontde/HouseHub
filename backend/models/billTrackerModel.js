const mongoose = require('mongoose');
const { listSearchIndexes } = require('./memosModel');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

//createdate, bill(an array?), tile, desc, duedate, amount, houseid, userid, paid, paiddate, billid,
const billTrackerSchema = new mongoose.Schema({

}); 