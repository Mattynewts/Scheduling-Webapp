const { equal } = require('assert');
const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();

const calendar = require("../models/calendar.model");
const group = require("../models/group.model");
const project = require("../models/projects.model");


router.get('/:projectNum/', (req, res) => {

    project.find({
        projectNum: {$eq: req.params.projectNum}
    })
    .then(function (response) {
        res.send(response)
    })

})

router.post('/:userId/newProject', async (req, res) => {

    var newProject = new project({
        projectNum: req.body.projectNum,
        projectName: req.body.projectName,
        groupId: req.body.groupId,
        tasks: req.body.tasks

    });

    await newProject.save((err, data) => {
        if (err) {
            console.log(err)
        }
        res.json(data);
    });
});

router.post("/:userId/:projectId/addTask", async (req, res) => {

    project.findOneAndUpdate(
        {projectNum: req.params.projectId}, 
        {
        $push: {tasks: req.body.tasks}
    },
    function(err, result) {
        if(err)
        {
            res.send(err);
        }
    });
    
    res.send('Added Task!')
});

router.delete("/:userId/:projectId/deleteTasks", async (req, res) => {

    calendar.findOneAndUpdate(
        {projectNum: req.body.projectId}, 
        {
        $pull: {tasks: {Description: req.body.Description}}
    },
    function(err, result) {
        if(err)
        {
            res.send(err);
        }
    });
    
    res.send('Deleted Task!')
});


module.exports = router;