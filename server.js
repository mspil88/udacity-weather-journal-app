// Container for the data posted from the front end
let data = [];

// Dependencies and globals
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;


// A Helper class to return HTTP Codes, i.e. 200, 400, 404
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
app.use(cors())
// Initialize the main project folder
app.use(express.static("website"));
// Spin up the server
app.listen(PORT, ()=> {
    console.log(`App listening on port: ${PORT}`)
})

//Get Route for the app
app.get("/all", (req, res) => {
    console.log("getting from server")
    res.status(new HTTPCodes().OK).json(data);

    
})

// Post Route for the app

app.post("/", (req, res) => {
    console.log("posting to server")
    const temp = req.body.temp;
    const date = req.body.date;
    const weather = req.body.weather;
    const weatherDescription = req.body.weatherDescription;
    const place = req.body.place;
    const userResponse = req.body.userResponse;


    data.push({date: date, temperature: temp, weather: weather, 
               weatherDescription: weatherDescription, place: place,
               userResponse: userResponse});
})


  