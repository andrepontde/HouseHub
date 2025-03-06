const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

//createdate, bill(an array?), tile, desc, duedate, amount, houseid, userid, paid, paiddate, billid,
const billTrackerSchema = new mongoose.Schema({
    billid: {
        type: String,
        require: true,
        unique: true,
        default: uuidv4
    },
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    duedate: {
        type: Date,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    houseID: {
        type: String,
        require: true,
        ref: 'House'
    },
    userID: {   
        type: String,
        require: true,
        ref: 'User'
    },
    paid: {//array of userID
        type: Boolean,
        require: false
    },
    paidDate: {
        type: Date,
        require: true
    },
    createdDate: {
        type: Date,
        require: true
    },

});