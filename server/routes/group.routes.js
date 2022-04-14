const { equal } = require('assert');
const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();

const calendar = require("../models/calendar.model");
const group = require("../models/group.model");
const project = require("../models/projects.model");


router.post('/:userId/newGroup', async (req, res) => {

    var newGroup = new group({
        groupId: req.body.groupId,
        managerId: req.body.userId,
        date_created: req.body.date_created,
        members: req.body.members,
        calendarId: req.body.calendarId

    });

    await newGroup.save((err, data) => {
        if (err) {
            console.log(err)
        }
        res.json(data);
    });
});

router.put("/:userId/:groupId/editGroup", async (req, res) => {

    console.log(req.body.members)
    group.findOneAndUpdate(
        {groupId: req.params.groupId}, 
        {
        $push: {members: req.body.members}
    },
    function(err, result) {
        if(err)
        {
            res.send(err);
        }
    });
    
    res.send('Added Member!')

});



module.exports = router;