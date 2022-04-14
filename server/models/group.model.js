const mongoose = require('mongoose');
const userSchema = require('../models/users.models').schema;

// Define Schema userSchema 
const groupSchema = new mongoose.Schema ({
        groupId: {
            type: String,
            require: true
        },
        managerId: {
            type: String,
            require: true
        },
        date_created: {
            type: Date
        },
        members: [{
            type: String
        }],
        calendarId: {
            type: String
        }
});

// Create model User from Schema userSchema 
const group = mongoose.model('group', groupSchema);

module.exports = group;