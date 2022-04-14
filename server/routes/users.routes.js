const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();

const user = require("../models/users.models");

router.post("/createUser/", async (req, res) => {

    var newUser = new user({
        userId: req.body.userId,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        manager: req.body.manager
    })

    await newUser.save((err, data) => {
        if (err) {
            console.log(err)
        }
        res.json(data);
    })

})

router.put("/:id/", async (req, res) => {

    user.findOne({userId: req.params.id}, function (err, user) {
        user.email = req.body.email,
        user.firstName = req.body.firstName,
        user.lastName = req.body.lastName,
        user.manager = req.body.manager,
        user.save( function (err) {
            if(err) {
                console.log(err)
            }
        });
    });

    res.send('Edited User');

});


module.exports = router;