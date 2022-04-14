const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();

const user = require("../models/users.models");
const calendar = require("../models/calendar.model");
const { equal } = require('assert');


router.get('/:userId/:calendarId', (req, res) => {

    calendar.find({
        calendarId: {$eq: req.params.calendarId}
    })
    .then(function (response) {
        res.send(response)
    })

})

router.post("/:userId/newCalendar", async (req, res) => {

    var newCalendar = new calendar({
        calendarId: req.body.calendarId,
        calendarName: req.body.calendarName,
        Event: req.body.Event,
        userId: req.params.userId,
        groupId: req.body.groupId

    });

    newCalendar.save((err, data) => {
        if (err) {
            console.log(err)
        }
        res.json(data);
    });

});

router.post("/:userId/addEvent", async (req, res) => {

    calendar.findOneAndUpdate(
        {calendarId: req.body.calendarId}, 
        {
        $push: {Event: req.body.Event}
    },
    function(err, result) {
        if(err)
        {
            res.send(err);
        }
    });
    
    res.send('Added Event!')
});

// Not Working
router.put("/:userId/editEvent", async (req, res) => {

    calendar.findOneAndUpdate(
        {"Event.eventName": req.body.eventName}, 
        {
        $set: { 'Event.$.eventName': req.body.newEventName, 'Event.$.location': req.body.location, 'Event.$.date': req.body.date}
    },
    function(err, result) {
        if(err)
        {
            res.send(err);
        }
    });
    
    res.send('Edited Event!')
});

router.delete("/:userId/deleteEvent", async (req, res) => {

    calendar.findOneAndUpdate(
        {calendarId: req.body.calendarId}, 
        {
        $pull: {Event: {eventName: req.body.eventName}}
    },
    function(err, result) {
        if(err)
        {
            res.send(err);
        }
    });
    
    res.send('Deleted Event!')
});

module.exports = router;