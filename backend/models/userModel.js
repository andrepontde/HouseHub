//username 
//password
//role
//house to create Landlord
//houseID to join Tenant
//

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require : true,
        unique : true,
        minlength : 3,
        maxlength: 24
    },
    firstName: {
        type: String,
        require : true
    },
    lastName: {
        type: String,
        require : true
    },
    email: {
        type: String,
        require : true
    },
    age: {
        type: String,
        require : true
    },
    password: {
        type: String,
        require : true,
        minlength : 6,
        maxlength: 50
    },
    role: {
        type: String,
        require : true,
        enum: ['landlord', 'tenant'] // only two roles
    },
    houseID: {
        type: String,
        require : false
        }
    }
);


userSchema.index({houseID: 1}); //adding index to houseID for querying

module.exports = mongoose.model('User', userSchema); //exporting model to be used in routes