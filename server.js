// Setup empty JS object to act as endpoint for all routes
let data = [];

// Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;


class HTTPCodes {
    constructor() {
        this.OK = 200;
        this.BAD_REQUEST = 400;
        this.NOT_FOUND = 404;
    }
}

// Start up an instance of app

const app = express();


/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static("website"));
// Spin up the server
app.listen(PORT, ()=> {
    console.log(`App listening on port: ${PORT}`)
})

// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'

app.get("/all", (req, res) => {
    res.send(HTTPCodes.OK).json(data);
})

app.post("/all", (req, res) => {
    const temp = req.body.temperature;
    const date = req.body.date;
    const userResponse = req.body.userResponse;
    data.push({temperature: temp, date: date, userResponse: userResponse});
})

// Post Route
  