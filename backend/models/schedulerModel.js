const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const recurringTaskSchema = new mongoose.Schema({
  taskID: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
  },
  houseID: {
    type: String,
    required: true,
    ref: "House",
  },
  taskName: {
    type: String,
    required: true,
  },
  frequency: {
    type: String, // e.g., "daily", "weekly", "monthly"
    required: true,
  },
  lastCompletedBy: {
    type: String, // User ID of the last person who completed it
    required: false,
  },
  nextDueDate: {
    type: Date,
    required: true,
  },
  currentAssignedUser: {
    type: String, // User ID of the person currently assigned to complete the task
    required: false,
  },
  completed: {
    type: Boolean,
    default: false, // New tasks are not completed by default
  },
});

module.exports = mongoose.model('RecurringTask', recurringTaskSchema);