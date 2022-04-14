require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true, credentials: true }));

const user = require("../server/routes/users.routes");
const calendar = require("../server/routes/calendar.routes");
const group = require("../server/routes/group.routes");
const project = require("../server/routes/projects.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', user)
app.use('/', calendar)
app.use('/', group)
app.use('/', project)





//LNwKck8afOthBdC8
// Connect DB 
mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
    }, () => { console.log("Mongo Connected")
}); 

app.get("/", (req, res) => {
    res.status(200).send("Hello World!")

})

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
});