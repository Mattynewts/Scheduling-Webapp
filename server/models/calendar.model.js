const mongoose = require('mongoose');

var eventSchema = new mongoose.Schema ({
    eventName: {
        type: String,
    },
    location: {
        type: String
    },
    date: {
        type: Date
    }
})

// Define Schema userSchema 
const calendarSchema = new mongoose.Schema ({
    calendarId: {
        type: String
    },
    calendarName: {
        type: String
    },
    Event: [{
        type: eventSchema
    }],
    userId: {
        type: String
    },
    groupId: {
        type: String
    }
});

const calendar = mongoose.model('calendar', calendarSchema);

module.exports = calendar;