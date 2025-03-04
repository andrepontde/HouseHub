//creaing a house 
//house id
//address
//eircode
//landlord
//tenants
//key
const mongoose = require('mongoose');
const { listSearchIndexes } = require('./memosModel');
const Schema = mongoose.Schema;

const houseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        require: true
    },
    houseID: {
        type: String,
        require: true,
        default: uuidv4,
        unique: true
    },
    eircode: {
        type: String,
        require: true
    },
    landlord: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    key: {
        type: String,
        require: true,
        default: uuidv4,
        unique: true
    },
    //tenants stored in an array
    tenants: [{
        type: Schema.Types.ObjectId,
        ref: 'User' //referencing the user model
    }]
});


houseSchema.index({key: 1});//adding index to key for querying 

module.exports = mongoose.model('house', houseSchema);//exporting model to be used in routes