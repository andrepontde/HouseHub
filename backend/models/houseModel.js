//creaing a house 
//house id
//address
//eircode
//landlord
//tenants
//key
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const houseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    houseID: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    eircode: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        ref: 'User',
        required: true
    },
    key: {
        type: String,
        required: true,
        default: uuidv4,
        unique: true
    },
    //tenants stored in an array
    tenants: [{
        type: String,
        required: true,
        ref: 'User' //referencing the user model
    }]
});




module.exports = mongoose.model('house', houseSchema);//exporting model to be used in routes

//change lanmdlord to userID and fix post route to take from token