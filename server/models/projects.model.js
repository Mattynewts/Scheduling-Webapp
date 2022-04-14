const mongoose = require('mongoose');

var taskSchema = new mongoose.Schema ({
        AssignedTo: [{
            type: String
        }],
        Deadlines: {
            type: Date
        },
        Description: {
            type: String
        }
})


// Define Schema userSchema 
const projectSchema = new mongoose.Schema ({
        projectNum: {
            type: String,
            require: true
        },
        projectName: {
            type: String,
            require: true
        },
        groupId: {
            type: String,
            require: true
        },
        tasks: [{
            type: taskSchema
        }]
});

// Create model User from Schema userSchema 
const project = mongoose.model('project', projectSchema);

module.exports = project;