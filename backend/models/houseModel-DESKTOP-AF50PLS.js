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
    address: {
        type: String,
        require : true
    },
    eircode: {
        type: String,
        require : true
    }, 
    landlord: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    key:{
        type: String,
        required: true,
        unique: true
    },
    //tenants is an array of users
    tenants: [{
        type: Schema.Types.ObjectId,
        ref: 'User', //referencing the user model
        require: false
    }]
});


houseSchema.index({key: 1});//adding index to key for querying 

module.exports = mongoose.model('house', houseSchema);//exporting model to be used in routes