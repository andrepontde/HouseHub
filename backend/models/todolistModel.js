const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const todolistschema = new mongoose.Schema({

    // houseid, userid, content, createdate, duedate, completedate, createuser, completeuser, status, taskid
    //filter by date
    //CRUD
    //
    taskID: {
        type: String,
        required: false,
        unique: true, // Ensure uniqueness
        default: uuidv4,
    },
    houseID: {
        type: String,
        required: true,
        unique: false, // Ensure this is not unique
        ref: "House",
    },
    userID: {
        type: String,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    completeDate: {
        type: Date,
        required: false, // Make optional
    },
    completeUser: {
        type: String,
        required: false, // Make optional
    },
    taskStatus: {
        type: Boolean,
        required: true,
    }
    
});

todolistschema.methods.toJSON = function () {
    const to_do = this.toObject();

    to_do.createDate = new Date(to_do.createdDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    to_do.dueDate = new Date(to_do.dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    to_do.completeDate = new Date(to_do.completeDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return to_do;
};

module.exports = mongoose.model('Todolist', todolistschema);
