const mongoose = require('mongoose');

// Define Schema userSchema 
const userSchema = new mongoose.Schema ({
        userId: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        manager: {
            type: Boolean
        },
});

// Create model User from Schema userSchema 
const User = mongoose.model('users', userSchema);

module.exports = User;